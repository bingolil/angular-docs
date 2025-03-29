import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[fullscreen]',
  standalone: false,
})
export class FullscreenDirective {
  constructor(private eleRef: ElementRef) {}

  toggleFullScreen() {
    if (this.isFullScrren()) this.exitFullScreen();
    if (!this.isFullScrren()) this.enterFullScreen();
  }

  enterFullScreen() {
    if (this.eleRef.nativeElement.requestFullScreen) {
      this.eleRef.nativeElement.requestFullScreen();
    } else if (this.eleRef.nativeElement.mozRequestFullScreen) {
      this.eleRef.nativeElement.mozFullScreenElement();
    } else if (this.eleRef.nativeElement.webkitRequestFullScreen) {
      this.eleRef.nativeElement.webkitRequestFullScreen();
    } else if (this.eleRef.nativeElement.msRequestFullScreen) {
      this.eleRef.nativeElement.msRequestFullScreen();
    }
  }

  exitFullScreen() {
    if (!!document.exitFullscreen) {
      document.exitFullscreen();
    } else if (!!(document as any).mozCancelFullscreen) {
      (document as any).mozCancelFullscreen();
    } else if (!!(document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }

  isFullScrren(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).mozFullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
  }
}
