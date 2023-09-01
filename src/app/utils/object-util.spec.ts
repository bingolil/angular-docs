import { ObjectUtil } from './object-util';

describe('ObjectUtil Test', () => {
  const c = new Date('2020/10/10 12:00:00');
  const f = new Map().set('a', '1').set('b', 2);
  const g = new Set([1, 'b', null, undefined, false]);
  const params = [{ a: '1', b: 2, c, d: null, e: undefined, f, g }];

  it('deepCopy static function', () => {
    expect(ObjectUtil.deepCopy('a')).toEqual('a');
    expect(ObjectUtil.deepCopy({})).toEqual({});
    expect(ObjectUtil.deepCopy(null)).toEqual(null);
    const result = ObjectUtil.deepCopy(params);
    expect(result).toEqual(params);

    result[0].g.clear();
    expect(params).not.toEqual(result);
  });

  it('isEqual static function', () => {
    expect(ObjectUtil.isEqual(null, null)).toEqual(true);
    expect(ObjectUtil.isEqual(undefined, undefined)).toEqual(true);
    expect(ObjectUtil.isEqual(0, null)).toEqual(false);
    expect(ObjectUtil.isEqual([], {})).toEqual(false);
    expect(ObjectUtil.isEqual({}, {})).toEqual(true);
    expect(ObjectUtil.isEqual({}, { a: '1' })).toEqual(false);
    expect(ObjectUtil.isEqual({ b: '1' }, { a: '1' })).toEqual(false);
    expect(ObjectUtil.isEqual({ a: ['1'] }, { a: ['1'] })).toEqual(true);
    expect(ObjectUtil.isEqual({ a: ['1'] }, { a: ['1', '2'] })).toEqual(false);
    expect(ObjectUtil.isEqual({ a: ['1'] }, { a: ['2'] })).toEqual(false);
    const newF = new Map().set('a', '1').set('b', 2);
    expect(ObjectUtil.isEqual(newF, f)).toEqual(true);
    newF.clear();
    newF.set('a', '1').set('c', false);
    expect(ObjectUtil.isEqual(newF, f)).toEqual(false);
    newF.clear();
    newF.set('a', '1').set('b', false);
    expect(ObjectUtil.isEqual(newF, f)).toEqual(false);
    newF.set('g', false);
    expect(ObjectUtil.isEqual(newF, f)).toEqual(false);
    const newG1 = new Set([1, 'b', null, undefined, false]);
    expect(ObjectUtil.isEqual(newG1, g)).toEqual(true);
    newG1.add('ascb');
    expect(ObjectUtil.isEqual(newG1, g)).toEqual(false);
    const newG2 = new Set([1, 'b', null, undefined, 'false']);
    expect(ObjectUtil.isEqual(newG2, g)).toEqual(false);
    const newc = new Date('2020/10/10 12:00:00');
    expect(ObjectUtil.isEqual(newc, c)).toEqual(true);
  });
});
