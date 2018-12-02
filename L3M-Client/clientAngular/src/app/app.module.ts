import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule, } from '@angular/router';

import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { CabinetComponent } from './cabinet/cabinet.component';
import { PatientsComponent } from './patients/patients.component';
import { InfirmiersComponent } from './infirmiers/infirmiers.component';
import { AjoutPatientComponent } from './ajout-patient/ajout-patient.component';
import {routes} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    CabinetComponent,
    PatientsComponent,
    InfirmiersComponent,
    AjoutPatientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule ,
    RouterModule.forRoot(routes)
  ],
  exports: [MatButtonModule, MatCheckboxModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
