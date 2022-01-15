import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpOptions } from '../../types/http/http-options';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  /**
   * 发送get请求
   * @param options 请求参数
   * @returns 返回get请求的结果
   */
  get(options: HttpOptions): Observable<any> {
    return this.sendRequest({ ...options, method: 'get' });
  }

  /**
   * 发送post请求
   * @param options 请求参数
   * @returns 返回post请求的结果
   */
  post(options: HttpOptions): Observable<any> {
    return this.sendRequest({ ...options, method: 'post' });
  }

  /** 
   * request请求发送之前
   */
  preRequest(options: HttpOptions): void {
    if (options.loading !== false) {
      this.loadingService.loading$.next(true);
    }
  }

  /**
   * 手动发送request请求
   * @param options 请求参数
   * @returns 返回http请求结果
   */
  sendRequest(options: HttpOptions): Observable<any> {
    this.preRequest(options);
    return this.request(options).pipe(
      tap((res) => this.reponse(res))
    );
  }

  /**
   * 发送request请求
   * @param options request请求参数
   * @returns 反馈
   */
  private request(options: HttpOptions): Observable<any> {
    return this.http.request(options.method as string, options.url, {
      responseType: options.responseType || 'json',
      withCredentials: false,
    })
  }

  /**
   * 处理http响应体
   * @param res http请求响应体
   * @param options http请求参数
   */
  reponse(res: any): void {
    this.loadingService.loading$.next(false);
  }

}
