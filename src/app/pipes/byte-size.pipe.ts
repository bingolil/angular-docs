import { Pipe, PipeTransform } from '@angular/core';
import { BYTE_UNITS } from '../constant';
import { ByteUnitType } from '../types';

interface ByteConfig {
  originalUnit?: ByteUnitType;
  desiredUnit: ByteUnitType;
  decimal?: number;
}

/**
 * example1:
 * <p>{{'1024' | byteSize:'K'}}</p> // 1K
 * <p>{{'1024TB' | byteSize:'t'}}</p> // 1024t
 */

@Pipe({
  name: 'byteSize'
})
export class ByteSizePipe implements PipeTransform {

  transform(size: string | number, params: ByteUnitType | ByteConfig): string {
    let { originalUnit = 'B', desiredUnit = params, decimal = 2 } = params as ByteConfig;
    const onlyNumber = /^\d{1,}$/.test(size.toString());
    const regex = new RegExp(`^\\d{1,}${Object.keys(BYTE_UNITS).join('|')}$`);
    const numberAndUnit = regex.test(size.toString());

    if (!onlyNumber && !numberAndUnit) throw new Error(`Invalid byte data: ${size}`);

    let value = size.toString();
    if (numberAndUnit) {
      originalUnit = value.match(/[a-z|A-Z]+/gi)![0] as ByteUnitType;
      value = value.match(/\d{1,}/)![0];
    }

    const gap = BYTE_UNITS[originalUnit] - BYTE_UNITS[desiredUnit as ByteUnitType];
    const arr = new Array(Math.abs(gap)).fill(1);
    const gapProduct = arr.reduce((prev: number) => prev * 1024, 1);
    let resultValue = (parseInt(value) / gapProduct).toFixed(decimal);
    if (gap === 0) resultValue = value;
    if (gap > 0) resultValue = (parseInt(value) * gapProduct).toFixed(2);

    return parseFloat(resultValue).toString() + desiredUnit;
  }

}
