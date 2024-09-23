import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { planType } from '../../components/way/way.interface';

@Component({
  selector: 'app-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrl: './selected-plan.component.scss',
})
export class SelectedPlanComponent implements OnChanges {
  @Input() data: planType[] = [];
  @Input() openBottomSheet: any;
  @Input() bottomSheet: any;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.data = changes['data'].currentValue;
    }
  }
}
