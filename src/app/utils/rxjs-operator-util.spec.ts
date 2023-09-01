import { from } from 'rxjs';
import { groupByToArray } from './rxjs-operator-util';

describe('groupByToArray Test', () => {
  it('groupBy to array operator', () => {
    const list = [
      { title: 'a', sex: '男', name: 'tom' },
      { title: 'a', sex: '男', name: 'jack' },
      { title: 'a', sex: '女', name: 'lucy' },
      { title: 'b', sex: '男', name: 'jim' },
      { title: 'b', sex: '男', name: 'kori' },
      { title: 'c', sex: '女', name: 'lisa' },
    ];
    const result = [
      {
        title: 'a',
        sex: '男',
        name: 'tom',
        total: 3,
        children: [
          {
            title: 'a',
            sex: '男',
            name: 'tom',
            total: 2,
            children: [
              { title: 'a', sex: '男', name: 'tom' },
              { title: 'a', sex: '男', name: 'jack' },
            ],
          },
          {
            title: 'a',
            sex: '女',
            name: 'lucy',
            total: 1,
            children: [{ title: 'a', sex: '女', name: 'lucy' }],
          },
        ],
      },
      {
        title: 'b',
        sex: '男',
        name: 'jim',
        total: 2,
        children: [
          {
            title: 'b',
            sex: '男',
            name: 'jim',
            total: 2,
            children: [
              { title: 'b', sex: '男', name: 'jim' },
              { title: 'b', sex: '男', name: 'kori' },
            ],
          },
        ],
      },
      {
        title: 'c',
        sex: '女',
        name: 'lisa',
        total: 1,
        children: [
          {
            title: 'c',
            sex: '女',
            name: 'lisa',
            total: 1,
            children: [{ title: 'c', sex: '女', name: 'lisa' }],
          },
        ],
      },
    ];
    from(list)
      .pipe(groupByToArray(['title', 'sex']))
      .subscribe((res) => {
        expect(res).toEqual(result);
      });
  });
});
