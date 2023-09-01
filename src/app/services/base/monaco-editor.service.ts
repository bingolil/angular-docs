import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonacoEditorService {
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  load(): void {
    if (this.loaded$.value) return;
    const baseUrl = './assets/monaco-editor/min/vs';
    // if (<any>window.require) {
    // (<any>window).require.config({ path: `${baseUrl}` });
    // (<any>window).require(['vs/editor/editor.min'], () =>
    //   this.loaded$.next(true)
    // );
    // } else {
    const loaderScript = document.createElement('script');
    loaderScript.type = 'type/javascript';
    loaderScript.src = `${baseUrl}/loader.js`;
    loaderScript.addEventListener('load', () => this.loaded$.next(true));
    document.body.appendChild(loaderScript);
    // }
  }
}
