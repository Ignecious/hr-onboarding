import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskId' })
export class MaskIdPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 10) return value;
    const first = value.substring(0, 6);
    const last = value.substring(value.length - 3);
    return `${first}****${last}`;
  }
}
