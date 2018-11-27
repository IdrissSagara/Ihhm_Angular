import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { CabinetComponent } from './cabinet/cabinet.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
