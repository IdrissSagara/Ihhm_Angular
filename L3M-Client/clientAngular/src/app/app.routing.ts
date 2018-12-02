import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AjoutPatientComponent} from "./ajout-patient/ajout-patient.component";
import {InfirmiersComponent} from "./infirmiers/infirmiers.component";


export const routes: Routes = [
  {path: 'ajout-patient', component: AjoutPatientComponent},
  {path: 'infirmiers', component: InfirmiersComponent},
];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

