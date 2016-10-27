import './timeline.css!';
import {bindable} from 'aurelia-framework'

export class Timeline {
  @bindable affairs

  firstDate;
  lastDate;

  affairsChanged() {
    let fromDate = new Date(1995,0,1);
    this.firstDate = fromDate.getTime();
    this.lastDate = Date.now();
    
    if (this.affairs && this.affairs.length) {
      for (let affair of this.affairs) {
        let date = new Date(affair._source.deposit.date)
        if (date.getTime() < this.firstDate) {
          this.firstDate = date.getTime();
        }
        affair.date = date.getTime();
      }
      this.dateRange = this.lastDate - this.firstDate;
    }
  }
}
