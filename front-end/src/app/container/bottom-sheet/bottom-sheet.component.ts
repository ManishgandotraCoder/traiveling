import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WayService } from '../../service/way/way.service';

export interface PeriodicElement {
  time: string;
  journey: string;
  trainName: string;
  trainNumber: number;
  cost: number;
}

export interface PeriodicElemen1t {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent implements OnInit {
  private _bottomSheet = inject(MatBottomSheet);

  selectedRoute: { [key: string]: any } = {}; // Define type for selectedRoute
  displayedColumns = [
    'trainName',
    'departureDateTime',
    'arrivalDateTime',
    'price',
    'save',
  ];
  dataSource = new MatTableDataSource<PeriodicElemen1t>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly panelOpenState = false;
  path: any[] = [];
  routes: { [key: string]: PeriodicElement[] } = {};

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private wayservice: WayService
  ) {
    this.initializePath(data);
  }

  ngOnInit() {
    this.getTrainsInformation();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initializePath(data: any) {
    if (data) {
      const parsedData = typeof data === 'object' ? data : JSON.parse(data);
      this.path = parsedData.map((item: any) => item.arrivalPlace);
      this.path.unshift(this.path[this.path.length - 1]);
    }
  }

  getTrainsInformation() {
    const routes = this.path.map((_, i) => ({
      from: this.path[i],
      to: this.path[i + 1],
    }));
    routes.pop(); // This will remove 'route3' from the array
    console.log(routes);
    this.wayservice
      .getTrainsInformation(routes)
      .subscribe((res) => (this.routes = res));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.path, event.previousIndex, event.currentIndex);
    this.selectedRoute = {};
    this.getTrainsInformation();
  }

  saveTrain(element: any) {
    const key = `${element.departurePlace}_${element.arrivalPlace}`;
    this.selectedRoute[key] = element; // Accessing using dynamic key
  }

  selectRoute() {
    const trainDetailsArray = Object.values(this.selectedRoute).sort(
      (a: any, b: any) =>
        new Date(a.departureDateTime).getTime() -
        new Date(b.departureDateTime).getTime()
    );
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      const obj = {
        email: user.email,
        route: trainDetailsArray,
        time:
          new Date(
            trainDetailsArray[trainDetailsArray.length - 1].arrivalDateTime
          ).getTime() -
          new Date(trainDetailsArray[0].departureDateTime).getTime(),
      };
      this.wayservice.updateWay(obj).subscribe((res) => {
        console.log(obj);
        this._bottomSheet.dismiss();
      });
    }
  }
}
