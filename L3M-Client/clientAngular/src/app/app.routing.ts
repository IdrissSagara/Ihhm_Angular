import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AjoutPatientComponent} from "./ajout-patient/ajout-patient.component";
import {InfirmiersComponent} from "./infirmiers/infirmiers.component";
import {SecretaryComponent} from "./secretary/secretary.component";
import {PatientsComponent} from "./patients/patients.component";
import {CabinetComponent} from "./cabinet/cabinet.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/auth.guard";


export const routes: Routes = [
  {path: 'ajout-patient', component: AjoutPatientComponent, canActivate: [AuthGuard]},
  {path: 'secretary', component: SecretaryComponent, canActivate: [AuthGuard]},
  {path: 'cabinet', component: CabinetComponent},
  {
    path: '',
    component: LoginComponent, // {4}
    children: [
      {
        path: 'login',
        component: LoginComponent   // {5}
      }
    ]
  }
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);

