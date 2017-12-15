import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'fromUtc'
})
export class FromUtcPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let day = moment(value);
    day.local();
    return day.format(args);
  }

}
