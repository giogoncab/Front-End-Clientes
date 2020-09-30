import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndoPoint: string = 'http://localhost:8090/api/facturas';

  constructor(public http: HttpClient) { }

  getFactura(id: number): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndoPoint}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndoPoint}/${id}`);
  }

  filtrarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndoPoint}/filtrar-productos/${term}`);
  }

  create(factura: Factura): Observable<Factura>{
    return this.http.post<Factura>(this.urlEndoPoint, factura);
  }

}
