import { TestBed } from "@angular/core/testing";
import { DomSanitizer } from "@angular/platform-browser";
import { HighlightPipe } from "./highlight.pipe";

describe('HighLightPipe', () => {
  let pipe: HighlightPipe;
  let domSanitizer: DomSanitizer;
  beforeEach(() => {
    domSanitizer = TestBed.get(DomSanitizer);
    pipe = new HighlightPipe(domSanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('highligh pipe transform', () => {
    const value1 = 'test value';
    const result1 = pipe.transform(value1, { keyword: 'te' });
    const expectVal1 = `<span style="color:#dc3545;">te</span>st value`;
    expect(result1).toEqual(domSanitizer.bypassSecurityTrustHtml(expectVal1));

    const config2 = { keyword: 'te', highlightStyle: { 'color': 'red', 'padding-left': '14px' } };
    const result2 = pipe.transform('testTEST', config2);
    const expectVal2 = `<span style="color:red;padding-left:14px;">te</span>st<span style="color:red;padding-left:14px;">TE</span>ST`;
    expect(result2).toEqual(domSanitizer.bypassSecurityTrustHtml(expectVal2));
  });

});
