import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    let split = value.split(' ').slice(0,2);
    split.forEach(word => {
      result += word.split('').shift().toUpperCase();
    });
    return result;
  }

}
