import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { clientCommonInterface } from '../../interfaces/interfaces';
import { countryInterface } from '../../interfaces/interfaces';


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
export class CourierService {
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private listFiles: string;
  private deleteFile: string;
  private clientName: string;
  private countryEndpoint: string;

  constructor() { 
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "courier/listing/";
    this.processing = this.apiUrl + "courier/";
    this.deletion = this.apiUrl + "courier/0/deletion/";
    this.listFiles = this.apiUrl + "courierFiles/0/listing/";
    this.deleteFile = this.apiUrl + "courierFiles/0/deletion/";
    this.clientName = this.apiUrl + "client/";
    this.countryEndpoint = this.apiUrl + "country/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Commission
  listsCourier(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}courier/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getcourierById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processCourier(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  deleteCourier(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  listsCourierFiles(id: string) {
    return axios.get(this.listFiles.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  deleteCourierFile(id: string) {
    return axios.get(this.deleteFile.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getFullUrl(path: string): string {
    if (!path) return '';
    path = path.replace(/([^:]\/)\/+/g, "$1");
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    path = path.replace('/apis/', '');
    return `${this.apiUrl.replace('/apis/', '')}${path}`;
  }

  getClientNames(): Promise<clientCommonInterface[]> {
    return axios.get(this.clientName, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => response.data);
  }

  getCountries(): Promise<countryInterface[]> {
    return axios.get(this.countryEndpoint, {
      headers: this.getHeaders()
    }).then(response => response.data);
  }
}