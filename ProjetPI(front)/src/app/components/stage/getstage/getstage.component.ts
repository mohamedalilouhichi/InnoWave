import {Component, HostListener, OnInit} from '@angular/core';
import {StageService} from "../stage.service";

@Component({
  selector: 'app-getstage',
  templateUrl: './getstage.component.html',
  styleUrls: ['./getstage.component.css']
})
export class GetstageComponent implements OnInit {
  stages: any[] = [];
  filteredStages: any[] = []; // Filtered internship offers data
  selectedTitle!: string ;
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
      this.filteredStages = this.stages;
      this.populateFilterOptions();

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
      // Show only not applied offers
      this.filteredStages = this.stages.filter((stage: any) => !stage.isOfferApplied);
    } else if (this.selectedAppliedOffer) {
      // Show only applied offers
      this.filteredStages = this.stages.filter((stage: any) => stage.isOfferApplied);
    } else {
      // Apply other filters
      this.filteredStages = this.stages.filter((stage: any) => {
        return (
          (!this.selectedTitle || stage.title === this.selectedTitle) &&
          (!this.selectedDomain || stage.domain === this.selectedDomain) &&
          (!this.selectedDuration || stage.duration === this.selectedDuration) &&
          (!this.selectedStartDate || stage.startDate === this.selectedStartDate)
        );
      });
    }
    console.log("Filtered Stages:", this.filteredStages);
  }
  resetFilters() {
    this.selectedTitle = '';
    this.selectedDomain = '';
    this.selectedDuration = '';
    this.selectedStartDate = '';
    this.selectedAppliedOffer = '';
    this.applyFilters(); // Apply filters after resetting to show all internship offers
  }
  applyForOffer(stage: any) {
    stage.isOfferApplied = !stage.isOfferApplied;

    if (stage.isOfferApplied) {
      stage.originalIndex = this.filteredStages.indexOf(stage);
      this.filteredStages = this.filteredStages.filter(s => s !== stage);
      this.filteredStages.push(stage);
    } else {
      const originalIndex = stage.originalIndex;
      this.filteredStages = this.filteredStages.filter(s => s !== stage);

      const stageCopy = Object.assign({}, stage);
      delete stageCopy.originalIndex;
      this.filteredStages.splice(originalIndex, 0, stageCopy);
    }

  }
}

