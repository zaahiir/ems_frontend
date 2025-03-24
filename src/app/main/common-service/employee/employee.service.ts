import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private update_password: string;
  private deletion: string;
  private userType: string;
  private countries: string;
  private baseMediaUrl: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType);
    this.lists = this.apiUrl + "employee/0/listing/";
    this.processing = this.apiUrl + "employee/0/processing/";
    this.update_password = this.apiUrl + "employee/0/update_password/";
    this.deletion = this.apiUrl + "employee/0/deletion/";
    this.userType = this.apiUrl + "userType/";
    this.countries = this.apiUrl + "country/";
    
    // Extract base URL for media files
    this.baseMediaUrl = this.apiUrl.replace('/apis/', '/media/');
  }

  private getHeaders() {
    return {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    };
  }

  private getFormDataHeaders() {
    return {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
        "Content-Type": "multipart/form-data"
      }
    };
  }

  // List all/particular Employee
  listsEmployee(id: any) {
    return axios.get(this.lists.replace('0', id), this.getHeaders());
  }

  // Create/Update Employee
  processEmployee(data: any, id: any) {
    return axios.post(this.processing.replace('0', id), data, this.getFormDataHeaders());
  }

  // Update Employee Password
  updateEmployeePassword(id: any, newPassword: string) {
    return axios.post(this.update_password.replace('0', id), { newPassword }, this.getHeaders());
  }

  // Delete particular Employee
  deleteEmployee(id: any) {
    return axios.get(this.deletion.replace('0', id), this.getHeaders());
  }

  getUserType() {
    return axios.get(this.userType, this.getHeaders());
  }

  getCountries() {
    return axios.get(this.countries, this.getHeaders());
  }
  
  // Helper method to get file URL from backend
  getFileUrl(fileUrl: string): string {
    if (!fileUrl) return '';
    
    // If it's already a full URL, return it
    if (fileUrl.startsWith('http')) {
      return fileUrl;
    }
    
    // Otherwise, construct the URL
    return this.baseMediaUrl + fileUrl;
  }
}