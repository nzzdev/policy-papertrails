import './affair-card.css!';
import {bindable} from 'aurelia-framework'

export class AffairCard {
  @bindable affair

  attached() {
    console.log(this.affair)
  }
}
