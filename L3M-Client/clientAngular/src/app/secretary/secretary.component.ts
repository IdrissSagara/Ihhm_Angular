import { CabinetMedicalService } from './../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';
import { CabinetInterface } from '../dataInterfaces/cabinet';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
   _cms: CabinetInterface;
  // sortOptions: infirmier[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(cabinetMedicalService: CabinetMedicalService ) {

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
  }
  image(nom: string) {
    return 'data/' + nom;
  }
}
