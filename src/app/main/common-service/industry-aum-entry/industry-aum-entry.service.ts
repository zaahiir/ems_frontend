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
export class IndustryAumEntryService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private mode: string;

  constructor() { 
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "industryAumEntry/listing/";
    this.processing = this.apiUrl + "industryAumEntry/";
    this.deletion = this.apiUrl + "industryAumEntry/0/deletion/";
    this.mode = this.apiUrl + "mode/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Aum
  listsIndustryAumEntry(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}industryAumEntry/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getAumById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processIndustryAumEntry(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // Delete particular IndustryAumEntry
  deleteIndustryAumEntry(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // List Mode
  getMode(){
    return axios.get(this.mode, {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

}
