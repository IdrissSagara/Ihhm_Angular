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
  all: PatientInterface;
  @Input() infirmiers;
  @Input() cabinetService;
  constructor(private cabinetMedicalService: CabinetMedicalService) {

    this.initCabinet(cabinetMedicalService);
  }
  protected enumM = sexeEnum.F;
  affecter(id: string) {
    this.cabinetService.affecter_patient(id, this.all);
  }
  ngOnInit() {
  }
  async initCabinet(cabinetMedicalService) {
    this.all = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log( this.all  );
  }

}
