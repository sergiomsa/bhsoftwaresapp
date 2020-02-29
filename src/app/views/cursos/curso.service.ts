import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class CursoService {

  baseUrl                      = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCursos(pesquisa){

    return this.http.get(`${this.baseUrl}/api/cursos?orderby=${pesquisa.orderby}&direction=${pesquisa.direction}&campo=${pesquisa.campo}&conteudo=${pesquisa.conteudo}&limite=${pesquisa.limite}&page=${pesquisa.pagina}`)
                   .map((response: any) => {
                        return response;
                   });
  }

  adicionarCurso(curso): Observable<any> {

    return this.http.post(`${this.baseUrl}/api/cursos`, curso)
      .map((response: any) => {
        return response;
      });
  }

  atualizarCurso(id, curso) {

    return this.http.post(`${this.baseUrl}/api/cursos/${id}`, curso)
      .map((response: any) => {
        return response;
      });
  }

  public obterCurso(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/cursos/${id}`)
      .map((response: any) => {
        return response;
      });
  }

  removerCurso(id) {
    
    return this.http.delete(`${this.baseUrl}/api/cursos/${id}`)
                     .map((response: any) => {
                      return response;
                   });

  }

}
