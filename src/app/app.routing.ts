import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/components/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./shared/components/layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "./shared/services/auth/auth.guard";

export const rootRouterConfig: Routes = [
  {
    path: "",
    redirectTo: "cursos",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "cursos",
        loadChildren: () =>
          import("./views/cursos/curso.module").then(m => m.CursoModule),
        data: { title: "Cursos", breadcrumb: "Cursos" }
      }
    ]
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "alunos",
        loadChildren: () =>
          import("./views/alunos/aluno.module").then(m => m.AlunoModule),
        data: { title: "Alunos", breadcrumb: "Alunos" }
      }
    ]
  },
  {
    path: "**",
    redirectTo: "sessions/404"
  }
];
