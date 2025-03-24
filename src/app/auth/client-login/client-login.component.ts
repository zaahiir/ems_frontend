import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, GridModule, IconModule, FormModule],
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss']
})
export class ClientLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  panNo: string = '';
  dob: string = '';
  errorMessage: string = '';

  onSubmit() {
    this.errorMessage = '';
    if (this.dob) {
      // Format the date to YYYY-MM-DD
      const formattedDob = new Date(this.dob).toISOString().split('T')[0];
      
      this.authService.clientLogin(this.panNo, formattedDob).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed', error);
          if (error.error && error.error.detail) {
            this.errorMessage = error.error.detail;
          } else {
            this.errorMessage = 'Invalid PAN No or Date of Birth. Please try again.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please select a valid date of birth.';
    }
  }
}