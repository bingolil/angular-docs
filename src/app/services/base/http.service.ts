import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ResultCode } from 'src/app/constant';
import { HttpOptions } from '../../interfaces/http/http-options';
import { LoadingService } from './loading.service';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private routerService: RouterService,
    private loadingService: LoadingService
  ) { }

  /**
   * @description 发送get请求
   * @param options 请求参数
   * @returns 返回get请求的结果
   */
  get(options: HttpOptions): Observable<any> {
    return this.sendRequest('get', options);
  }

  /**
   * @description 发送post请求
   * @param options 请求参数
   * @returns 返回post请求的结果
   */
  post(options: HttpOptions): Observable<any> {
    return this.sendRequest('post', options);
  }

  /**
   * @description 发送put请求
   * @param options 请求参数
   * @returns 返回put请求的结果
   */
  put(options: HttpOptions): Observable<any> {
    return this.sendRequest('put', options);
  }

   /**
   * @description 发送patch请求（打补丁）
   * @param options 请求参数
   * @returns 返回patch请求的结果
   */
  patch(options: HttpOptions): Observable<any> {
    return this.sendRequest('patch', options);
  }

  /**
   * @description 发送delete请求
   * @param options 请求参数
   * @returns 返回delete请求的结果
   */
  delete(options: HttpOptions): Observable<any> {
    return this.sendRequest('delete', options);
  }

  /** 
   * @description request请求发送之前
   * @param options 请求参数
   */
  preRequest(options: HttpOptions): void {
    if (options.loading !== false) {
      this.loadingService.loading$.next(true);
    }
  }

  /**
   * @description 发送request请求
   * @param method 请求方法
   * @param options 请求参数
   * @returns 返回http请求结果
   */
  private sendRequest(method: string, options: HttpOptions): Observable<any> {
    this.preRequest(options);
    return this.request(method, options).pipe(
      tap((res) => this.reponse(res)),
      catchError((err) => this.catchHttpError(err, options))
    );
  }

  /**
   * @description 处理http请求错误
   * @param errRes 错误返回体
   * @param options 请求参数
   * @returns 返回一个正确的结果
   */
  private catchHttpError(errRes: HttpErrorResponse, options: HttpOptions): Observable<any> {

    this.loadingService.loading$.next(false); // 关闭http请求loading ui

    if (options.showErrorMsg) {
      // 展示错误信息
    }

    if (errRes.status === ResultCode.NoPermission) { // 无权限
      // 登出操作
      this.routerService.goToLogin();
    }
    return of(errRes);
  }

  /**
   * @description 请求数据
   * @param method 请求方法
   * @param options request请求参数
   * @returns 反馈
   */
  private request(method: string, options: HttpOptions): Observable<any> {
    return this.http.request(method, options.url, {
      body: options.data,
      // headers: new HttpHeaders().set('Authorization', 'cookie-Token'), // http请求添加token
      responseType: options.responseType || 'json',
      withCredentials: false,
    });
  }

  /**
   * @description 处理http响应体
   * @param res http请求响应体
   */
  reponse(res: any): void {
    this.loadingService.loading$.next(false);
  }

}
