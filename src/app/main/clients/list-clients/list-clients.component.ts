import { Component } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, cilShare, cilCheck} from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective  } from '@coreui/angular';
import { ClientService } from '../../../main/common-service/client/client.service';
import { clientCommonInterface } from '../../../main/interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective ],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss'
})

export class ListClientsComponent {

  icons = { cilPen, cilTrash, cilShare, cilCheck };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';
  tooltipShareText = 'Share on WhatsApp';
  tooltipViewText = 'View Details';

  client: clientCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';
  totalItems = 0;
  totalPages = 1;
  isLoading = false;
  nextCursor: string | null = null;
  prevCursors: string[] = [];
  private searchTerms = new Subject<string>();
  currentSearchTerms: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClient();
    this.setupSearch();
  }

  setupSearch() {
    this.searchTerms.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.resetPagination();
      this.loadClient();
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
  }

  resetPagination() {
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadClient();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClient();
    }
  }
  
  async shareOnWhatsApp(client: clientCommonInterface) {
    const formattedPhone = this.formatPhoneNumber(client.clientPhone);
    const clientUrl = `${window.location.origin}/clients/${client.id}`;
    const message = `Please check the client details here:\n${clientUrl}`;
    // const message = `Hello! Please update your details using this link: ${clientUrl}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;

    try {
      await Swal.fire({
        title: 'Opening WhatsApp Web',
        text: `Preparing to send message to ${client.clientName}...`,
        icon: 'info',
        showConfirmButton: false,
        timer: 2000
      });

      const newWindow = window.open(whatsappUrl, '_blank');

      if (newWindow) {
        await Swal.fire({
          title: 'WhatsApp Web Opened',
          html: `
            <p>WhatsApp Web has been opened in a new tab with the pre-filled message for ${client.clientName}.</p>
            <p>Please follow these steps:</p>
            <ol>
              <li>Switch to the newly opened WhatsApp Web tab</li>
              <li>Wait for WhatsApp Web to load completely</li>
              <li>Click the send button to share the update link</li>
              <li>Close the WhatsApp Web tab when done</li>
            </ol>
          `,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error('Popup blocked');
      }
    } catch (error) {
      console.error('Error opening WhatsApp Web:', error);
      await Swal.fire({
        title: 'Error',
        text: 'There was an error opening WhatsApp Web. Please ensure popups are allowed for this site and try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  private formatPhoneNumber(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.startsWith('91') ? digitsOnly : `91${digitsOnly}`;
  }


  loadClient() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.clientService.listsClient(this.currentPage, this.itemsPerPage, this.searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.handleResponse(response);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  handleResponse(response: any) {
    this.isLoading = false;
    if (response && response.code === 1 && Array.isArray(response.data)) {
      this.client = response.data;
      this.totalItems = response.total_count || 0;
      this.totalPages = response.total_pages || 1;
      this.currentPage = response.current_page || 1;
    } else {
      console.error('Unexpected API response structure:', response);
      Swal.fire('Error', 'Failed to load AUM list: Unexpected API response structure', 'error');
    }
  }

  handleError(error: any) {
    this.isLoading = false;
    console.error('Error loading AUM list:', error);
    Swal.fire('Error', 'An error occurred while loading the AUM list', 'error');
  }

  get paginatedClient() {
    return this.client;
  }

  deleteClient(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete the client and all related data. You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id.toString())
          .then(response => {
            if (response.data.code === 1) {
              Swal.fire('Deleted!', 'Client and all related data have been deleted.', 'success');
              this.loadClient(); // Reload the list
            } else {
              Swal.fire('Error', 'Failed to delete Client', 'error');
            }
          })
          .catch(error => {
            console.error('Error deleting client:', error);
            Swal.fire('Error', 'An error occurred while deleting the client', 'error');
          });
      }
    });
  }
}
