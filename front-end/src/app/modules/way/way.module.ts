import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WayRoutingModule } from './way-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WayComponent } from '../../components/way/way.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { BottomSheetComponent } from '../../container/bottom-sheet/bottom-sheet.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { TableComponent } from '../../container/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CurrentRootComponent } from '../../container/current-root/current-root.component';
import { SelectedPlanComponent } from '../../container/selected-plan/selected-plan.component';
import { SearchedplansComponent } from '../../container/searchedplans/searchedplans.component';
import { DragDropModule } from '@angular/cdk/drag-drop'; // Import this

@NgModule({
  declarations: [
    WayComponent,
    BottomSheetComponent,
    TableComponent,
    CurrentRootComponent,
    SelectedPlanComponent,
    SearchedplansComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    WayRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatStepperModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    // MatTableDataSource,
    MatTableModule,
    MatPaginatorModule,
    DragDropModule,
  ],
})
export class WayModule {}
