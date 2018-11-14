import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CasualmeetupPage } from './casualmeetup';

@NgModule({
  declarations: [
    CasualmeetupPage,
  ],
  imports: [
    IonicPageModule.forChild(CasualmeetupPage),
    TranslateModule.forChild()
  ],
  exports: [
    CasualmeetupPage
  ]
})
export class CasualmeetupPageModule { }
