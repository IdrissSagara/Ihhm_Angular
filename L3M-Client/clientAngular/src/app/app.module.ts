import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatCardModule, MatChipsModule,
  MatDatepickerModule, MatDialogModule,
  MatFormFieldModule, MatGridListModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatSelectModule, MatTab, MatTabGroup, MatTableModule, MatTabsModule
} from '@angular/material';
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataViewModule} from 'primeng/dataview';
import {Panel, PanelModule} from "primeng/panel";
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import {DataTableModule} from "primeng/primeng";
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    CabinetComponent,
    PatientsComponent,
    InfirmiersComponent,
    AjoutPatientComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, MatGridListModule,
    MatTableModule, MatCardModule, MatTabsModule, MatChipsModule,
    NoopAnimationsModule, MatIconModule, MatListModule,
    MatNativeDateModule, MatDialogModule, MatToolbarModule,
    MatMenuModule, MatSelectModule, MatDatepickerModule,
    MatIconModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule ,
    FormsModule, ReactiveFormsModule,
    DataViewModule, PanelModule, DataTableModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
