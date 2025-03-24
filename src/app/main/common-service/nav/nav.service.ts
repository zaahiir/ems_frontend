import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  private apiUrl: string; 
  private lists: string;
  private processing: string;
  private deletion: string;
  private amc: string;  
  private fundName: string;  
  private fetchNav: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "nav/listing/";
    this.processing = this.apiUrl + "nav/";
    this.deletion = this.apiUrl + "nav/";
    this.amc = this.apiUrl + "amcEntry/";    
    this.fundName = this.apiUrl + "fund/";    
    this.fetchNav = this.apiUrl + "nav/fetch/";
  }


  listsNav(pageSize: number = 100, search: string = '', cursor: string = ''): Observable<AxiosResponse> {
    const params = new URLSearchParams({
      page_size: pageSize.toString(),
      search: search,
      cursor: cursor
    });
    const url = `${this.lists}?${params.toString()}`;
    
    return from(axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    }));
  }

  getTotalCount(search: string = ''): Observable<number> {
    const params = new URLSearchParams({
      search: search
    });
    const url = `${this.apiUrl}nav/total_count/?${params.toString()}`;
    return from(axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    })).pipe(
      map(response => response.data.total_count)
    );
  }

  searchAllRecords(search: string): Observable<AxiosResponse> {
    const url = `${this.lists}?search=${search}&all_records=true`;
    
    return new Observable<AxiosResponse>(observer => {
      axios.get(url, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(response => {
        observer.next(response);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  refreshNavList(pageSize: number = 10, search: string = ''): Observable<AxiosResponse> {
    return this.listsNav(pageSize, search);
  }


  getNavById(id: string) {
    return axios.get(`${this.processing}${id}/list_for_update/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  deleteNav(id: string) {
    return axios.get(`${this.deletion}${id}/deletion/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    }).then(response => {
      if (response.data.code === 1) {
        // this.invalidateCache();
      }
      return response;
    });
  }

  getAmc() {
    return axios.get(this.amc, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }  

  getFundName() {
    return axios.get(this.fundName, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }  

  async getFundsByAmc(amcId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}nav/funds_by_amc/?amc_id=${amcId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error in getFundsByAmc:', error);
      throw error;
    }
  }

  updateNav(data: any, id: string = '0'): Observable<AxiosResponse> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    }));
  }

  getNavUpdateData(id: string): Promise<AxiosResponse> {
    return axios.get(`${this.apiUrl}nav/${id}/get_nav_update_data/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  fetchNavData(date: string) {
    return axios.post(this.fetchNav, { date }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }

  fetchHistoricNavData(startDate: string, endDate: string) {
    return axios.post(this.fetchNav, { start_date: startDate, end_date: endDate }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}