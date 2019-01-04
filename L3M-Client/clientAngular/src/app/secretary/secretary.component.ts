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

  }
  initCMS() {
    this.cabinetMedicalService.getData('/data/cabinetInfirmier.xml').then(cms => {
      this._cms = cms;
      if (this.cms === undefined) {
        this.toast.error('Erreur lors de la recuperation des données');
      }
    });
  }

  getInfirmiers() {
     return this.cms.infirmiers;
  }
}
