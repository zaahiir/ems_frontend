import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { CourierService } from '../../../common-service/courier/courier.service'
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-courier',
  standalone: true,
  imports: [ NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './view-courier.component.html',
  styleUrl: './view-courier.component.scss'
})
export class ViewCourierComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  courierUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFiles: File[] = [];
  existingFiles: any[] = [];
  fileErrors: string[] = [];
  courierId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courierService: CourierService,
  ) { 
    this.initForm();
  }

  async ngOnInit(): Promise<void> {
    this.courierId = this.route.snapshot.params['id'];
    await this.loadCourierData();
    await this.loadCourierFiles();
  }

  initForm(): void {
    this.courierUpdateForm = this.fb.group({
      courierClientName: [{ value: '', disabled: true }],
      courierClientAddress: [{ value: '', disabled: true }],
      courierMobileNumber: [{ value: '', disabled: true }],
      courierEmail: [{ value: '', disabled: true }],
      courierFile: [{ value: null, disabled: true }]
    });
  }

  get f() { return this.courierUpdateForm.controls; }

  async loadCourierData(): Promise<void> {
    try {
      const response = await this.courierService.getcourierById(this.courierId).toPromise();
  
      if (response && response.code === 1 && response.data) {
        const courierData = response.data;        

        this.courierUpdateForm.patchValue({
          courierClientName: courierData.courierClientName,
          courierClientAddress: courierData.courierClientAddress,
          courierMobileNumber: courierData.courierMobileNumber,
          courierEmail: courierData.courierEmail,
        });
      } else {
        await Swal.fire("Error", "Failed to load courier data", "error");
      }
    } catch (error) {
      console.error('Error loading courier data:', error);
      await Swal.fire("Error", "Failed to load courier data", "error");
    }
  }

  async loadCourierFiles(): Promise<void> {
    try {
      const response = await this.courierService.listsCourierFiles(this.courierId);
      if (response.data.code === 1) {
        this.existingFiles = response.data.data;
      } else {
        console.error('Failed to load courier files');
      }
    } catch (error) {
      console.error('Error loading courier files:', error);
    }
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  previewFile(filePath: string): void {
    const fullUrl = this.courierService.getFullUrl(filePath);
    window.open(fullUrl, '_blank');
  }
}