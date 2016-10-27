import './timeline.css!';
import {bindable} from 'aurelia-framework'

export class Timeline {
  @bindable affairs

  firstDate;
  lastDate;

  affairsChanged() {
    if (this.affairs && this.affairs.length) {
      for (let affair of this.affairs) {
        let date = new Date(affair._source.deposit.date)
        if (this.firstDate === undefined) {
          this.firstDate = date.getTime();
        }
        if (this.lastDate === undefined) {
          this.lastDate = date.getTime();
        }
        if (date.getTime() < this.firstDate) {
          this.firstDate = date.getTime();
        }
        if (date.getTime() > this.lastDate) {
          this.lastDate = date.getTime();
        }
        affair.date = date.getTime();
        console.log(affair.date)
      }
      this.dateRange = this.lastDate - this.firstDate;
    }
  }
}
