import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuardGuard],
    loadChildren: () =>
      import('./modules/input/input.module').then((m) => m.InputModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
