import { Routes } from '@angular/router';
import { CursoComponent } from './curso.component';

export const CursoRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: CursoComponent,
      data: { title: 'Cursos', breadcrumb: 'Cursos' }
    }]
  }
  ];
  