import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';
import { Observable, from, throwError } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';

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
  private backendBaseUrl: string = 'https://backend.faiop.com';
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
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      // Don't set Content-Type for multipart/form-data - let browser set it with boundary
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

  processDailyEntryWithFormData(formData: FormData, id: string = '0'): Observable<ApiResponse<any>> {
  // Enhanced logging for debugging
  console.log('FormData being sent to API:');
  if (formData && typeof formData.forEach === 'function') {
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${(value.size / 1024 / 1024).toFixed(2)} MB)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    });
  }

  // Log the endpoint being called
  const endpoint = `${this.processing}${id}/processing/`;
  console.log('API Endpoint:', endpoint);

  return from(axios.post(endpoint, formData, {
    headers: this.getMultipartHeaders(),
    timeout: 30000, // 30 second timeout for file uploads
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })).pipe(
    map(response => {
      console.log('API Response:', response.data);
      return response.data;
    }),
    catchError(error => {
      console.error('API Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
        console.error('Error Status:', error.response.status);
      }
      throw error;
    })
  );
}

// Also update the regular processDailyEntry method to use FormData consistently
processDailyEntry(data: any, id: string = '0'): Observable<ApiResponse<any>> {
  const formData = new FormData();

  // Add all form fields to FormData
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (key === 'dailyEntryFile' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        // Convert all values to strings for FormData
        formData.append(key, String(data[key]));
      }
    }
  });

  return this.processDailyEntryWithFormData(formData, id);
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

  // Method to get full file URL
  getFileUrl(relativePath: string): string {
    if (!relativePath) return '';

    // If the path is already a full URL, return as is
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }

    // Always use the backend domain for file URLs, regardless of API URL
    const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
    return `${this.backendBaseUrl}${cleanPath}`;
  }

  // Method to download file with proper headers and backend URL
  downloadFile(relativePath: string): Observable<Blob> {
    const fullUrl = this.getFileUrl(relativePath);

    return from(axios.get(fullUrl, {
      headers: this.getHeaders(),
      responseType: 'blob'
    })).pipe(
      map(response => response.data)
    );
  }

  // Method to get file info with proper backend URL
  getFileInfo(relativePath: string): Observable<any> {
    const fullUrl = this.getFileUrl(relativePath);

    return from(axios.head(fullUrl, { headers: this.getHeaders() })).pipe(
      map(response => ({
        size: response.headers['content-length'],
        type: response.headers['content-type'],
        lastModified: response.headers['last-modified']
      }))
    );
  }
}
