import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {sexeEnum} from "../dataInterfaces/sexe";
import {InfirmierInterface} from "../dataInterfaces/infirmier";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  @Input() patient: PatientInterface;
  @Input() infirmiers: InfirmierInterface[];
  @Input() cabinetService;
  @Output() affEmitter: EventEmitter<PatientInterface> = new EventEmitter();
  @Output() desafEmitter: EventEmitter<PatientInterface> = new EventEmitter();
  selectedValue: string;
  private enumM = sexeEnum.M;

  constructor(private cabinetMedicalService: CabinetMedicalService, private toastr: ToastrService) {
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


  service_affecter(id: string) {
    this.cabinetMedicalService.affectation(this.patient, id).then(p => {
      if (p !== null) {
        this.affEmitter.emit(this.patient);
        this.toastr.success(`affecter avec succes`, `${p.prenom} ${p.nom}`);
      } else {
        this.toastr.error('erreur lors de l\'affectation');
      }
    });
  }

  ngOnInit() {
  }


}
