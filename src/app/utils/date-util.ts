/** 时间信息对象接口 */
interface TimeInfo {
  /** 年 */
  year: number;
  /** 季度 */
  quarter: number;
  /** 月（1-12） */
  month: number;
  /** 日 */
  date: number;
  /** 时 */
  hour: number;
  /** 分 */
  minute: number;
  /** 秒 */
  second: number;
}

/** 日期工具，一周从周日开始，周六结束 */
export class DateUtil {
  /**
   * @description 获取时间参数信息（年，季度，月，周，日）
   * @param timeInfo 时间信息
   * @returns 年，季，月，日
   */
  static getTimeInfo(timeInfo: string | number | Date): TimeInfo {
    const year = new Date(timeInfo).getFullYear();
    const month = new Date(timeInfo).getMonth() + 1; // 月份+1
    const quarter = Math.floor(month % 3 == 0 ? month / 3 : month / 3 + 1); // 季度
    const date = new Date(timeInfo).getDate();
    const hour = new Date(timeInfo).getHours();
    const minute = new Date(timeInfo).getMinutes();
    const second = new Date(timeInfo).getSeconds();
    return { year, quarter, month, date, hour, minute, second };
  }

  /**
   * @description 获取当前日期在一年中是第几周
   * @param timeInfo 时间信息
   * @returns 周
   */
  static getCurrentWeek(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo);
    const yearFirstDate = new Date(info.year, 0, 1); // 年初日期
    const currentDate = new Date(timeInfo); // 当前日期
    // daysOfYear 当前日期是当年的第几天
    const daysOfYear = Math.round(
      (currentDate.valueOf() - yearFirstDate.valueOf()) / 86400000
    );
    return Math.ceil((daysOfYear + (yearFirstDate.getDay() + 1 - 1)) / 7);
  }

  /**
   * @description 根据时间参数的年月获取当前月所在年的周列表
   * @param timeInfo 时间信息
   * @returns 当前月所在年中的周列表
   */
  static getMonthWeekList(timeInfo: string | number | Date): number[] {
    const beignWeek = DateUtil.getCurrentWeek(
      DateUtil.getMonthStartTime(timeInfo)
    );
    const endWeek = DateUtil.getCurrentWeek(DateUtil.getMonthEndTime(timeInfo));
    return Array.from({ length: endWeek - beignWeek }).map(
      (_, i) => i + 1 + beignWeek
    );
  }

  /**
   * @description 根据时间参数获取所在月份的日期列表
   * @param timeInfo 时间信息
   * @returns 当前月的日期列表
   */
  static getMonthDateList(timeInfo: string | number | Date): number[] {
    // 当前月份最后一天日期
    const monthLastDay = new Date(DateUtil.getMonthEndTime(timeInfo)).getDate();
    return Array.from({ length: monthLastDay }).map((_, i) => i + 1);
  }

  /**
   * @description 根据时间获取当天初始时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getDateStartTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(info.year, info.month - 1, info.date).getTime();
  }

  /**
   * @description 根据时间获取当天结尾时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getDateEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    return new Date(
      info.year,
      info.month - 1,
      info.date,
      23,
      59,
      59,
      999
    ).getTime();
  }

  /**
   * @description 根据时间获取时间参数所在周（周日为初始）的初始时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getWeekStartTime(
    timeInfo: string | number | Date,
    startSunday = true
  ): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    const daysOfWeek = new Date(timeInfo).getDay(); // 当前日期是当前周的第几天
    return new Date(
      info.year,
      info.month - 1,
      info.date - daysOfWeek
    ).getTime();
  }

  /**
   * @description 根据时间获取时间参数所在周（周六为结束）的结束时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getWeekEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo); // 日期信息
    const daysOfWeek = new Date(timeInfo).getDay(); // 当前日期是当前周的第几天
    return new Date(
      info.year,
      info.month - 1,
      info.date + (7 - daysOfWeek - 1), // 年，月，日
      23,
      59,
      59,
      999 // 时，分，秒，毫秒
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
    const quarterStartMonth = (info.quarter - 1) * 3 + 1; // 时间参数季度开始月份
    return new Date(info.year, quarterStartMonth - 1, 1).getTime();
  }

  /**
   * @description 根据时间获取当前季度的结束时间戳
   * @param timeInfo 时间信息
   * @returns 时间戳
   */
  static getQuarterEndTime(timeInfo: string | number | Date): number {
    const info = DateUtil.getTimeInfo(timeInfo);
    const quarterEndMonth = info.quarter * 3; // 时间参数季度结束月份
    return new Date(info.year, quarterEndMonth, 0, 23, 59, 59, 999).getTime();
  }
}
