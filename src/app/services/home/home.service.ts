import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/types/http/result';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpService) { }

  getData(): Observable<Result<{ data: [] }>> {
    return this.http.get({ url: 'http://localhost:3000/todos', data: { id: 23 } });
  }

}
