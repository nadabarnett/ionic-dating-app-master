import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PreferencePage } from './preference';

@NgModule({
  declarations: [
    PreferencePage,
  ],
  imports: [
    IonicPageModule.forChild(PreferencePage),
    TranslateModule.forChild()
  ],
  exports: [
    PreferencePage
  ]
})
export class ListMasterPageModule { }
