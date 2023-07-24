import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInput } from 'src/app/core/interfaces/input/input';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  constructor(private httpClient: HttpClient) {}

  public getAllInputs() {
    return this.httpClient.get<any>(`${environment.apiUrl}/value`);
  }

  public getInput(id: string) {
    return this.httpClient.get<UserInput>(`${environment.apiUrl}/value/${id}`);
  }

  public deleteInput(id: string) {
    return this.httpClient.delete<UserInput>(
      `${environment.apiUrl}/value/${id}`
    );
  }

  public cahngeInput(id: string, value: string) {
    return this.httpClient.put<UserInput>(`${environment.apiUrl}/value/${id}`, {
      value,
    });
  }

  public createInput(value: string) {
    return this.httpClient.post<UserInput>(`${environment.apiUrl}/value`, {
      value,
    });
  }
}
