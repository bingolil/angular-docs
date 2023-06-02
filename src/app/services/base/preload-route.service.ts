import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/**
 * example(**-routing.module.ts):
 * { path: 'path', component: Component, data: { preload: true } }
 */

@Injectable({
  providedIn: 'root'
})
export class PreloadRouteService implements PreloadingStrategy {

  /** 预加载的路由 */
  preloadedModules: string[] = [];

  constructor() { }

  // 自定义预加载 实现preload方法
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload && route.path !== null) {
      // add the route path to the preloaded module array
      this.preloadedModules.push(route.path as string);
      // log the route path to the console
      console.log('Preloaded: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
