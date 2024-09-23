import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { suggestedPlansType } from '../../components/way/way.interface';

@Component({
  selector: 'app-searchedplans',
  templateUrl: './searchedplans.component.html',
  styleUrl: './searchedplans.component.scss',
})
export class SearchedplansComponent implements OnChanges {
  @Input() data: suggestedPlansType = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
  }
}
