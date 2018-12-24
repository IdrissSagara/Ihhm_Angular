
import { Adresse } from './dataInterfaces/adresse';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CabinetInterface } from './dataInterfaces/cabinet';
import { PatientInterface } from './dataInterfaces/patient';
import { sexeEnum } from './dataInterfaces/sexe';

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  update_pat = new EventEmitter<any>();
  update_aff = new EventEmitter<any>();
  update_desaff = new EventEmitter<any>();

  private _cabinet: CabinetInterface;

  private _http: HttpClient;
  public get http(): HttpClient { return this._http; }

  constructor( http: HttpClient ) {
    this._http = http;
  }

  async getData( url: string ): Promise<CabinetInterface>
  {
    // get HTTP response as text
    const response = await this.http.get(url, { responseType: 'text' }).toPromise();

    // parse the response with DOMParser
    let parser = new DOMParser();
    let doc = parser.parseFromString(response, 'application/xml');

    // if no doc, exit
    if(!doc) return null;

    // default cabinet
    const cabinet: CabinetInterface = {
      infirmiers: [],
      patientsNonAffectés: [],
      adresse: this.getAdressFrom( doc.querySelector( 'cabinet' ) )
    };

    // 1 - tableau des infirmiers
    const infirmiersXML =  Array.from( doc.querySelectorAll( "infirmiers > infirmier" ) ); //transformer la NodeList en tableau pour le map

    cabinet.infirmiers = infirmiersXML.map( I => ({
      id      : I.getAttribute("id"),
      prénom  : I.querySelector("prénom").textContent,
      nom     : I.querySelector("nom"   ).textContent,
      photo   : I.querySelector("photo" ).textContent,
      adresse : this.getAdressFrom(I),
      patients: []
    }) );

    // 2 tableau des patients
    const patientsXML  = Array.from( doc.querySelectorAll( "patients > patient" ) );
    const patients: PatientInterface[] = patientsXML.map( P => ({
      prénom: P.querySelector("prénom").textContent,
      nom: P.querySelector("nom").textContent,
      sexe: P.querySelector("sexe").textContent === "M" ? sexeEnum.M : sexeEnum.F,
      numéroSécuritéSociale: P.querySelector("numéro").textContent,
      adresse: this.getAdressFrom( P )
    }) );

    // 3 Tableau des affectations à faire.
    const affectations = patientsXML.map( (P, i) => {
      const visiteXML = P.querySelector( "visite[intervenant]" );
      let infirmier: InfirmierInterface = null;
      if (visiteXML !== null) {
        infirmier = cabinet.infirmiers.find( I => I.id === visiteXML.getAttribute("intervenant") );
      }
      return {patient: patients[i], infirmier: infirmier};
    } );

    // 4 Réaliser les affectations
    affectations.forEach( ({patient: P, infirmier: I}) => {
      if (I !== null) {
        I.patients.push( P );
      } else {
        cabinet.patientsNonAffectés.push( P );
      }
    });

    // Return the cabinet
    return cabinet;

  }

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville       : (node = root.querySelector("adresse > ville")     ) ? node.textContent                    : "",
      codePostal  : (node = root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue         : (node = root.querySelector("adresse > rue")       ) ? node.textContent                    : "",
      numéro      : (node = root.querySelector("adresse > numéro")    ) ? node.textContent                    : "",
      étage       : (node = root.querySelector("adresse > étage")     ) ? node.textContent                    : "",
    };
  }
  ajouter_patient(nom: string, prenom: string, numSec: string, sexe: string, date: string, etage: string, numero: string, rue: string, codePostal: number, ville: string) {

    const current_adresse: Adresse = {
      numéro : numero,
      rue : rue,
      codePostal : codePostal,
      ville : ville,
      étage : etage,
    }

    const current_pat: PatientInterface = {
      prénom: prenom,
      nom: nom,
      sexe:  sexe === 'H' ? sexeEnum.M : sexeEnum.F,
      numéroSécuritéSociale: numSec,
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

}
