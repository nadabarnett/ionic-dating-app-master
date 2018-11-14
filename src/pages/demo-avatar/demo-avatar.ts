import { Component, Input } from '@angular/core';

/**
 * Generated class for the DemoAvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'demo-avatar',
  templateUrl: 'demo-avatar.html'
})
export class DemoAvatarComponent {
  @Input() sizeClass: string = 'thumb';// Can be 'thumb-xs'-'thumb-sm'-'thumb-md'-'thumb-lg'

  images: [any] = [
    'adam.png',
    'ben.png',
    'hieu.png',
    'max.png',
    'mike.png',
    'perry.png'
  ];
  imageUrl: string;

  constructor() {
    let randomIndex = Math.floor(Math.random() * (this.images.length - 1));
    this.imageUrl = `assets/img/${this.images[randomIndex]}`;

  }
}
