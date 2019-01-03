import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {PatientInterface} from "../dataInterfaces/patient";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
   _cms: CabinetInterface;
   infirmiers: InfirmierInterface;
   patients: PatientInterface;
  // sortOptions: infirmier[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService ) {

    this.initCabinet(cabinetMedicalService);
  }
  selectCar($event, car) {
    // event.first = First row offset
    // event.rows = Number of rows per page
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log( this.cms  );
  }

  ngOnInit() {
    this.cabinetMedicalService.getEmitPat()
      .subscribe(item => this.update_ajouter(item));

    this.cabinetMedicalService.getEmitAff()
      .subscribe(aff => this.update_aff(aff));

    this.cabinetMedicalService.getEmitDesaff()
      .subscribe(patdes => this.update_desaff(patdes));
  }
  getInfirmiers() {
     return this.cms.infirmiers;
  }

  getPatients() {
    return this.cms.patientsNonAffectes;

  }


  update_ajouter(item) {
    console.log("coucou");
    this.cms.patientsNonAffectes.push(item);
  }

  update_aff(item) {
    console.log("affecter");
    this.cms.patientsNonAffectes =
      this.cms.patientsNonAffectes.filter(p => p.numeroSecuriteSociale !== item.p.numeroSecuriteSociale);

    this.cms.infirmiers[this.cms.infirmiers.findIndex(e => e.id === item.id)].patients.push(item.p);
    console.log(item.id);
  }

  update_desaff(item){
    console.log("desaffecter");
    const i = this.cms.infirmiers.findIndex(e => e.id === item.id);
    this.cms.infirmiers[i].patients = this.cms.infirmiers[i].patients.filter(e => e.numeroSecuriteSociale !== item.p.numeroSecuriteSociale);
    this.cms.patientsNonAffectes.push(item.p);
  }
  image(nom: string) {
    return 'data/' + nom;
  }
}
