import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {CabinetMedicalService} from "../cabinet-medical.service";

@Component({
  selector: 'app-infirmiers',
  templateUrl: './infirmiers.component.html',
  styleUrls: ['./infirmiers.component.css']
})
export class InfirmiersComponent implements OnInit {
  @Input() infirmier: InfirmierInterface;
  @Input() cabinetService;
  @Output() Desaffecter: EventEmitter<PatientInterface> = new EventEmitter();

  constructor(private cabinetMedicalService: CabinetMedicalService ) { }

  getNom () {
    return this.infirmier.nom;
  }
  getPrenom () {
    return this.infirmier.prenom;
  }
  getPhotoURL() {
    return "data/"+this.infirmier.photo;
  }
  getAdresse () {
    return  this.infirmier.adresse.numero+" "+this.infirmier.adresse.rue+" "+this.infirmier.adresse.ville+" "+this.infirmier.adresse.codePostal;
  }
  getId(){
    return this.infirmier.id;
  }

  getPatients() {
    return this.infirmier.patients;
  }
  getPresenter(pat: PatientInterface) {
    return pat.prenom + " " + pat.nom;
  }
  service_desaffecter(pat: PatientInterface) {
    this.cabinetMedicalService.desaffecter_patient(pat, this.infirmier.id);
    this.Desaffecter.emit(pat);
  }
  ngOnInit() {
  }

}
