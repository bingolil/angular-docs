import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { editor } from 'monaco-editor';
import { fromEvent, Subscription } from 'rxjs';

declare var monaco: any;
let loadPromise: Promise<void>;

@Component({
  selector: 'docs-code-editor',
  templateUrl: 'code-editor.component.html',
  styleUrls: ['code-editor.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class CodeEditorComponent
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  // javascript, typescript, css, less, scss, java
  @Input() language = 'javascript';
  @Input() theme: 'vs-dark' | 'hc-black' | 'hc-light' = 'vs-dark';
  @Input() minHeight = 300; // px
  @Input() tabSize = 2;
  @Input() minimap: editor.IEditorMinimapOptions = { enabled: true };
  @ViewChild('codeEditor', { static: true }) _codeEditorRef!: ElementRef;

  private _value: string = '';
  private _editor!: editor.IStandaloneCodeEditor;
  private _resizeSub!: Subscription;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (loadPromise) {
      loadPromise.then(() => this.initMonaco());
    } else {
      loadPromise = new Promise<void>((resolve: any) => {
        const baseUrl = './assets/monaco-editor/min/vs';
        if (typeof (<any>window).monaco === 'object') {
          resolve();
          return;
        }
        const onGotAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { vs: `${baseUrl}` } });
          (<any>window).require([`vs/editor/editor.main`], () => {
            this.initMonaco();
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = `${baseUrl}/loader.js`;
          loaderScript.addEventListener('load', onGotAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onGotAmdLoader();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this._resizeSub) this._resizeSub.unsubscribe();
    if (this._editor) this._editor.dispose();
    this._editor = undefined as any;
  }

  writeValue(value: any): void {
    this._value = value || '';
    if (this._editor) this._editor.setValue(this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected initMonaco(): void {
    const options: editor.IStandaloneEditorConstructionOptions = {
      value: this._value,
      language: this.language,
      theme: this.theme,
      tabSize: this.tabSize,
      minimap: this.minimap,
      // showUnused: false,
    };
    const editorContainer = this._codeEditorRef.nativeElement;
    this._editor = monaco.editor.create(editorContainer, options);

    this._editor.onDidChangeModelContent((e: any) => {
      const value = this._editor.getValue();
      this.ngZone.run(() => {
        this.onChange(value);
        this._value = value;
      });
    });
    this._editor.onDidBlurEditorWidget(() => {
      this.onTouched();
    });

    if (this._resizeSub) this._resizeSub.unsubscribe();
    this._resizeSub = fromEvent(window, 'resize').subscribe(() =>
      this._editor.layout()
    );
  }
}
