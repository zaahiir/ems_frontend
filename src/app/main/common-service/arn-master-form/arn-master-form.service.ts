import { Injectable } from '@angular/core'; 
import { BaseAPIUrl, baseURLType } from '../commom-api-url'; 
import axios from 'axios';  

@Injectable({ 
  providedIn: 'root' 
})
export class ArnMasterFormService { 
  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;
  private countries: string;
  private states: string;

  constructor() { 
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType);
    this.lists = this.apiUrl + "arnEntry/0/listing/";
    this.processing = this.apiUrl + "arnEntry/0/processing/";
    this.deletion = this.apiUrl + "arnEntry/0/deletion/";
    this.countries = this.apiUrl + "arnEntry/countries/";
    this.states = this.apiUrl + "states/";
  }

  // List all/particular Arn
  listsArn(id: any) {
    return axios.get(this.lists.replace('0', id), { 
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem('access_token')}` 
      } 
    });
  }

  // Create/Update Arn
  processArn(data: any, id: any) {
    const url = this.processing.replace('0', id);
    return axios.post(url, data, { 
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem('access_token')}` 
      } 
    });
  }

  // Delete particular Arn
  deleteArn(id: any) {
    return axios.get(this.deletion.replace('0', id), { 
      headers: { 
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
}
