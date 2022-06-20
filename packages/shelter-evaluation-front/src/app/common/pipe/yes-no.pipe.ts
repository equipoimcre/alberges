import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  transform(value: any): any {
    return value ? $localize `:@@common.yes:Yes` : $localize `:@@common.no:No`;
  }
}