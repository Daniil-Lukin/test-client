import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInputComponent } from './components/user-input/user-input.component';

const routes: Routes = [
  {
    path: '',
    component: UserInputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputRoutingModule {}
