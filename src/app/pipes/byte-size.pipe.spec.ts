import { ByteSizePipe } from "./byte-size.pipe";

describe('BytesizePipe', () => {
  let pipe: ByteSizePipe;
  beforeEach(() => {
    pipe = new ByteSizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('ByteSizePipe pipe transform', () => {
    expect(pipe.transform('1k', 'K')).toEqual('1K');
    expect(pipe.transform('1k', 'b')).toEqual('1024b');
    expect(pipe.transform('1k', 'B')).toEqual('1024B');
    expect(pipe.transform('1024', 'B')).toEqual('1024B');
    expect(pipe.transform('1024', 'K')).toEqual('1K');
    expect(pipe.transform('10000', 'K')).toEqual('9.77K');
    expect(pipe.transform('10000', { desiredUnit: 'k', decimal: 1 })).toEqual('9.8k');
    expect(pipe.transform('1TB', 'K')).toEqual('1073741824K');
  });

  it('BytesizePipe throw error', () => {
    expect(() => pipe.transform('1A', 'B')).toThrow('Invalid byte data: 1A');
  });

});
