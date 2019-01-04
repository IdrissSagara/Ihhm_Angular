import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  cabinet: CabinetInterface;
  infirmier: InfirmierInterface[];
  patient: PatientInterface[];
  constructor(private cabinetMedicalService: CabinetMedicalService) { }

  ngOnInit() {
    this.initDataTable();
  }

  initDataTable() {
    this.cabinetMedicalService.getData('/data/cabinetInfirmier.xml').then(patient => {
      this.cabinet = patient;
      console.log( this.cabinet  );
    });
  }
  image(nom: string) {
    return 'data/' + nom;
  }

}
