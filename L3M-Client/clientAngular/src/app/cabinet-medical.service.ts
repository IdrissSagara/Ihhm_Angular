
import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  update_pat = new EventEmitter<any>();
  update_aff = new EventEmitter<any>();
  update_desaff = new EventEmitter<any>();

  private cabinet: CabinetInterface;
  private document: Document;
  private domParser: DOMParser = new DOMParser();

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  getData(url: string): Promise<CabinetInterface> {
    return new Promise<CabinetInterface>(((resolve, reject) => {
      this.http.get(url, {responseType: 'text'}).toPromise().then(
        res => {
          this.document = this.domParser.parseFromString(res, 'text/xml');
          this.cabinet = {
            infirmiers: [],
            patientsNonAffectes: [],
            adresse: this.getAdressFrom(this.document.querySelector('cabinet'))
          };

          // 1 - tableau des infirmiers
          const infirmiersXML = Array.from(this.document.querySelectorAll('infirmiers > infirmier'));

          this.cabinet.infirmiers = infirmiersXML.map(I => ({
            id: I.getAttribute('id'),
            prenom: I.querySelector('prénom').textContent,
            nom: I.querySelector('nom').textContent,
            photo: I.querySelector('photo').textContent,
            adresse: this.getAdressFrom(I),
            patients: []
          }));

          // 2 tableau des patients
          const patientsXML = Array.from(this.document.querySelectorAll('patients > patient'));
          const patients: PatientInterface[] = patientsXML.map(P => ({
            prenom: P.querySelector('prénom').textContent,
            nom: P.querySelector('nom').textContent,
            sexe: P.querySelector('sexe').textContent === 'M' ? sexeEnum.M : sexeEnum.F,
            numeroSecuriteSociale: P.querySelector('numéro').textContent,
            adresse: this.getAdressFrom(P)
          }));

          // 3 Tableau des affectations à faire.
          const affectations = patientsXML.map((P, i) => {
            const visiteXML = P.querySelector('visite[intervenant]');
            let infirmier: InfirmierInterface = null;
            if (visiteXML !== null && visiteXML.getAttribute('intervenant') !== '') {
              infirmier = this.cabinet.infirmiers.find(I => I.id === visiteXML.getAttribute('intervenant'));
            }
            return {patient: patients[i], infirmier: infirmier};
          });

          // 4 Réaliser les affectations
          affectations.forEach(({patient: P, infirmier: I}) => {
            if (I !== null) {
              I.patients.push(P);
            } else {
              this.cabinet.patientsNonAffectes.push(P);
            }
          });
          this.cabinet.patientsNonAffectes.map(p => {
            //console.log('le patient non affecté: ' + p.nom);
          });
          resolve(this.cabinet);
        }, rej => {
          reject(rej);
        }
      );
    }));
  }

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville       : (node = root.querySelector("adresse > ville")     ) ? node.textContent                    : "",
      codePostal  : (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue         : (node = root.querySelector("adresse > rue")       ) ? node.textContent                    : "",
      numero      : (node = root.querySelector("adresse > numéro")    ) ? node.textContent                    : "",
      etage       : (node = root.querySelector("adresse > étage")     ) ? node.textContent                    : "",
    };
  }
  ajouter_patient(nom: string, prenom: string, numSec: string, sexe: string, date: string, etage: string, numero: string, rue: string, codePostal: number, ville: string) {

    const current_adresse: Adresse = {
      numero : numero,
      rue : rue,
      codePostal : codePostal,
      ville : ville,
      etage : etage,
    }

    const current_pat: PatientInterface = {
      prenom: prenom,
      nom: nom,
      sexe:  sexe === 'H' ? sexeEnum.M : sexeEnum.F,
      numeroSecuriteSociale: numSec,
      adresse: current_adresse
    }


    this.http.post("/addPatient", {
      patientName: nom,
      patientForname: prenom,
      patientNumber: numSec,
      patientSex: sexe === 'H' ? sexeEnum.M : sexeEnum.F,
      patientBirthday: date,
      patientFloor: etage,
      patientStreetNumber: numero,
      patientStreet: rue,
      patientPostalCode: codePostal,
      patientCity: ville
    }).subscribe( response => {if (response) { this.update_pat.emit(current_pat); }});

  }

  public async desAffectation(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this.http.post('/affectation', {
      infirmier: 'none',
      patient: patient.numeroSecuriteSociale
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    if (res.status === 200) {
      return patient;
    }
    return null;
  }
  public async affectation(patient: PatientInterface, infirmierId: string): Promise<PatientInterface> {
    const res = await this.http.post('/affectation', {
      infirmier: infirmierId,
      patient: patient.numeroSecuriteSociale
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    if (res.status === 200) {
      return patient;
    }
    return null;
  }


}
