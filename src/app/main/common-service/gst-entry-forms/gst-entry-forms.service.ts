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
export class GstEntryFormsService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private amc: string;
  private arn: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "gstEntry/listing/";
    this.processing = this.apiUrl + "gstEntry/";
    this.deletion = this.apiUrl + "gstEntry/0/deletion/";
    this.amc = this.apiUrl + "amcEntry/";
    this.arn = this.apiUrl + "arnEntry/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular GST entries
  listsGst(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}gstEntry/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getGstById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processGst(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // Delete particular GST entry
  deleteGst(id: any): Promise<any> {
    return axios.get(this.deletion.replace('0', id), {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Get AMC list
  getAmc(): Promise<any> {
    return axios.get(this.amc, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Get ARN list
  getArn(): Promise<any> {
    return axios.get(this.arn, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Check for duplicate GST entries (updated method signature)
  checkDuplicate(arnNumber: string, amcId: string, invoiceNumber: string, invoiceDate: string): Observable<{exists: boolean, message?: string}> {
    const params = new URLSearchParams({
      arn_number: arnNumber,
      amc_id: amcId,
      invoice_number: invoiceNumber,
      invoice_date: invoiceDate
    });
    const url = `${this.apiUrl}gstEntry/check_duplicate/?${params.toString()}`;

    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }
}
