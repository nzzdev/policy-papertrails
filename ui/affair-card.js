import './affair-card.css!text';
import {bindable} from 'aurelia-framework'

export class AffairCard {
  @bindable affair

  attached() {
    console.log(this.affair)
  }
}
