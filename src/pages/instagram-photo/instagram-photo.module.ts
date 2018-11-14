import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramPhotoPage } from './instagram-photo';

@NgModule({
  declarations: [
    InstagramPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramPhotoPage),
  ],
})
export class InstagramPhotoPageModule {}
