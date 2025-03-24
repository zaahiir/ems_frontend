import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, cilShare } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective } from '@coreui/angular';
import { MarketingService } from '../../../common-service/marketing/marketing.service';
import { marketingCommonInterface } from '../../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-marketing',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective],
  templateUrl: './list-marketing.component.html',
  styleUrls: ['./list-marketing.component.scss']
})
export class ListMarketingComponent implements OnInit {
  icons = { cilPen, cilTrash, cilShare };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';
  tooltipShareText = 'Share on SocialMedia';

  marketingList: marketingCommonInterface[] = [];
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

  constructor(
    private marketingService: MarketingService,
    private http: HttpClient
  ) {}

  getFileName(filePath: string | undefined): string {
    if (!filePath) return '';
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }

  async ngOnInit() {
    await this.loadMarketingList();
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
      this.loadMarketingList();
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
      this.loadMarketingList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMarketingList();
    }
  }

  previewFile(id: number, filePath: string | undefined): void {
    if (!filePath) {
      Swal.fire('Error', 'No file path provided', 'error');
      return;
    }
  
    const fullFilePath = this.marketingService.getFullUrl(filePath);
    window.open(fullFilePath, '_blank');
  }

  getFullUrl(filePath: string | undefined): string {
    if (!filePath) return '';
    return this.marketingService.getFullUrl(filePath);
  }
  
  shareMedia(id: any): void {
    this.marketingService.getShareLinks(id).then(response => {
      if (response.data.code === 1) {
        const shareData = response.data.data;
        const fileUrl = shareData.file_url;
        const fileName = fileUrl.split('/').pop();
        const shareText = encodeURIComponent(shareData.title);
  
        const whatsappUrl = `https://web.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(fileUrl)}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fileUrl)}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(fileUrl)}&text=${shareText}`;
  
        Swal.fire({
          title: 'Share Marketing Material',
          html: `
            <p>Choose an action:</p>
            <button id="download-btn" class="swal2-confirm swal2-styled">Download File</button>
            <button id="whatsapp-btn" class="swal2-confirm swal2-styled">Share to WhatsApp</button>
            <button id="telegram-btn" class="swal2-confirm swal2-styled">Share to Telegram</button>
            <button id="facebook-btn" class="swal2-confirm swal2-styled">Share to Facebook</button>
            <button id="youtube-btn" class="swal2-confirm swal2-styled">Upload to YouTube</button>
            <button id="instagram-btn" class="swal2-confirm swal2-styled">Share on Instagram</button>
          `,
          showConfirmButton: false,
          showCloseButton: true,
          focusConfirm: false,
          didOpen: () => {
            document.getElementById('download-btn')?.addEventListener('click', () => this.downloadFile(fileUrl, fileName));
            document.getElementById('whatsapp-btn')?.addEventListener('click', () => window.open(whatsappUrl, '_blank'));
            document.getElementById('telegram-btn')?.addEventListener('click', () => window.open(telegramUrl, '_blank'));
            document.getElementById('facebook-btn')?.addEventListener('click', () => window.open(facebookUrl, '_blank'));
            document.getElementById('youtube-btn')?.addEventListener('click', () => this.openYouTubeUpload());
            document.getElementById('instagram-btn')?.addEventListener('click', () => this.openInstagramApp());
          }
        });
      } else {
        Swal.fire('Error', 'Failed to generate share links', 'error');
      }
    }).catch(error => {
      console.error('Error fetching share links:', error);
      Swal.fire('Error', 'An error occurred while generating the share links', 'error');
    });
  }
  
  downloadFile(fileUrl: string, fileName: string): void {
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Download failed:', error);
        Swal.fire('Error', 'Failed to download the file. Please try again.', 'error');
      }
    );
  }
  
  openYouTubeUpload(): void {
    window.open('https://studio.youtube.com/channel/upload', '_blank');
  }
  
  openInstagramApp(): void {
    // This will attempt to open the Instagram app if on mobile, or go to the website on desktop
    window.location.href = 'instagram://';
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/';
    }, 1000);
  }

  async loadMarketingList() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.marketingService.listsMarketing(this.currentPage, this.itemsPerPage, this.searchTerm)
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
      this.marketingList = response.data;
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

  get paginatedMarketingList() {
    return this.marketingList;
  }

  async deleteForm(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await this.marketingService.deleteMarketing(id.toString());
        await Swal.fire('Deleted!', 'Form has been deleted.', 'success');
        await this.loadMarketingList(); // Reload the list
      } catch (error) {
        console.error('Error deleting form:', error);
        await Swal.fire('Error', 'An error occurred while deleting the form', 'error');
      }
    }
  }
}