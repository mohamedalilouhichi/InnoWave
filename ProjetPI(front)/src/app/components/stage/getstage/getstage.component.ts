import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {StageService} from "../stage.service";

@Component({
  selector: 'app-getstage',
  templateUrl: './getstage.component.html',
  styleUrls: ['./getstage.component.css']
})
export class GetstageComponent implements OnInit {
  @ViewChild('detailsModal') detailsModal!: ElementRef;

  spans: number[] = [1, 2, 3, 4, 5];
  stages: any[] = [];
  filteredStages: any[] = []; // Filtered internship offers data
  selectedTitle!: string ;
  selectedStage: any = {};
  selectedDomain!: string ;
  selectedDuration!: string ;
  selectedStartDate: string = '';
  selectedAppliedOffer: string = '';
  uniqueTitles: string[] = [];
  uniqueDomains: string[] = [];
  uniqueDurations: string[] = [];
  uniqueStartDates: string[] = [];
  isOfferApplied: boolean = false;
  appliedOffers: string[] = [];
  showChatbot: boolean = false;
  currentPage: number = 1;
  offersPerPage: number = 5;
  totalPages: number = 1;
  displayedStages: any[] = [];
  constructor(private stageService: StageService) {
    this.filteredStages = this.stages;

  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const headerElement = document.querySelector('app-header');
    if (!headerElement) return; // Exit early if header element is not found

    const headerHeight = (headerElement as HTMLElement).offsetHeight;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Adjust the margin based on the header height
    const chatbot = document.getElementById('chatbot');
    if (chatbot) chatbot.style.marginTop = headerHeight + 'px';

    // Show/hide the chatbot based on scroll position
    this.showChatbot = scrollPosition > (headerHeight-120);

  }
  ngOnInit() {
    this.fetchStages();

  }

  fetchStages() {
    this.stageService.getStage().subscribe((data: any[]) => {
      this.stages = data;
      this.filteredStages = this.stages; // Set filtered stages to all stages initially
      this.populateFilterOptions();
      this.applyFilters(); // Apply filters to show all offers after fetching stages
    });
  }
  populateFilterOptions() {
    // Extract unique values for domain, duration, and startDate from stages
    const cleanTitleSet = new Set(this.stages.map(stage => String(stage.title).trim()).filter(title => title)); // Removes empty strings and trims whitespace
    const cleanDomainSet = new Set(this.stages.map(stage => String(stage.domain).trim()).filter(domain => domain)); // Removes empty strings and trims whitespace
    const cleanDurationSet = new Set(this.stages.map(stage => String(stage.duration).trim()).filter(duration => duration)); // Removes empty strings and trims whitespace
    const cleanStartDateSet = new Set(this.stages.map(stage => String(stage.startDate).trim()).filter(startDate => startDate)); // Removes empty strings and trims whitespace

    this.uniqueTitles = Array.from(cleanTitleSet).sort();
    this.uniqueDomains = Array.from(cleanDomainSet).sort();
    this.uniqueDurations = Array.from(cleanDurationSet).sort();
    this.uniqueStartDates = Array.from(cleanStartDateSet).sort();

  }

  applyFilters() {
    console.log("Selected Title:", this.selectedTitle);
    console.log("Selected Domain:", this.selectedDomain);
    console.log("Selected Duration:", this.selectedDuration);
    console.log("Selected Start Date:", this.selectedStartDate);
    console.log("Selected Applied Offer:", this.selectedAppliedOffer);

    if (this.selectedAppliedOffer === "apply") {
      this.filteredStages = this.stages.filter((stage: any) => !stage.isOfferApplied);
    } else if (this.selectedAppliedOffer === "applied") {
      this.filteredStages = this.stages.filter((stage: any) => stage.isOfferApplied);
    } else {
      this.filteredStages = this.stages.filter((stage: any) => {
        return (
          (!this.selectedTitle || stage.title === this.selectedTitle) &&
          (!this.selectedDomain || stage.domain === this.selectedDomain) &&
          (!this.selectedDuration || stage.duration === this.selectedDuration) &&
          (!this.selectedStartDate || stage.startDate === this.selectedStartDate)
        );
      });
    }

    this.calculateTotalPages();
    this.applyPagination();

    console.log("Filtered Stages:", this.filteredStages);
  }

  resetFilters() {
    this.selectedTitle = '';
    this.selectedDomain = '';
    this.selectedDuration = '';
    this.selectedStartDate = '';
    this.selectedAppliedOffer = '';
    this.applyFilters();
  }
  applyForOffer(stage: any) {
    stage.isOfferApplied = !stage.isOfferApplied;

    if (stage.isOfferApplied) {
      stage.originalIndex = this.filteredStages.indexOf(stage);
    }

    this.applyPagination();
  }
  // applyForOffer(stage: any) {
  //   stage.isOfferApplied = !stage.isOfferApplied;
  //
  //   if (stage.isOfferApplied) {
  //     stage.originalIndex = this.filteredStages.indexOf(stage);
  //     this.filteredStages = this.filteredStages.filter(s => s !== stage);
  //     this.filteredStages.push(stage);
  //   } else {
  //     const originalIndex = stage.originalIndex;
  //     this.filteredStages = this.filteredStages.filter(s => s !== stage);
  //
  //     const stageCopy = Object.assign({}, stage);
  //     delete stageCopy.originalIndex;
  //     this.filteredStages.splice(originalIndex, 0, stageCopy);
  //   }
  //   this.applyPagination();
  //
  // } hedha tkhali applied offer ykoun the last offer  mta3 el page

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredStages.length / this.offersPerPage);
  }
  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.offersPerPage;

    let endIndex = startIndex + this.offersPerPage;

    if (endIndex > this.filteredStages.length) {
      endIndex = this.filteredStages.length;
    }

    this.displayedStages = this.filteredStages.slice(startIndex, endIndex);
  }


  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.applyPagination(); // Update displayed offers when page changes
  }
  openDetailsModal(stage: any) {
    this.selectedStage = { ...stage };
    this.detailsModal.nativeElement.style.display = 'block';
  }

  closeDetailsModal() {
    this.selectedStage = {};
    if (this.detailsModal && this.detailsModal.nativeElement) {
      this.detailsModal.nativeElement.style.display = 'none';
    }
  }




}

