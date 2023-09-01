import { from, groupBy, map, mergeMap, Observable, of, toArray } from 'rxjs';

/**
 * @description 根据数组属性进行树结构转换
 * @param attrs 数组属性列表
 * @returns 分组后的数组
 */
export function groupByToArray<T, K extends keyof T>(attrs: K[]) {
  return (source: Observable<T>): Observable<T[]> => {
    return source.pipe(
      groupBy((item) => item[attrs[0]]),
      mergeMap((group1) =>
        group1.pipe(
          toArray(),
          mergeMap((value) => {
            if (attrs.length === 0) return of(value);
            return from(value).pipe(groupByToArray(attrs.slice(1)));
          }),
          map((arr) => {
            let tl = arr.reduce((num, item: any) => (num += item['total']), 0);
            if (attrs.length === 0) tl = arr.length;
            return { ...arr[0], ...{ children: arr, total: tl } };
          })
        )
      ),
      toArray()
    );
  };
}
