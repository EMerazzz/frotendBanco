import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { clientes } from '../models/clientes-model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient) { }
getClientes(): Observable<clientes[]>{

  return this.httpClient.get<clientes[]>('http://localhost:8080/API/clientes/list').pipe(map(res => res ));
  
}
saveClientes(request: any): Observable<any>{

  return this.httpClient.post<any>('http://localhost:8080/API/clientes/save',request).pipe(map(res => res ));
  
}
updateClientes(request: any): Observable<any>{

  return this.httpClient.post<any>('http://localhost:8080/API/clientes/update',request).pipe(map(res => res ));
  
}
}
