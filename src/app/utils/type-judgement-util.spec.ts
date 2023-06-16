import { TypeJudgementUtil } from "./type-judgement-util";

describe('TypeJudgementUtil Test', () => {

  it('isObject static function', () => {
    expect(TypeJudgementUtil.isObject({ a: 'b' })).toEqual(true);
    expect(TypeJudgementUtil.isObject([])).toEqual(false);
  });

  it('isArray static function', () => {
    expect(TypeJudgementUtil.isArray({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isArray([])).toEqual(true);
  });

  it('isSet static function', () => {
    expect(TypeJudgementUtil.isArray({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isArray([])).toEqual(true);
  });

  it('isSet static function', () => {
    expect(TypeJudgementUtil.isSet({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isSet(new Set([1, 2]))).toEqual(true);
  });

  it('isMap static function', () => {
    expect(TypeJudgementUtil.isMap({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isMap(new Map())).toEqual(true);
  });

  it('isBoolean static function', () => {
    expect(TypeJudgementUtil.isBoolean({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isBoolean(false)).toEqual(true);
  });

  it('isNumber static function', () => {
    expect(TypeJudgementUtil.isNumber({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isNumber(111)).toEqual(true);
  });

  it('isNumberAndNotIsNaN static function', () => {
    expect(TypeJudgementUtil.isNumberAndNotIsNaN({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isNumberAndNotIsNaN(NaN)).toEqual(false);
    expect(TypeJudgementUtil.isNumberAndNotIsNaN(111)).toEqual(true);
  });

  it('isString static function', () => {
    expect(TypeJudgementUtil.isString({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isString('111')).toEqual(true);
  });

  it('isDate static function', () => {
    expect(TypeJudgementUtil.isDate({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isDate(new Date())).toEqual(true);
  });

  it('isFunction static function', () => {
    expect(TypeJudgementUtil.isFunction({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isFunction(new Function())).toEqual(true);
  });

  it('isRegExp static function', () => {
    expect(TypeJudgementUtil.isRegExp({ a: 'b' })).toEqual(false);
    const reg = /^[1-9]\d{9,19}$/;
    expect(TypeJudgementUtil.isRegExp(reg)).toEqual(true);
  });

  it('isNull static function', () => {
    expect(TypeJudgementUtil.isNull({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isNull(null)).toEqual(true);
  });

  it('isUndefined static function', () => {
    expect(TypeJudgementUtil.isUndefined({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isUndefined(undefined)).toEqual(true);
  });

  it('isNullOrUndefined static function', () => {
    expect(TypeJudgementUtil.isNullOrUndefined({ a: 'b' })).toEqual(false);
    expect(TypeJudgementUtil.isNullOrUndefined(undefined)).toEqual(true);
    expect(TypeJudgementUtil.isNullOrUndefined(null)).toEqual(true);
  });

});
