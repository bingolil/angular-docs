import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  /** 
   * @description 导航到主页
   */
  navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
