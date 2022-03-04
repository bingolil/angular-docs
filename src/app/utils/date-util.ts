/** 时间信息对象接口 */
interface TimeInfo {
  /** 年 */
  year: number;
  /** 季度 */
  quarter: number;
  /** 月（1-12） */
  month: number;
  /** 日 */
  day: number;
}

/** 日期工具 */
export class DateUtil {

  /**
   * @description 获取当前时间信息（年，季度，月，周，日）
   * @param timeInfo 时间信息
   * @returns 年，季，月，日
   */
  private static getTimeInfo(timeInfo: string | number | Date): TimeInfo {
    const year = new Date(timeInfo).getFullYear();
    const month = new Date(timeInfo).getMonth() + 1; // 月份+1
    const quarter = Math.floor((month % 3 == 0 ? (month / 3) : (month / 3 + 1))); // 季度
    const day = new Date(timeInfo).getDate();
    return { year, quarter, month, day };
  }

  /**
   * @description 根据时间获取当天初始时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getDayStartTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(info.year, info.month - 1, info.day).getTime();
  }

  /**
   * @description 根据时间获取当天结尾时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getDayEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(info.year, info.month - 1, info.day, 23, 59, 59, 999).getTime();
  }

  /**
   * @description 根据时间获取当前时间所在周（周一为初始）的初始时间戳
    * @param timeInfo 时间信息
    * @returns 时间戳
    */
  static getWeekStartTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    const daysOfWeek = new Date(timeInfo).getDay(); // 当前日期是当前周的第几天
    return new Date(info.year, info.month - 1, info.day - daysOfWeek + 1).getTime();
  }

  /**
   * @description 根据时间获取当前时间所在周（周日为结束）的结束时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getWeekEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    const daysOfWeek = new Date(timeInfo).getDay(); // 当前日期是当前周的第几天
    return new Date(
      info.year, info.month - 1, info.day + (7 - daysOfWeek), // 年，月，日
      23, 59, 59, 999 // 时，分，秒，毫秒
    ).getTime();
  }

  /**
   * @description 根据时间获取当月初始时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getMonthStartTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(info.year, info.month - 1, 1).getTime();
  }

  /**
   * @description 根据时间获取当月结尾时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getMonthEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(info.year, info.month, 0, 23, 59, 59, 999).getTime();
  }

  /**
   * @description 根据时间获取当前季度的开始时间戳
   * @param timeInfo 时间信息 
   * @returns 时间戳
   */
  static getQuarterStartTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo);
    const quarterStartMonth = (info.quarter - 1) * 3 + 1; // 当前时间季度开始月份
    return new Date(info.year, quarterStartMonth - 1, 1).getTime();
  }

  /**
   * @description 根据时间获取当前季度的结束时间戳
   * @param timeInfo 时间信息 
   * @returns 时间戳
   */
  static getQuarterEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo);
    const quarterEndMonth = info.quarter * 3; // 当前时间季度结束月份
    return new Date(info.year, quarterEndMonth, 0, 23, 59, 59, 999).getTime();
  }

}