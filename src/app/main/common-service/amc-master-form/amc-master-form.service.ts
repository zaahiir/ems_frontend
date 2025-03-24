import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AmcMasterFormService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private countries: string;
  private states: string;
  private gstTypes: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "amcEntry/0/listing/";
    this.processing = this.apiUrl + "amcEntry/0/processing/";
    this.deletion = this.apiUrl + "amcEntry/0/deletion/";
    this.countries = this.apiUrl + "amcEntry/countries/";
    this.states = this.apiUrl + "states/";
    this.gstTypes = this.apiUrl + "gstType/";
  }

  // List all/particular Amc
  listsAmc(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Create/Update Amc
  processAmc(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Delete particular Amc
  deleteAmc(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getCountries() {
    return axios.get(this.countries, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getStates() {
    return axios.get(this.states, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getGstTypes() {
    return axios.get(this.gstTypes, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}
