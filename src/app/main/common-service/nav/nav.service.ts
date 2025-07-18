import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../commom-api-url';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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

  private getAuthHeaders() {
    return {
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`
    };
  }

  listsNav(pageSize: number = 100, search: string = '', cursor: string = ''): Observable<any> {
    const params = new URLSearchParams({
      page_size: pageSize.toString(),
      search: search,
      cursor: cursor
    });
    const url = `${this.lists}?${params.toString()}`;

    return from(axios.get(url, {
      headers: this.getAuthHeaders()
    })).pipe(
      map(response => {
        // Transform the response to match the expected format
        return {
          data: {
            code: response.data.code,
            data: response.data.data,
            message: response.data.message,
            next_cursor: response.data.next_cursor,
            total_count: response.data.total_count
          }
        };
      }),
      catchError(error => {
        console.error('Error in listsNav:', error);
        throw error;
      })
    );
  }

  getTotalCount(search: string = ''): Observable<number> {
    const params = new URLSearchParams({
      search: search
    });
    const url = `${this.apiUrl}nav/total_count/?${params.toString()}`;

    return from(axios.get(url, {
      headers: this.getAuthHeaders()
    })).pipe(
      map(response => response.data.total_count),
      catchError(error => {
        console.error('Error in getTotalCount:', error);
        throw error;
      })
    );
  }

  // Enhanced search with better error handling
  searchAllRecords(search: string): Observable<AxiosResponse> {
    const url = `${this.lists}?search=${search}&page_size=1000`; // Increased page size for "all records"

    return new Observable<AxiosResponse>(observer => {
      axios.get(url, {
        headers: this.getAuthHeaders()
      }).then(response => {
        observer.next(response);
        observer.complete();
      }).catch(error => {
        console.error('Error in searchAllRecords:', error);
        observer.error(error);
      });
    });
  }

  refreshNavList(pageSize: number = 100, search: string = ''): Observable<any> {
    return this.listsNav(pageSize, search);
  }

  getNavById(id: string): Promise<AxiosResponse> {
    return axios.get(`${this.processing}${id}/list_for_update/`, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in getNavById:', error);
      throw error;
    });
  }

  deleteNav(id: string): Promise<AxiosResponse> {
    return axios.get(`${this.deletion}${id}/deletion/`, {
      headers: this.getAuthHeaders()
    }).then(response => {
      if (response.data.code === 1) {
        // Optional: Add any cache invalidation logic here
        console.log('NAV deleted successfully');
      }
      return response;
    }).catch(error => {
      console.error('Error in deleteNav:', error);
      throw error;
    });
  }

  getAmc(): Promise<AxiosResponse> {
    return axios.get(this.amc, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in getAmc:', error);
      throw error;
    });
  }

  getFundName(): Promise<AxiosResponse> {
    return axios.get(this.fundName, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in getFundName:', error);
      throw error;
    });
  }

  async getFundsByAmc(amcId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}nav/funds_by_amc/?amc_id=${amcId}`, {
        headers: this.getAuthHeaders()
      });
      return response.data.data;
    } catch (error) {
      console.error('Error in getFundsByAmc:', error);
      throw error;
    }
  }

  updateNav(data: any, id: string = '0'): Observable<AxiosResponse> {
    return from(axios.post(`${this.processing}${id}/processing/`, data, {
      headers: this.getAuthHeaders()
    })).pipe(
      catchError(error => {
        console.error('Error in updateNav:', error);
        throw error;
      })
    );
  }

  getNavUpdateData(id: string): Promise<AxiosResponse> {
    return axios.get(`${this.apiUrl}nav/${id}/get_nav_update_data/`, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in getNavUpdateData:', error);
      throw error;
    });
  }

  fetchNavData(date: string): Promise<AxiosResponse> {
    return axios.post(this.fetchNav, { date }, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in fetchNavData:', error);
      throw error;
    });
  }

  fetchHistoricNavData(startDate: string, endDate: string): Promise<AxiosResponse> {
    return axios.post(this.fetchNav, { start_date: startDate, end_date: endDate }, {
      headers: this.getAuthHeaders()
    }).catch(error => {
      console.error('Error in fetchHistoricNavData:', error);
      throw error;
    });
  }

  // New method for fallback to ORM if needed
  listNavFallback(pageSize: number = 100, search: string = '', cursor: string = ''): Observable<AxiosResponse> {
    const params = new URLSearchParams({
      page_size: pageSize.toString(),
      search: search,
      cursor: cursor
    });
    const url = `${this.apiUrl}nav/listing_fallback/?${params.toString()}`;

    return from(axios.get(url, {
      headers: this.getAuthHeaders()
    })).pipe(
      catchError(error => {
        console.error('Error in listNavFallback:', error);
        throw error;
      })
    );
  }

  // Method to check API health/performance
  async checkApiHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.apiUrl}nav/total_count/`, {
        headers: this.getAuthHeaders(),
        timeout: 5000 // 5 second timeout
      });
      return response.status === 200;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
}
