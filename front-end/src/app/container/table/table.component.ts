import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-table',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
})
export class TableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = ['place', 'time', 'price'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @Input() data: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getTime(time: number) {
    // Given value in minutes

    // Calculate total days, hours, and remaining minutes
    const totalDays = Math.floor(time / (60 * 24));
    const remainingMinutesDecimal = time % (60 * 24);
    const totalHours = Math.floor(remainingMinutesDecimal / 60);
    const remainingMinutes = Math.floor(remainingMinutesDecimal % 60);

    // Output the result
    return `${totalDays} days, ${totalHours} hours ${remainingMinutes} minutes`;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      const updatedData = changes['data'].currentValue;

      const dats: any = updatedData.map((item: any) => {
        const initialAcc = {
          place: '',
          priceEndto: 0,
          priceStartfrom: 0,
        };

        // Convert the difference to seconds, minutes, and hours

        const priceRange = item.route.reduce((acc: any, routeItem: any) => {
          return {
            place: acc.place
              ? `${acc.place} - ${routeItem.departurePlace}`
              : routeItem.departurePlace,
            priceEndto: acc.priceEndto + (routeItem.priceEndto || 0),
            priceStartfrom:
              acc.priceStartfrom + (routeItem.priceStartfrom || 0),
            dateRange: `${item.route[0]?.departureDateTime} - ${
              item.route[item.route.length - 1]?.arrivalDateTime
            }`,
          };
        }, initialAcc);

        return {
          time: this.getTime(item.time),
          ...priceRange,
        };
      });
      this.dataSource.data = dats;
      console.log('Data received:', dats);
    }
  }
}

export interface PeriodicElement {
  place: string;
  time: number;
  price: string;
}
