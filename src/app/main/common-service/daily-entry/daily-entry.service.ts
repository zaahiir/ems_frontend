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
export class DailyEntryService {
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private fetchFunds: string;
  private fetchClientDetails: string;
  private fetchTransactionModes: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType);
    this.lists = this.apiUrl + "dailyEntry/listing/";
    this.processing = this.apiUrl + "dailyEntry/";
    this.deletion = this.apiUrl + "dailyEntry/";
    this.fetchFunds = this.apiUrl + "dailyEntry/get_funds_by_amc/";
    this.fetchClientDetails = this.apiUrl + "dailyEntry/get_client_details/";
    this.fetchTransactionModes = this.apiUrl + "transcationMode/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  private getMultipartHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      "Content-Type": "multipart/form-data"
    };
  }

  listDailyEntries(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}dailyEntry/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getDailyEntryById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processDailyEntry(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        if (key === 'dailyEntryFile' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    return from(axios.post(`${this.processing}${id}/processing/`, formData, {
      headers: this.getMultipartHeaders()
    })).pipe(
      map(response => response.data)
    );
  }

  deleteDailyEntry(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.deletion}${id}/deletion/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  getFundsByAmc(amcId: string | number): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.fetchFunds}?amc_id=${amcId}`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  getClientDetails(searchTerm: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.fetchClientDetails}?search_term=${searchTerm}`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  getTransactionModes(): Observable<ApiResponse<any>> {
    return from(axios.get(this.fetchTransactionModes, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }
}
