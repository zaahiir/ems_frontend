import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';
import { ContainerComponent, RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent } from '@coreui/angular';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ CommonModule, NgStyle, ContainerComponent, RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userDetails: any;
  isEmployee: boolean = false;
  isClient: boolean = false;
  isSuperUser: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.setUserType();
    this.fetchUserProfile();
  }

  setUserType() {
    const userType = localStorage.getItem('user_type');
    this.isEmployee = userType === 'employee';
    this.isClient = userType === 'client';
    this.isSuperUser = userType === 'superuser';
  }

  fetchUserProfile() {
    this.authService.getUserProfile().subscribe(
      (data) => {
        this.userDetails = data;
        if (this.isSuperUser && !this.userDetails.name) {
          this.userDetails.name = this.userDetails.username;  // Use username as name for superusers if name is not set
        }
        console.log('User Details:', this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
