import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url: string = environment.API_URL_INV

  API_URI: string

  constructor(private http: HttpClient) {
    this.API_URI = this.url + 'api'
  }

  getData(CODALU: string) {
    return this.http.get(`${this.API_URI}/Universidad/${CODALU}`);
  }
 

}
