import { FileUtil } from './file-util';

describe('FileUtil Test', () => {
  it('saveFile static function', () => {
    const createObjectURLFn = jest.fn();
    const revokeObjectURLFn = jest.fn();
    const urlObj = {
      createObjectURL: createObjectURLFn,
      revokeObjectURL: revokeObjectURLFn,
    };

    Object.defineProperty(window, 'URL', { value: urlObj });
    const blob = new Blob(['Hello World!'], { type: 'text/plain' });
    FileUtil.saveFile('demo.txt', blob);
    expect(createObjectURLFn).toHaveBeenCalled();
    expect(revokeObjectURLFn).toHaveBeenCalled();
  });
});
