import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLoggerMessage'
})
export class FilterLoggerMessagePipe implements PipeTransform {

  transform(values: any[], filter: string): any[] {
    if(!filter || filter == '') return values;
    let split = filter.split(',');
    return values.filter(value => {
      return (split.indexOf(value.type.toLowerCase()) !== -1);
    });
  }

}
