import { Component, ViewChild, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AppLoaderService } from "../../shared/services/app-loader/app-loader.service";
import { CursoService } from "./curso.service";
import { AppConfirmService } from "../../shared/services/app-confirm/app-confirm.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CrudcursoComponent } from "./crudcurso/crudcurso.component";
import { ListacursosComponent } from "./listacursos/listacursos.component";


@Component({
  selector: "app-curso",
  templateUrl: "./curso.component.html",
  styleUrls: ["./curso.component.scss"]
})

export class CursoComponent {
 
  @ViewChild("listacursos") listacursos: ListacursosComponent;
  @ViewChild("crudcurso")   crudcurso: CrudcursoComponent;
  
  public filterForm: FormGroup; 
  public filterestrForm: FormGroup; 
  public id: number;
  public formulario: boolean;
  public entrada: any   = [];
  public pagina: number = 1;
  public oentrada:  any = [];
  
  constructor(
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private cursoService: CursoService,
    private confirmService: AppConfirmService

  ) { }

  ngOnInit() {

    this.formulario             = false;
    this.filterForm             = new FormGroup({
      search:                     new FormControl("", [Validators.required]),
      pesquisarpor:               new FormControl("titulo", [Validators.required])
    });

  }
 
  inserirCurso()
  {
    this.formulario = true;
    this.crudcurso.abrirFormulario(0);
  }

  getAcaoLista(acao) {

    this.pagina = acao.pagina;
    //
    // ação dos botoes da lista (Editar ou Excluir Registro)
    //
    switch (acao.acao) {
      case "editar": {
        this.formulario       = true;
        this.crudcurso.abrirFormulario(acao.curso.id);
        break;
      }
      case "excluir": {
        this.confirmService.confirm({ message: `Excluir curso: ${acao.curso.titulo}?` })
          .subscribe(res => {
            if (res) {
              this.loader.open();
              this.cursoService.removerCurso(acao.curso.id)
                .subscribe(data => {
                  this.loader.close();
                  this.snack.open("Curso excluido!", "OK", { duration: 4000 });
                  this.listacursos.paginacao({ offset: this.pagina - 1 });
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
         this.listacursos.paginacao({ offset: this.pagina -1 });
       }
    }
  }

  pesquisarCurso() {

      this.formulario     = false;
      this.listacursos.listaCursos(this.filterForm.value.pesquisarpor,this.filterForm.value.search);
  }

  getPesquisar(campos="")
  {
    this.formulario       = false;
    this.listacursos.listaCursos("titulo","");
  }

 
}
