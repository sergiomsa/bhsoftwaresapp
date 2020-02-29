import { Routes } from '@angular/router';
import { AlunoComponent } from './aluno.component';

export const AlunoRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: AlunoComponent,
      data: { title: 'Alunos', breadcrumb: 'Alunos' }
    }]
  }
  ];
  