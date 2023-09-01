import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  /**
   * @description 导航到主页
   */
  goToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * @description 导航到登录页
   */
  goToLogin(): void {}
}
