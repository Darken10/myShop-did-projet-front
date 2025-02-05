import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator',
  standalone: true
})
export class ThousandSeparatorPipe implements PipeTransform {

  transform(value: number, separator: string = " "): unknown {
    if (value===null || value===undefined){
      return ''
    }
    return value.toLocaleString('en-US').replace(/,/g,separator)
  }

}
