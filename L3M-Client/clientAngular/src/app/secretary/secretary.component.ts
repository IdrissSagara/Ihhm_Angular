import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {PatientInterface} from "../dataInterfaces/patient";
import {ToastrService} from "ngx-toastr";

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

  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService, private toast: ToastrService) {

  }
  ngOnInit() {
    this.initCMS();
    this.cabinetMedicalService.getEmitAff()
      .subscribe(aff => this.update_aff(aff));

    this.cabinetMedicalService.getEmitDesaff()
      .subscribe(patdes => this.update_desaff(patdes));

  }
  initCMS() {
    this.cabinetMedicalService.getData('/data/cabinetInfirmier.xml').then(cms => {
      this._cms = cms;
      console.log( this.cms  );
    });
  }

  getInfirmiers() {
     return this.cms.infirmiers;
  }

  getPatients() {
    return this.cms.patientsNonAffectes;

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
