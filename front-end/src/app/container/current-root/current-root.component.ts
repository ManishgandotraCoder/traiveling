import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { planType } from '../../components/way/way.interface';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { WayService } from '../../service/way/way.service';

interface cityType {
  city: string;
  date: string;
}
@Component({
  selector: 'app-current-root',
  templateUrl: './current-root.component.html',
  styleUrl: './current-root.component.scss',
})
export class CurrentRootComponent implements OnChanges {
  constructor(private wayservice: WayService) {}
  @Input() data: planType[] = [];
  @Input() openBottomSheet: any;
  @Input() bottomSheet: any;
  cities: cityType[] = [];
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data = changes['data'].currentValue;

      // Extract the sequence of cities
      this.cities = [
        {
          city: this.data[0]?.departurePlace,
          date: this.data[0]?.departureDateTime,
        },
      ];

      this.data.forEach((train) => {
        this.cities.push({
          city: train.arrivalPlace,
          date: train.arrivalDateTime,
        });
      });
    }
  }

  openEditPlan() {
    this.bottomSheet.open(BottomSheetComponent, { data: this.data });
  }
}
