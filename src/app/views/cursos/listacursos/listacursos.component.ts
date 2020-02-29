import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CursoService } from "../curso.service";

@Component({
  selector: "app-listacursos",
  templateUrl: "./listacursos.component.html",
  styleUrls: ["./listacursos.component.scss"]
})
export class ListacursosComponent implements OnInit {

  @Input()  entrada;
  @Output() saida = new EventEmitter();

  public id:                            number;
  public page_totalElements:            number;
  public page_pageNumber:               number;
  public page_size:                     number;
  public pagina:                        number = 1;
  public cursos:                        any = [];
  public cursos_id:                     any;
  public carregando:                    boolean = false;
  public campo:                         any ="";
  public conteudo:                      any ="";
  public orderby:                       string;
  public direction:                     string;
  public messages						= { emptyMessage: 'Nenhum registro', loadingMessage: 'Carregando', totalMessage: 'registro(s)', selectedMessage: 'selecionado(s)' };

  constructor(
    private snack:              MatSnackBar,
    private cursoService:       CursoService,
  ) { }

  ngOnInit() {

    this.page_totalElements   	= 0;
    this.page_pageNumber      	= 0;
    this.page_size            	= 10;
    this.pagina               	= 0;
    this.orderby              	= 'titulo';
    this.direction            	= 'asc';

  }

  listaCursos(campo, conteudo) {

    this.campo                  = campo;
    this.conteudo               = conteudo;
    this.pagina = 1;
    this.getCursos();
 
  }

  paginacao(pageInfo)
  {
    this.pagina = pageInfo.offset + 1;
    this.getCursos();
  }

  onOrdenar(event)
  {
    this.pagina     = 1;
    this.orderby    = event.column.prop;
    this.direction  = event.newValue;
    this.getCursos();
  }

  getCursos()
  {

    const pesquisa = {
      pagina:     this.pagina,
      limite:     this.page_size,
      campo:      this.campo,
      conteudo:   this.conteudo,
      orderby:    this.orderby,
      direction:  this.direction
    };
    
    this.cursoService.getCursos(pesquisa)
    .subscribe(cursos => {
      
      this.cursos             = cursos.data;
      this.page_totalElements = cursos.total;
      if (this.cursos.length === 0) {
        let mensagem          = '';
        if (pesquisa.campo != "")
        {
          mensagem = "Não existe curso com a pesquisa escolhida!";
        } else {
          mensagem = "Não existe curso nenhum curso cadastrado!";
        }
        this.snack.open(mensagem, "OK", { duration: 4000 });
      } else {
          const selecao = {
            acao: 'Selecionou',
            pagina: this.pagina,
            curso: this.cursos[0],
          };
          this.saida.emit(selecao);
      }
    });

  }

  emitirAcao(acao, row) {

    const saida = {
      acao: acao,
      pagina: this.pagina,
      curso: row
    }
    this.saida.emit(saida);
  }


}
