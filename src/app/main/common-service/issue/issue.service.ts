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
export class IssueService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private issueType: string;
  private clientName: string;

  constructor() { 
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "issue/listing/";
    this.processing = this.apiUrl + "issue/";
    this.deletion = this.apiUrl + "issue/0/deletion/";
    this.issueType = this.apiUrl + "issueType/";
    this.clientName = this.apiUrl + "client/";
  }

  private getHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  // List all/particular Commission
  listsIssue(page: number, pageSize: number, search: string = ''): Observable<ApiResponse<any>> {
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
    const url = `${this.apiUrl}issue/total_count/?search=${search}`;
    return from(axios.get(url, { headers: this.getHeaders() })).pipe(
      map(response => response.data.total_count)
    );
  }

  getIssueById(id: string): Observable<ApiResponse<any>> {
    return from(axios.get(`${this.processing}${id}/list_for_update/`, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  processIssue(data: any, id: string = '0'): Observable<ApiResponse<any>> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, { headers: this.getHeaders() })).pipe(
      map(response => response.data)
    );
  }

  // Delete particular Issue
  deleteIssue(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  // Delete particular Issue
  getIssueType(){
    return axios.get(this.issueType, {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  getClientName(){
    return axios.get(this.clientName, {
      headers:{
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}
