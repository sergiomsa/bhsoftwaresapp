import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';


@Injectable()
export class AlunoService {

  baseUrl                      = environment.apiURL;

  constructor(private http: HttpClient) {}

  obterCursos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/cursos/listar`)
      .map((response: any) => {
        return response;
      });
  }

  getAlunos(pesquisa){

    return this.http.get(`${this.baseUrl}/api/alunos?orderby=${pesquisa.orderby}&direction=${pesquisa.direction}&campo=${pesquisa.campo}&conteudo=${pesquisa.conteudo}&limite=${pesquisa.limite}&page=${pesquisa.pagina}`)
                   .map((response: any) => {
                        return response;
                   });
  }

  adicionarAluno(aluno): Observable<any> {

	  aluno.datadenascimento  = this.formatarData(aluno.datadenascimento);
	
    return this.http.post(`${this.baseUrl}/api/alunos`, aluno)
      .map((response: any) => {
        return response;
      });
  }

  atualizarAluno(id, aluno) {
	  
	  aluno.datadenascimento  = this.formatarData(aluno.datadenascimento);

    return this.http.post(`${this.baseUrl}/api/alunos/${id}`, aluno)
      .map((response: any) => {
        return response;
      });
  }

  public obterAluno(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/alunos/${id}`)
      .map((response: any) => {
        return response;
      });
  }

  removerAluno(id) {
    
    return this.http.delete(`${this.baseUrl}/api/alunos/${id}`)
                     .map((response: any) => {
                      return response;
                   });

  }
  
  formatarData(data) {

    let datav                   = data;
    let dataa                   = [];

    if ((typeof datav === 'string') && (datav.indexOf('-')))
    {
       dataa                    = datav.split('-');
       datav                    = dataa[2] + '/' + dataa[1] + '/' + dataa[0];
    } else {
       if ((typeof datav === 'string') && (datav.indexOf('/')))
       {
       } else {  
            try {
              datav             = datav.format('DD/MM/YYYY');
            } catch (e) {
              let day           = datav && datav.getDate() || -1;
              let dayWithZero   = day.toString().length > 1 ? day : '0' + day;
              let month         = datav && datav.getMonth() + 1 || -1;
              let monthWithZero = month.toString().length > 1 ? month : '0' + month;
              let year          = datav && datav.getFullYear() || -1;
              datav             = dayWithZero  + '/' + monthWithZero + '/' + year;
            }
       }
    }

    return datav;

  }

}
