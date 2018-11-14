import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EssenPage } from './essen';

@NgModule({
  declarations: [
    EssenPage,
  ],
  imports: [
    IonicPageModule.forChild(EssenPage),
    TranslateModule.forChild()
  ],
  exports: [
    EssenPage
  ]
})
export class EssenPageModule { }
