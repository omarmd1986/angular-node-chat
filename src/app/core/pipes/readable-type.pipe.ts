import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readableType'
})
export class ReadableTypePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    switch(value.toLowerCase()){
      case 'danger': return 'Error';
      case 'info': return 'Information';
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      default: return value;
    }
  }

}
