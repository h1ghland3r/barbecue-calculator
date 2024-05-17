import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Carne } from './../models/carne.interface';
import { Bebida } from './../models/bebida.interface';

@Injectable({
  providedIn: 'root'
})
export class BarbecueService {

  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCarnes(): Observable<Carne[]> {
    return this.http.get<Carne[]>(`${this.API_URL}/carnes`).pipe(catchError(this.handleError));
  }

  getBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.API_URL}/bebidas`).pipe(catchError(this.handleError));
  }

  getPrecoCarneByName(nome: string): Observable<number> {
    return this.http.get<any[]>(`${this.API_URL}/carnes`).pipe(
      map(carnes => {
        const carne = carnes.find((carne: { nome: string; }) => carne.nome === nome);
        if (carne) {
          return carne.preco_kg;
        } else {
          throw new Error('Carne não encontrada');
        }
      }),
      catchError(this.handleError)
    );
  }

  getPrecoPicanha(): Observable<number> {
    return this.getPrecoCarneByName('picanha');
  }

  getPrecoCostela(): Observable<number> {
    return this.getPrecoCarneByName('costela');
  }

  getPrecoLinguica(): Observable<number> {
    return this.getPrecoCarneByName('linguiça');
  }

  getPrecoFrango(): Observable<number> {
    return this.getPrecoCarneByName('frango');
  }

  private getPrecoBebidaByName(nome: string): Observable<number> {
    return this.http.get<any[]>(`${this.API_URL}/bebidas`).pipe(
      map(bebidas => {
        const bebida = bebidas.find(bebida => bebida.nome === nome);
        if (bebida) {
          if (bebida.preco_unidade) {
            return bebida.preco_unidade;
          } else if (bebida.preco_lata) {
            return bebida.preco_lata;
          } else if (bebida.preco_garrafa) {
            return bebida.preco_garrafa;
          } else if (bebida.preco_litro) {
            return bebida.preco_litro;
          }
        } else {
          throw new Error('Bebida não encontrada');
        }
      }),
      catchError(this.handleError)
    );
  }

  getPrecoCerveja(): Observable<number> {
    return this.getPrecoBebidaByName('cerveja');
  }

  getPrecoRefrigerante(): Observable<number> {
    return this.getPrecoBebidaByName('refrigerante');
  }

  getPrecoAgua(): Observable<number> {
    return this.getPrecoBebidaByName('água');
  }

  getPrecoSuco(): Observable<number> {
    return this.getPrecoBebidaByName('suco');
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Ocorreu um erro', error);
    return throwError(() => error);
  }
}
