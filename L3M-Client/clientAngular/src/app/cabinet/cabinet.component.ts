import { Component, OnInit } from '@angular/core';
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.css']
})
export class CabinetComponent implements OnInit {
  cabinet: CabinetInterface;
  infirmier: InfirmierInterface[];
  patient: PatientInterface[];
  constructor(private cabinetMedicalService: CabinetMedicalService, private toastr: ToastrService) { }
  patientSelectionner: PatientInterface;
  afficherDialogPatient = false;
  ngOnInit() {
    this.initDataTable();
  }
  afficherDialogModif(patient: PatientInterface) {
    this.patientSelectionner = patient;
    this.afficherDialogPatient = true;
  }
  onDialogHideOperation(): void {
    this.afficherDialogPatient = false;
  }

  initDataTable() {
    this.cabinetMedicalService.getData('/data/cabinetInfirmier.xml').then(patient => {
      this.cabinet = patient;
      console.log( this.cabinet  );
    }, error => {
      this.toastr.error(`Un problème est survenu lors de la recuperation des patients. Erreur: ${error.status}`);
    });
  }
  image(nom: string) {
    return 'data/' + nom;
  }

}
