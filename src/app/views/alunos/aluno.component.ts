import { Component, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppLoaderService } from "../../shared/services/app-loader/app-loader.service";
import { AlunoService } from "./aluno.service";
import { AppConfirmService } from "../../shared/services/app-confirm/app-confirm.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CrudalunoComponent } from "./crudaluno/crudaluno.component";
import { ListaalunosComponent } from "./listaalunos/listaalunos.component";


@Component({
  selector: "app-aluno",
  templateUrl: "./aluno.component.html",
  styleUrls: ["./aluno.component.scss"]
})

export class AlunoComponent {
 
  @ViewChild("listaalunos") listaalunos: ListaalunosComponent;
  @ViewChild("crudaluno")   crudaluno: CrudalunoComponent;
  
  public filterForm: FormGroup; 
  public filterestrForm: FormGroup; 
  public id: number;
  public formulario: boolean;
  public entrada: any    = [];
  public pagina: number  = 1;
  public oentrada:  any  = [];
  
  constructor(
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private alunoService: AlunoService,
    private confirmService: AppConfirmService

  ) { }

  ngOnInit() {

    this.formulario             = false;
    this.filterForm             = new FormGroup({
      search:                     new FormControl("", [Validators.required]),
      pesquisarpor:               new FormControl("nome", [Validators.required])
    });

  }

  inserirAluno()
  {
    this.formulario = true;
    this.crudaluno.abrirFormulario(0);
  }

  getAcaoLista(acao) {

    this.pagina = acao.pagina;
    //
    // ação dos botoes da lista (Editar ou Excluir Registro)
    //
    switch (acao.acao) {
      case "editar": {
        this.formulario       = true;
        this.crudaluno.abrirFormulario(acao.aluno.id);
        break;
      }
      case "excluir": {
        this.confirmService.confirm({ message: `Excluir aluno: ${acao.aluno.nome}?` })
          .subscribe(res => {
            if (res) {
              this.loader.open();
              this.alunoService.removerAluno(acao.aluno.id)
                .subscribe(data => {
                  this.loader.close();
                  this.snack.open("Aluno excluido!", "OK", { duration: 4000 });
                  this.listaalunos.paginacao({ offset: this.pagina - 1 });
                },
                  error => {
                    this.loader.close();
                    if (error.error.id[0])
                    {
                         this.snack.open(error.error.id[0], "OK", { duration: 6000 });
                    } else {
                         this.snack.open(error, "OK", { duration: 6000 });
                    }
                  }
                );
            }
          });
        break;
      }
    }
  }

  getAcaoCrud(entrada) {
    this.formulario = false;
    if (entrada.acao != 'cancelar') {
       if ((entrada.acao == "atualizar") || (entrada.acao == "adicionar"))
       {
         this.listaalunos.paginacao({ offset: this.pagina -1 });
       }
    }
  }

  pesquisarAluno() {

      this.formulario     = false;
      this.listaalunos.listaAlunos(this.filterForm.value.pesquisarpor,this.filterForm.value.search);
  }

  getPesquisar(campos="")
  {
    this.formulario       = false;
    this.listaalunos.listaAlunos("nome","");
  }

 
}
