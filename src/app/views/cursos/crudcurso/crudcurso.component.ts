import { Component, OnInit, Input, Output, EventEmitter,ViewChild  }  from "@angular/core";
import { FormControl, FormGroup, Validators }                         from "@angular/forms";
import { MatSnackBar }                                                from "@angular/material/snack-bar";
import { MatDialog }                                                  from "@angular/material/dialog";
import { AppLoaderService }                                           from "app/shared/services/app-loader/app-loader.service";
import { CursoService }                                               from "../curso.service";

@Component({
  selector: "app-crudcurso",
  templateUrl: "./crudcurso.component.html",
  styleUrls: ["./crudcurso.component.scss"]
})
export class CrudcursoComponent implements OnInit {

  @Input()  entrada;
  @Output() saida = new EventEmitter();

  public id: number;
  public cursoForm: FormGroup;

  constructor(
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private cursoService: CursoService
  ) { }

  ngOnInit() {

    this.cursoForm =     	new FormGroup({
      titulo:          		new FormControl("", [Validators.required]),
      descricao:          new FormControl("", [Validators.required]),
    });

  }
 
  abrirFormulario(id) {

    this.cursoForm =       new FormGroup({
      titulo:              new FormControl("", [Validators.required]),
      descricao:           new FormControl("", [Validators.required]),
    });

    this.id = id;

    if (this.id > 0) {
      this.cursoService.obterCurso(this.id).subscribe(curso => {
      this.cursoForm.patchValue({ titulo: curso.titulo });
      this.cursoForm.patchValue({ descricao: curso.descricao });
      });
   } else {
      this.cursoForm.patchValue({ titulo: "" });
      this.cursoForm.patchValue({ descricao: "" });
    }
    
  }

  cancelarFormulario() {
    const saida = {
      acao: 'cancelar',
      curso: {}
    }
    this.saida.emit(saida);
  }

  submit() {
	  
    this.loader.open();

    if (this.id > 0) {
      this.cursoService.atualizarCurso(this.id, this.cursoForm.value)
        .subscribe(curso => {
          this.loader.close();
          this.snack.open("Curso alterado com sucesso!", "OK", { duration: 4000 });
          const saida = {
            acao: 'atualizar',
            curso: curso
          }
          this.saida.emit(saida);
        },
          error => {
            this.loader.close();
            let message = "";
            if (error.error) {
              for (const k in error.error) {
                if (k > '0') {
                  message += error.error[k] + " | ";
                } else {
                  message += error.error[k] + " ";
                }
              }
            }
            this.snack.open(message, "OK", { duration: 6000 });
          }
        );
    } else {
      this.cursoService.adicionarCurso(this.cursoForm.value)
        .subscribe(curso => {
          this.loader.close();
          this.snack.open("Curso adicionado com sucesso!", "OK", { duration: 4000 });
          const saida = {
            acao: 'adicionar',
            curso: curso
          }
          this.saida.emit(saida);
        },
          error => {
            this.loader.close();
            let message = "";
            if (error.error) {
              for (const k in error.error) {
                if (k > '0') {
                  message += error.error[k] + " | ";
                } else {
                  message += error.error[k] + " ";
                }
              }
            }
            this.snack.open(message, "OK", { duration: 6000 });
          }
        );
    }
  }

}
