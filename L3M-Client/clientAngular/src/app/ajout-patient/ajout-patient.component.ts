import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {ToastrService} from "ngx-toastr";
import {PatientInterface} from "../dataInterfaces/patient";
import {sexeEnum} from "../dataInterfaces/sexe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.css']
})
export class AjoutPatientComponent implements OnInit {
  myForm: FormGroup;
  patient: PatientInterface;
  "F" = sexeEnum.F;
  "M" = sexeEnum.M;
  sexe: string;
  @Output() addEvent: EventEmitter<any> = new EventEmitter();

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

  ajoutPatient(nom: string, prenom: string, numSec: string, sexe: string, date: string, etage: string, numero: string, rue: string, codePostal: number, ville: string) {
    this.cabinetService.ajouter_patient(nom, prenom, numSec, sexe, date, etage, numero, rue, codePostal, ville);
    this.toastr.success('à été crée avec succès', 'Le patient')
    this.router.navigateByUrl('secretary');
    console.log("Ajout avec succes");
  }

  get nom() {
    return this.myForm.get('nom');
  }

  get prenom() {
    return this.myForm.get('prenom');
  }

  efface() {
    this.myForm.reset();
    this.intialisationFormulaire();
  }

  private intialisationFormulaire() {
    this.myForm.setValue({
      nom: '',
      prenom: '',
      numSecu: '',
      sexe: null,
      naissance: '',
      Etage: '',
      Num: '',
      Rue: '',
      CP: '',
      ville: '',
    });
  }
}
