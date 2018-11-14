import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RelationshipPage } from './relationship';

@NgModule({
  declarations: [
    RelationshipPage,
  ],
  imports: [
    IonicPageModule.forChild(RelationshipPage),
    TranslateModule.forChild()
  ],
  exports: [
    RelationshipPage
  ]
})
export class RelationshipPageModule { }
