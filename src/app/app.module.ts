import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';

import { Socialservice } from './services/social.service'
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
  providers: [Socialservice],
  bootstrap: [AppComponent]
})
export class AppModule { }
