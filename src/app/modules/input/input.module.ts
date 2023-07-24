import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputRoutingModule } from './input-routing.module';
import { UserInputComponent } from './components/user-input/user-input.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [UserInputComponent],
  imports: [
    CommonModule,
    InputRoutingModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
  ],
})
export class InputModule {}
