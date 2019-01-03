import {Component, Input, OnInit} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {sexeEnum} from "../dataInterfaces/sexe";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  @Input() patient: PatientInterface;
  @Input() infirmiers;
  @Input() cabinetService;
  selectedValue: string;
  private enumM = sexeEnum.M;

  constructor(private cabinetMedicalService: CabinetMedicalService)  {
  }

  getNom() {
    return this.patient.nom;
  }

  getPrenom() {
    return this.patient.prenom;
  }

  getSexe() {
    return this.patient.sexe;
  }

  getNum() {
    return this.patient.numeroSecuriteSociale;
  }

  getAdresse() {
    return this.patient.adresse.numero + " " + this.patient.adresse.rue + " " + this.patient.adresse.ville + " " + this.patient.adresse.codePostal;
  }





  service_affecter(id: string){
    this.cabinetMedicalService.affecter_patient(id, this.patient);
  }

  ngOnInit() {
  }


}
