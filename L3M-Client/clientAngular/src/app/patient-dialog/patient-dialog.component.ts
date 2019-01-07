import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {CabinetMedicalService} from "../cabinet-medical.service";
import {ToastrService} from "ngx-toastr";
import {sexeEnum} from "../dataInterfaces/sexe";
import {Router} from "@angular/router";
import {window} from "rxjs/operators";

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css']
})
export class PatientDialogComponent implements OnInit {
  myForm: FormGroup;
  M = sexeEnum.M;
  F = sexeEnum.F;
  @Input() patient: PatientInterface;

  @Input() afficherDialog = false;

  @Output() patientCreeAvecSucces = new EventEmitter<PatientInterface>(true);

  @Output() onDialogHide = new EventEmitter(true);

  titreDialog: 'Formulaire Patient';

  onHide(): void {
    this.onDialogHide.emit();
    this.afficherDialog = false;
  }

  constructor(private fb: FormBuilder, private cabinetService: CabinetMedicalService,
              private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      nom: ['', [
        Validators.required,
      ]],
      prenom: ['', [
        Validators.required,
      ]],
      ville: ['', [
        Validators.required,
      ]],
      numSecu: ['', [
        Validators.required,
      ]],
      numero: ['', [
        Validators.required,
      ]],
      codePostal: ['', [
        Validators.required,
      ]],
      rue: ['', [
        Validators.required,
      ]],
      etage: ['', [
        Validators.required,
      ]],
    });
  }

  ajoutPatient(patient: PatientInterface) {
    this.cabinetService.addPatient(this.patient).then((p) => {
      if (p !== null) {
        this.afficherDialog = false;
        this.toastr.success('Patient Modifier');
      } else {
        this.toastr.error('Erreur lors de la modification ');
      }
    });
  }


  annuler() {
    this.afficherDialog = false;
  }


}
