import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) {}

  handleError(error: any): void {
    console.error('Global Error Handler:', error);
    
    // If you want to handle specific types of errors, you can do it here
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }

    // You can also log the error to an external server here
  }
}
