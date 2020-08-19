import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainmenuComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      {
        path: 'mainmenu',
        component: MainmenuComponent,
        canActivate: [AuthGuard],
      },
      { path: 'createuser', component: CreateUserComponent },
    ]),
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
