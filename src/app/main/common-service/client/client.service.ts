import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';


interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  total_count?: number;
  total_pages?: number;
  current_page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl: string;
  private lists: string;
  private listClient: string;
  private processing: string;
  private deletion: string;
  private countries: string;
  private states: string;
  private gender: string;
  private maritalStatus: string;
  private politicallyExposedPerson: string;
  private bankName: string;
  private relationship: string;
  private accountType: string;
  private accountPreference: string;

  constructor() {  
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "client/listing/";
    this.listClient = this.apiUrl + "client/0/listing_client/";
    this.processing = this.apiUrl + "client/";
    this.deletion = this.apiUrl + "client/0/deletion/";
    this.countries = this.apiUrl + "client/countries/";
    this.states = this.apiUrl + "states/";
    this.gender = this.apiUrl + "gender/";
    this.maritalStatus = this.apiUrl + "maritalStatus/";
    this.politicallyExposedPerson = this.apiUrl + "politicallyExposedPerson/";
    this.bankName = this.apiUrl + "bankName/";
    this.relationship = this.apiUrl + "relationship/";
    this.accountType = this.apiUrl + "accountType/";
    this.accountPreference = this.apiUrl + "accountPreference/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Commission
  listsClient(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
      search: search
    });
    const url = `${this.lists}?${params.toString()}`;
    
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  getTotalCount(search: string = ''): Observable<number> {
    const url = `${this.apiUrl}client/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getClientById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processClient(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // List all/particular Client Details
  listsClientDetails(id: any){
    return axios.get(this.listClient.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Delete particular Client
  deleteClient(id: any){
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

  getGender() {
    return axios.get(this.gender, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getMaritalStatus() {
    return axios.get(this.maritalStatus, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getPoliticallyExposedPerson() {
    return axios.get(this.politicallyExposedPerson, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getBankName() {
    return axios.get(this.bankName, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getRelationship() {
    return axios.get(this.relationship, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getAccountType() {
    return axios.get(this.accountType, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getAccountPreference() {
    return axios.get(this.accountPreference, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getFullUrl(path: string): string {
    if (!path) return '';
    
    // Remove any double slashes (except for http://)
    path = path.replace(/([^:]\/)\/+/g, "$1");
    
    // If the path already starts with http:// or https://, return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Remove '/apis/' if present
    path = path.replace('/apis/', '');
    
    // Construct the full URL
    return `${this.apiUrl.replace('/apis/', '')}${path}`;
  }

}

