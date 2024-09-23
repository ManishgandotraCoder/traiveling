import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../container/bottom-sheet/bottom-sheet.component';
import { WayService } from '../../service/way/way.service';
import { GmailService } from '../../service/gmail/gmail.service';
import {
  cityType,
  otherPlansType,
  planType,
  wayServiceResponseType,
} from './way.interface';

/** Component definition */
@Component({
  selector: 'way-component',
  templateUrl: 'way.component.html',
  styleUrl: 'way.component.scss',
})
export class WayComponent implements OnInit {
  loggedIn: boolean = !!localStorage.getItem('user');
  cities: cityType[] = [];
  loginForm!: FormGroup;
  selectedPlan: planType[] = [];
  otherPlans: otherPlansType[] = [];
  email = JSON.parse(localStorage.getItem('user') || '{}').email || '';

  constructor(
    private formBuilder: FormBuilder,
    public bottomSheet: MatBottomSheet,
    private wayService: WayService,
    private gmailService: GmailService
  ) {}

  signIn() {
    this.gmailService.signIn().then((info: any) => {
      const userObj = {
        firstName: info?.wt?.rV,
        lastName: info?.wt?.uT,
        email: info?.wt?.cu,
        profilePic: info?.wt?.hK,
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      this.loggedIn = true;
      window.location.reload();
    });
  }

  signOut() {
    this.gmailService.signOut().then(() => {
      localStorage.removeItem('user');
      this.loggedIn = false;
      window.location.reload();
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      currentLocation: [null, Validators.required],
      travelLocations: [[], Validators.required],
    });
    this.wayService.getCities().subscribe((cities) => {
      this.cities = cities;
    });

    if (this.email) {
      this.wayService
        .getPlan(this.email)
        .subscribe((response: wayServiceResponseType) => {
          if (response?.route) this.selectedPlan = JSON.parse(response.route);
        });
    }
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.wayService
      .createPlan({
        ...this.loginForm.value,
        minStayHours: 24,
        email: this.email,
      })
      .subscribe((response) => {
        if (Array.isArray(response)) {
          this.selectedPlan = response[0]?.route;
          this.otherPlans = response;
        }
      });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.bottomSheet,
    });
  }
}
