import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { TaskService } from '../../../main/common-service/task/task.service';
import { clientCommonInterface } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-tasks',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.scss'
})
export class CreateTasksComponent implements OnInit {

  customStylesValidated = false;
  taskEntryForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  client: clientCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
  )  { 
    this.taskEntryForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskClient: ['', Validators.required],
      taskDate: ['', Validators.required],
      taskTime: ['', Validators.required],
      taskLatitude: ['', Validators.required],
      taskLongtitude: ['', Validators.required],
      taskDescription: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadClient(); 
  }

  get f() { return this.taskEntryForm.controls; }

  async loadClient(): Promise<void> {
    try {
      const response = await this.taskService.getClient();
      this.client = response.data;
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.f).forEach(key => {
      const control = this.f[key];
      if (control.errors?.['required']) {
        missingFields.push(this.getFieldDisplayName(key));
      }
    });
    return missingFields;
  }

  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      taskTitle: 'Task Title',
      taskClient: 'Client',
      taskDate: 'Date',
      taskTime: 'Time',
      taskLatitude: 'Latitude',
      taskLongtitude: 'Longitude',
      taskDescription: 'Description'
    };
    return displayNames[fieldName] || fieldName;
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.taskEntryForm.invalid) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        await Swal.fire({
          title: 'Required Fields Missing',
          html: `Please fill in the following required fields:<br><br>${missingFields.join('<br>')}`,
          icon: 'error'
        });
      }
      return;
    }
    
    console.log('Submit...');

    const data = {
      taskTitle: this.f['taskTitle'].value,
      taskClient: this.f['taskClient'].value,
      taskDate: this.f['taskDate'].value,
      taskTime: this.f['taskTime'].value,
      taskLatitude: this.f['taskLatitude'].value,
      taskLongtitude: this.f['taskLongtitude'].value,
      taskDescription: this.f['taskDescription'].value,
      hideStatus: 0,
    };

    console.log('taskClient value:', this.f['taskClient'].value);

    const id = "0";
    this.loading = true;

    try {
      const response = await lastValueFrom(this.taskService.processTask(data, "0"));
      if (response.code == 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/tasks']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing task:', error);
      await Swal.fire("Failed!", "An error occurred while processing the task.", "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }
}