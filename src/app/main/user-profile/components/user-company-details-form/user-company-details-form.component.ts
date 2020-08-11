import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { CompanyActions } from '../../../store/company/action-types';
import { selectCompanyDetails } from '../../../store/company/company.selectors';
import { UniqueCompanyNameValidator } from '../../../../validators/unique-company-name.validator';


@Component({
  selector: 'app-user-company-details-form',
  templateUrl: './user-company-details-form.component.html',
  styleUrls: ['./user-company-details-form.component.scss']
})
export class UserCompanyDetailsFormComponent implements AfterViewInit, OnDestroy {
  companySubscription: Subscription;

  companyDetailsForm = new FormGroup({
    companyName: new FormControl('',
      [Validators.required],
      [this.uniqueCompanyNameValidator.validate]
    )
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private uniqueCompanyNameValidator: UniqueCompanyNameValidator
  ) {}

  ngAfterViewInit() {
    this.companySubscription = this.store.select(selectCompanyDetails).pipe(delay(0))
      .subscribe(company => {
        this.companyDetailsForm.get('companyName').setValue(company.companyName);
      });
  }

  onSubmit() {
    if (!this.companyDetailsForm.valid) { return; }

    const { companyName } = this.companyDetailsForm.value;
    this.store.dispatch(CompanyActions.updateCompanyDetails({ companyName }));
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }
}
