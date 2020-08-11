import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetHelpRoutingModule } from './get-help-routing.module';
import { GetHelpComponent } from './components/pages/get-help/get-help.component';


@NgModule({
  declarations: [GetHelpComponent],
  imports: [
    CommonModule,
    GetHelpRoutingModule
  ]
})
export class GetHelpModule { }
