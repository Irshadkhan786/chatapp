import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { Socialservice } from './services/social.service'
import { LoginGaurd } from './services/login-gaurd.service'
import { Authinterceptor } from './services/auth.interceptor'
@NgModule({
  declarations: [
    AppComponent,routingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    Socialservice,
    LoginGaurd,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:Authinterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
