export class DateValueConverter {
  toView(value) {
    let d = new Date(value);
    return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`
  }
}
