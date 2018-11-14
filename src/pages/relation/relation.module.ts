import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RelationPage } from './relation';

@NgModule({
  declarations: [
    RelationPage,
  ],
  imports: [
    IonicPageModule.forChild(RelationPage),
    TranslateModule.forChild()
  ],
  exports: [
    RelationPage
  ]
})
export class RelationPageModule { }
