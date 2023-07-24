import { Component, OnInit } from '@angular/core';
import { UserInput } from 'src/app/core/interfaces/input/input';
import { InputService } from '../../services/input.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss'],
})
export class UserInputComponent implements OnInit {
  constructor(
    private inputService: InputService,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}
  public inputs: UserInput[] = [];
  public value: string = '';
  public buttonText = 'Create';
  private _id: string = '';
  public isCreate: boolean = true;

  ngOnInit(): void {
    this.getAllInputs();
  }

  public prevInputClicked(id: string) {
    this.inputService.getInput(id).subscribe((res) => {
      this.value = res.value;
      this._id = id;
      if (this.isCreate) {
        this.toggleState();
      }
    });
  }
  public deleteInput(id: string) {
    this.inputService.deleteInput(id).subscribe(() => this.getAllInputs());
  }
  private createInput() {
    this.inputService
      .createInput(this.value)
      .subscribe(() => this.getAllInputs());
  }
  private toggleText() {
    if (this.isCreate) {
      this.buttonText === 'Create';
    } else {
      this.buttonText === 'Change';
    }
  }
  private toggleState() {
    this.isCreate = !this.isCreate;
    this.toggleText();
  }

  private changeInput(_id: string) {
    this.inputService
      .cahngeInput(_id, this.value)
      .subscribe(() => this.getAllInputs());
  }

  public executeButtonClicked() {
    if (this.isCreate) {
      this.createInput();
    } else {
      this.changeInput(this._id);
    }
  }

  private getAllInputs() {
    this.inputs = [];
    return this.inputService
      .getAllInputs()
      .subscribe((res) =>
        res.map((input: UserInput) => this.inputs.push(input))
      );
  }

  public logout() {
    this.storageService.removeUser();
    this.router.navigate(['/']);
  }

  public refresh() {
    this.authService.refresh(this.storageService.getUserId()).subscribe();
  }

  public deleteUser() {
    this.authService
      .deleteUser(this.storageService.getUserId())
      .subscribe(() => {
        this.storageService.removeUser();
        this.router.navigate(['/']);
      });
  }
}
