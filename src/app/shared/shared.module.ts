import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppLoadingComponent } from './app-loading/app-loading.component';
import { InputFieldGroupComponent } from './input-field-group/input-field-group.component';
import { RoundedCornersButtonComponent } from './rounded-corners-button/rounded-corners-button.component';
import { ButtonLinkComponent } from './button-link/button-link.component';
import { CheckBoxRadioButtonGroupComponent } from './check-box-radio-button-group/check-box-radio-button-group.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationPageSizeComponent } from './pagination-page-size/pagination-page-size.component';
import { PopupComponent } from './popup/popup.component';
import { TextAreaGroupComponent } from './text-area-group/text-area-group.component';
import { StandardButtonComponent } from './standard-button/standard-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { AccordionComponent } from './accordion/accordion.component';
import { CardComponent } from './card/card.component';


@NgModule({
  declarations: [
    AppLoadingComponent,
    InputFieldGroupComponent,
    RoundedCornersButtonComponent,
    ButtonLinkComponent,
    CheckBoxRadioButtonGroupComponent,
    PaginationComponent,
    PaginationPageSizeComponent,
    PopupComponent,
    TextAreaGroupComponent,
    StandardButtonComponent,
    SearchBarComponent,
    FeatureCardComponent,
    AccordionComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AppLoadingComponent,
    InputFieldGroupComponent,
    RoundedCornersButtonComponent,
    ButtonLinkComponent,
    CheckBoxRadioButtonGroupComponent,
    PaginationComponent,
    PaginationPageSizeComponent,
    PopupComponent,
    TextAreaGroupComponent,
    StandardButtonComponent,
    SearchBarComponent,
    FeatureCardComponent,
    AccordionComponent,
    CardComponent
  ]
})
export class SharedModule {
}
