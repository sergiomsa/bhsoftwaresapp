import { Component, OnInit, Input, Output, EventEmitter,ViewChild  }  from "@angular/core";
import { FormControl, FormGroup, Validators }                         from "@angular/forms";
import { MatSnackBar }                                                from "@angular/material/snack-bar";
import { MatDialog }                                                  from "@angular/material/dialog";
import { AppLoaderService }                                           from "app/shared/services/app-loader/app-loader.service";
import { AlunoService }                                               from "../aluno.service";
import { CustomValidators }                                           from "ngx-custom-validators";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter }                 from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE }             from '@angular/material/core';

@Component({
  selector: "app-crudaluno",
  templateUrl: "./crudaluno.component.html",
  styleUrls: ["./crudaluno.component.scss"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class CrudalunoComponent implements OnInit {

  @Input()  entrada;
  @Output() saida = new EventEmitter();

  public id: number;
  public alunoForm: FormGroup;
  public cursos: any = [];

  constructor(
    private loader: AppLoaderService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private alunoService: AlunoService
  ) { }

  ngOnInit() {

    this.alunoForm =     	new FormGroup({
      nome:              	new FormControl('', [Validators.required]),
      email:           		new FormControl('', [Validators.required]),
      datadenascimento:   new FormControl('', [Validators.required,CustomValidators.date]),
      curso_id:         	new FormControl('', [Validators.required]),
    });

  }
 
  abrirFormulario(id) {

    this.alunoService.obterCursos().subscribe(response => {
      this.cursos = response;
    });

    this.alunoForm =    	new FormGroup({
      nome:              	new FormControl('', [Validators.required]),
      email:           		new FormControl('', [Validators.required]),
      datadenascimento:   new FormControl('', [Validators.required,CustomValidators.date]),
      curso_id:         	new FormControl('', [Validators.required]),
    });

    this.id = id;

    if (this.id > 0) {
      this.alunoService.obterAluno(this.id).subscribe(aluno => {
      this.alunoForm.patchValue({ nome: aluno.nome });
      this.alunoForm.patchValue({ email: aluno.email });
      this.alunoForm.patchValue({ datadenascimento: aluno.datadenascimento });
      this.alunoForm.patchValue({ curso_id: aluno.curso_id });
      });
   } else {
      this.alunoForm.patchValue({ nome: '' });
      this.alunoForm.patchValue({ email: '' });
      this.alunoForm.patchValue({ datadenascimento: '' });
      this.alunoForm.patchValue({ curso_id: '' });
    }
    
  }

  cancelarFormulario() {
    const saida = {
      acao: 'cancelar',
      aluno: {}
    }
    this.saida.emit(saida);
  }

  submit() {
	  
    this.loader.open();

    if (this.id > 0) {
      this.alunoService.atualizarAluno(this.id, this.alunoForm.value)
        .subscribe(aluno => {
          this.loader.close();
          this.snack.open("Aluno alterado com sucesso!", "OK", { duration: 4000 });
          const saida = {
            acao: 'atualizar',
            aluno: aluno
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
      this.alunoService.adicionarAluno(this.alunoForm.value)
        .subscribe(aluno => {
          this.loader.close();
          this.snack.open("Aluno adicionado com sucesso!", "OK", { duration: 4000 });
          const saida = {
            acao: 'adicionar',
            aluno: aluno
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
