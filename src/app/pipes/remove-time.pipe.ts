import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeTime'
})
export class RemoveTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Split the date-time string at 'T' and return only the date part
    return value.split('T')[0];
  }
}

