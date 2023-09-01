import { FisrtUpperCasePipe } from './first-uppercase.pipe';

describe('FisrtUpperCasePipe Test', () => {
  const pipe = new FisrtUpperCasePipe();

  it('firstUppercase pipe transform', () => {
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform(undefined as unknown as string)).toEqual('');
    expect(pipe.transform(null as unknown as string)).toEqual('');
    expect(pipe.transform('aab')).toEqual('Aab');
    expect(pipe.transform('aAb')).toEqual('AAb');
    expect(pipe.transform('A')).toEqual('A');
    expect(pipe.transform('a')).toEqual('A');
    expect(pipe.transform('a bc')).toEqual('A bc');

    expect(pipe.transform('a bc', true)).toEqual('A Bc');
  });
});
