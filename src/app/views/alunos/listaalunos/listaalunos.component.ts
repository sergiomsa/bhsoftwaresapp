import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlunoService } from "../aluno.service";

@Component({
  selector: "app-listaalunos",
  templateUrl: "./listaalunos.component.html",
  styleUrls: ["./listaalunos.component.scss"]
})
export class ListaalunosComponent implements OnInit {

  @Input()  entrada;
  @Output() saida = new EventEmitter();
  
  @ViewChild('TableAlunos') TableAlunos: any;

  public id:                            number;
  public page_totalElements:            number;
  public page_pageNumber:               number;
  public page_size:                     number;
  public pagina:                        number  = 1;
  public alunos:                        any     = [];
  public alunos_id:                     any;
  public carregando:                    boolean = false;
  public campo:                         any = "";
  public conteudo:                      any = "";
  public orderby:                       string;
  public direction:                     string;
  public messages						= { emptyMessage: 'Nenhum registro', loadingMessage: 'Carregando', totalMessage: 'registro(s)', selectedMessage: 'selecionado(s)' };

  constructor(
    private snack:              MatSnackBar,
    private alunoService:       AlunoService,
  ) { }

  ngOnInit() {

    this.page_totalElements   	= 0;
    this.page_pageNumber      	= 0;
    this.page_size            	= 10;
    this.pagina               	= 0;
    this.orderby              	= 'nome';
    this.direction            	= 'asc';

  }

  listaAlunos(campo, conteudo) {

    this.campo                  = campo;
    this.conteudo               = conteudo;
    this.pagina = 1;
    this.getAlunos();

  }

  paginacao(pageInfo)
  {
    this.pagina = pageInfo.offset + 1;
    this.getAlunos();
  }

  onOrdenar(event)
  {
    this.pagina     = 1;
    this.orderby    = event.column.prop;
    this.direction  = event.newValue;
    this.getAlunos();
  }

  getAlunos()
  {

    const pesquisa = {
      pagina:     this.pagina,
      limite:     this.page_size,
      campo:      this.campo,
      conteudo:   this.conteudo,
      orderby:    this.orderby,
      direction:  this.direction
    };
    
    this.alunoService.getAlunos(pesquisa)
    .subscribe(alunos => {
      
      this.alunos             = alunos.data;
      this.page_totalElements = alunos.total;
      if (this.alunos.length === 0) {
        let mensagem          = '';
        if (pesquisa.campo != "")
        {
          mensagem = "Não existe aluno com a pesquisa escolhida!";
        } else {
          mensagem = "Não existe aluno nenhum aluno cadastrado!";
        }
        this.snack.open(mensagem, "OK", { duration: 4000 });
      } else {
          const selecao = {
            acao: 'Selecionou',
            pagina: this.pagina,
            aluno: this.alunos[0],
          };
          this.saida.emit(selecao);
      }
    });

  }

  emitirAcao(acao, row) {

    const saida = {
      acao: acao,
      pagina: this.pagina,
      aluno: row
    }
    this.saida.emit(saida);
  }

  toggleExpandRow(row) {
    this.TableAlunos.rowDetail.toggleExpandRow(row);
  }


}
