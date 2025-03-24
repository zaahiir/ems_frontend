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
export class MarketingService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private amc: string;
  private fileType: string;
  private shareLinks: string;

  constructor() {  
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "marketing/listing/";
    this.processing = this.apiUrl + "marketing/";
    this.deletion = this.apiUrl + "marketing/0/deletion/";
    this.amc = this.apiUrl + "amcEntry/";
    this.fileType = this.apiUrl + "fileType/";
    this.shareLinks = this.apiUrl + "marketing/0/share_links/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Commission
  listsMarketing(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}marketing/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getMarketingById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processMarketing(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // Delete particular Marketing
  deleteMarketing(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
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

  getFileType() {
    return axios.get(this.fileType, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Get share links for a marketing item
  getShareLinks(id: any) {
    return axios.get(this.shareLinks.replace('0', id), {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getFullUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `${this.apiUrl}${path}`;
  }
}
