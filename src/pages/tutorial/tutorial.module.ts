import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TutorialPage } from './tutorial';
import { TranslateModule } from '@ngx-translate/core';
import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TutorialPage,
  ],
  imports: [
    IonicPageModule.forChild(TutorialPage),
    TranslateModule.forChild(),
    MbscModule, // add the mobiscroll module
    FormsModule // add the forms module
  ],
  exports: [
    TutorialPage
  ]
})
export class TutorialPageModule { }
