import { DateUtil } from "./date-util";

describe('DateUtil Test', () => {

  const octInfo = new Date('2020/10/15 12:00:00');
  const sepInfo = new Date('2020/09/15 12:00:00');
  const aprInfo = new Date('2020/04/15 12:00:00');

  it('getMonthWeekList static function', () => {
    const octResult = [41, 42, 43, 44];
    expect(DateUtil.getMonthWeekList(octInfo)).toEqual(octResult);
    const sepResult = [37, 38, 39, 40];
    expect(DateUtil.getMonthWeekList(sepInfo)).toEqual(sepResult);
    const aprResult = [15, 16, 17, 18];
    expect(DateUtil.getMonthWeekList(aprInfo)).toEqual(aprResult);
  });

  it('getMonthDateList static function', () => {
    let result = Array.from({ length: 31 }).map((_, i) => (i + 1));
    expect(DateUtil.getMonthDateList(octInfo)).toEqual(result);

    result = Array.from({ length: 30 }).map((_, i) => (i + 1));
    expect(DateUtil.getMonthDateList(sepInfo)).toEqual(result);
    expect(DateUtil.getMonthDateList(aprInfo)).toEqual(result);
  });

  it('getMonthDateList static function', () => {
    let result = Array.from({ length: 31 }).map((_, i) => (i + 1));
    expect(DateUtil.getMonthDateList(octInfo)).toEqual(result);

    result = Array.from({ length: 30 }).map((_, i) => (i + 1));
    expect(DateUtil.getMonthDateList(sepInfo)).toEqual(result);
    expect(DateUtil.getMonthDateList(aprInfo)).toEqual(result);
  });

  it('getDateStartTime static function', () => {
    const octResult = new Date('2020/10/15 00:00:00').getTime();
    expect(DateUtil.getDateStartTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/09/15 00:00:00').getTime();
    expect(DateUtil.getDateStartTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/15 00:00:00').getTime();
    expect(DateUtil.getDateStartTime(aprInfo)).toEqual(aprResult);
  });

  it('getDateEndTime static function', () => {
    const octResult = new Date('2020/10/16 00:00:00').getTime() - 1;
    expect(DateUtil.getDateEndTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/09/16 00:00:00').getTime() - 1;
    expect(DateUtil.getDateEndTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/16 00:00:00').getTime() - 1;
    expect(DateUtil.getDateEndTime(aprInfo)).toEqual(aprResult);
  });

  it('getWeekStartTime static function', () => {
    const octResult = new Date('2020/10/11 00:00:00').getTime();
    expect(DateUtil.getWeekStartTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/09/13 00:00:00').getTime();
    expect(DateUtil.getWeekStartTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/12 00:00:00').getTime();
    expect(DateUtil.getWeekStartTime(aprInfo)).toEqual(aprResult);
  });

  it('getWeekEndTime static function', () => {
    const octResult = new Date('2020/10/18 00:00:00').getTime() - 1;
    expect(DateUtil.getWeekEndTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/09/20 00:00:00').getTime() - 1;
    expect(DateUtil.getWeekEndTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/19 00:00:00').getTime() - 1;
    expect(DateUtil.getWeekEndTime(aprInfo)).toEqual(aprResult);
  });

  it('getMonthStartTime static function', () => {
    const octResult = new Date('2020/10/01 00:00:00').getTime();
    expect(DateUtil.getMonthStartTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/09/01 00:00:00').getTime();
    expect(DateUtil.getMonthStartTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/01 00:00:00').getTime();
    expect(DateUtil.getMonthStartTime(aprInfo)).toEqual(aprResult);
  });

  it('getMonthEndTime static function', () => {
    const octResult = new Date('2020/11 00:00:00').getTime() - 1;
    expect(DateUtil.getMonthEndTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/10/01 00:00:00').getTime() - 1;
    expect(DateUtil.getMonthEndTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/05/01 00:00:00').getTime() - 1;
    expect(DateUtil.getMonthEndTime(aprInfo)).toEqual(aprResult);
  });

  it('getQuarterStartTime static function', () => {
    const octResult = new Date('2020/10/01 00:00:00').getTime();
    expect(DateUtil.getQuarterStartTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/07/01 00:00:00').getTime();
    expect(DateUtil.getQuarterStartTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/04/01 00:00:00').getTime();
    expect(DateUtil.getQuarterStartTime(aprInfo)).toEqual(aprResult);
  });

  it('getQuarterEndTime static function', () => {
    const octResult = new Date('2021/01/01 00:00:00').getTime() - 1;
    expect(DateUtil.getQuarterEndTime(octInfo)).toEqual(octResult);
    const sepResult = new Date('2020/10/01 00:00:00').getTime() - 1;
    expect(DateUtil.getQuarterEndTime(sepInfo)).toEqual(sepResult);
    const aprResult = new Date('2020/07/01 00:00:00').getTime() - 1;
    expect(DateUtil.getQuarterEndTime(aprInfo)).toEqual(aprResult);
  });

});
