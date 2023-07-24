import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptorInterceptor as JwtInterceptor } from './core/jwt-interceptor.interceptor';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageService } from './modules/auth/services/storage-service.service';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: APP_INITIALIZER,
      useFactory: (storageService: StorageService) => () => {
        const jwtTokenLocal = localStorage.getItem('jwt');
        const jwtTokenSession = sessionStorage.getItem('jwt');
        const userIdLocal = localStorage.getItem('_id') || '';
        const userIdSession = sessionStorage.getItem('_id') || '';
        if (jwtTokenLocal) {
          storageService.setUserData(jwtTokenLocal, userIdLocal);
        }
        if (jwtTokenSession) {
          storageService.setUserData(jwtTokenSession, userIdSession);
        }
      },
      deps: [StorageService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
