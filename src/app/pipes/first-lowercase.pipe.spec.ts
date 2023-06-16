import { FisrtLowerCasePipe } from "./first-lowerccase.pipe";

describe('FisrtLowerCasePipe Test', () => {

  const pipe = new FisrtLowerCasePipe();

  it('firstLowercase pipe transform', () => {
    expect(pipe.transform('')).toEqual('');
    expect(pipe.transform(undefined as unknown as string)).toEqual('');
    expect(pipe.transform(null as unknown as string)).toEqual('');
    expect(pipe.transform('a')).toEqual('a');
    expect(pipe.transform('Ab')).toEqual('ab');
    expect(pipe.transform('AAb')).toEqual('aAb');
    expect(pipe.transform('A a b')).toEqual('a a b');

    expect(pipe.transform('A A b', true)).toEqual('a a b');
  });

});
