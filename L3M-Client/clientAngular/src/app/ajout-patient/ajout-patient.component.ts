import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CabinetMedicalService} from "../cabinet-medical.service";

@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.css']
})
export class AjoutPatientComponent implements OnInit {
myForm: FormGroup;
  constructor(private fb: FormBuilder, private cabinetService: CabinetMedicalService) { }
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
  ajoutPatient(nom: string, prenom: string, numSec: string, sexe: string, date: string, etage: string, numero: string, rue: string, codePostal: number, ville: string){
    this.cabinetService.ajouter_patient(nom, prenom, numSec, sexe, date, etage, numero, rue, codePostal, ville);
    console.log("Ajout avec succes");
  }
  get nom() {
    return this.myForm.get('nom');
  }
  get prenom() {
    return this.myForm.get('prenom');
  }

}
