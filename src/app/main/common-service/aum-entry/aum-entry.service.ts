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
export class AumEntryService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private arn: string;
  private amc: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "aumEntry/listing/";
    this.processing = this.apiUrl + "aumEntry/";
    this.deletion = this.apiUrl + "aumEntry/0/deletion/";
    this.arn = this.apiUrl + "arnEntry/";
    this.amc = this.apiUrl + "amcEntry/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Aum
  listsAum(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}aumEntry/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getAumById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processAum(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // Delete particular Aum
  deleteAum(id: string): Promise<any> {
    const url = this.deletion.replace('0', id);
    return axios.get(url, {
      headers: this.getHeaders()
    });
  }

  getArn() {
    return axios.get(this.arn, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getAmc() {
    return axios.get(this.amc, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}
