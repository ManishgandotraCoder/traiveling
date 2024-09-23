import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WayComponent } from '../../components/way/way.component';
import { WayService } from '../../service/way/way.service';
import { UserService } from '../../service/user/user.service';

const routes: Routes = [
  {
    path: '',
    component: WayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [WayService, UserService],
})
export class WayRoutingModule {}
