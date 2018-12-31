import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AjoutPatientComponent} from "./ajout-patient/ajout-patient.component";
import {InfirmiersComponent} from "./infirmiers/infirmiers.component";
import {SecretaryComponent} from "./secretary/secretary.component";
import {PatientsComponent} from "./patients/patients.component";


export const routes: Routes = [
  {path: 'ajout-patient', component: AjoutPatientComponent},
  {path: 'infirmiers', component: InfirmiersComponent},
  {path: 'secretary', component: SecretaryComponent},
  {path: 'patient', component: PatientsComponent},
];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

