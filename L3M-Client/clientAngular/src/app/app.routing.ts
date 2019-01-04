import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AjoutPatientComponent} from "./ajout-patient/ajout-patient.component";
import {InfirmiersComponent} from "./infirmiers/infirmiers.component";
import {SecretaryComponent} from "./secretary/secretary.component";
import {PatientsComponent} from "./patients/patients.component";
import {CabinetComponent} from "./cabinet/cabinet.component";


export const routes: Routes = [
  {path: 'ajout-patient', component: AjoutPatientComponent},
  {path: 'secretary', component: SecretaryComponent},
  {path: 'cabinet', component: CabinetComponent},

];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

