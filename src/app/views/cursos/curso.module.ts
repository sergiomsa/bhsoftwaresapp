import { NgModule }             from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { RouterModule }       	from '@angular/router';
import { ReactiveFormsModule }  from '@angular/forms';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { SharedModule }         from '../../shared/shared.module';
import { NgxDatatableModule }   from '@swimlane/ngx-datatable';
import { MatDividerModule }     from '@angular/material/divider';

 /* Componentes */
import { CursoService }                from './curso.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CursoComponent }     	from './curso.component';
import { CrudcursoComponent } from './crudcurso/crudcurso.component';
import { CursoRoutes } from './curso.routing';
import { ListacursosComponent } from './listacursos/listacursos.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    RouterModule.forChild(CursoRoutes)
  ],
  declarations: [CursoComponent, ListacursosComponent, CrudcursoComponent],
  providers: [CursoService],
  schemas: []
})
export class CursoModule { }
