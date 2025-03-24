import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { TaskService } from '../../../main/common-service/task/task.service'
import { clientCommonInterface, taskCommonInterface } from '../../../main/interfaces/interfaces'
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';
import { Subject, debounceTime, takeUntil, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-tasks.component.html',
  styleUrl: './update-tasks.component.scss'
})
export class UpdateTasksComponent implements OnInit {

  customStylesValidated = false;
  taskUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  taskId: string = "0";
  clients: clientCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) { 
    this.initForm();
  }

  private initForm(): void {
    this.taskUpdateForm = this.fb.group({
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
    try {
      await this.loadClients();
      const params = await this.route.params.pipe(take(1)).toPromise();
      this.taskId = params ? params['id'] : '0';
      await this.loadTaskData();
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire("Error", "Failed to initialize the component. Please try again.", "error");
    }
  }

  get f() { return this.taskUpdateForm.controls; }

  async loadClients(): Promise<void> {
    try {
      const response = await this.taskService.getClient();
      this.clients = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading clients:', error);
      throw error;
    }
  }

  async loadTaskData(): Promise<void> {
    try {
      const response = await this.taskService.getTaskById(this.taskId.toString()).toPromise();
      if (response && response.code === 1 && response.data) {
        const taskData = response.data;
        const clientId = this.clients.find(client => client.clientName === taskData.taskClient)?.id;
        
        this.taskUpdateForm.patchValue({
          taskTitle: taskData.taskTitle,
          taskClient: clientId,
          taskDate: taskData.taskDate,
          taskTime: taskData.taskTime,
          taskLatitude: taskData.taskLatitude,
          taskLongtitude: taskData.taskLongtitude,
          taskDescription: taskData.taskDescription,
        });
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error loading TASK data:', error);
      throw error;
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

    if (this.taskUpdateForm.invalid) {
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
    this.loading = true;

    try {
      const formData = this.taskUpdateForm.value;
      const data = {
        taskTitle: formData.taskTitle,
        taskClient: formData.taskClient,
        taskDate: formData.taskDate,
        taskTime: formData.taskTime,
        taskLatitude: formData.taskLatitude,
        taskLongtitude: formData.taskLongtitude,
        taskDescription: formData.taskDescription,
        hideStatus: 0,
      };

      const response = await lastValueFrom(this.taskService.processTask(data, this.taskId)); 
      if (response.code == 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/tasks']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Tasks entry:', error);
      await Swal.fire("Failed!", error instanceof Error ? error.message : "An unknown error occurred", "error");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.customStylesValidated = false;
    console.log('Reset...');
    this.taskUpdateForm.reset();
    this.submitted = false;
  }
}