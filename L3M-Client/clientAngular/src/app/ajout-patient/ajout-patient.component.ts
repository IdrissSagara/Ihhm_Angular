import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ajout-patient',
  templateUrl: './ajout-patient.component.html',
  styleUrls: ['./ajout-patient.component.css']
})
export class AjoutPatientComponent implements OnInit {
myForm: FormGroup;
  constructor(private fb: FormBuilder) { }
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
      numsecur: ['', [
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
  get nom() {
    return this.myForm.get('nom');
  }
  get prenom() {
    return this.myForm.get('prenom');
  }

}
