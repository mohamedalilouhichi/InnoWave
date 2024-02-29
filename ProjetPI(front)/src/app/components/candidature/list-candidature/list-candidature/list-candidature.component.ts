import { Component, OnInit } from '@angular/core';
import { Candidature } from 'src/app/components/models/candidature';
import { CandidatureService } from '../../service/candidature.service';
import { HttpErrorResponse } from '@angular/common/http';
import  emailjs  from '@emailjs/browser' ;



@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  styleUrls: ['./list-candidature.component.css']
})
export class ListCandidatureComponent implements OnInit {
  candidatures: any[] = [];
  newCandidature: any = {}; // Define newCandidature object for adding candidatures

  candidacy:any={};

  currentPage = 0; // Définir la propriété currentPage ici
  pageSize = 3; 


  ListCandidatures? : Candidature[] ;
  
  // Assurez-vous de configurer correctement votre clé publique EmailJS
  private emailJsPublicKey = 'POXAJguqAyidi8olQ';
  
  constructor(private candidatureService: CandidatureService) { }

  nextPage(): void {
    this.currentPage++;
    this.candidatures = this.candidatures.slice(this.currentPage * this.pageSize, (this.currentPage + 1) * this.pageSize);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = (this.currentPage + 1) * this.pageSize;
      this.candidatures = this.candidatures.slice(startIndex, endIndex);
    }
  }
  
  


  public getallCandidatures(): void{
    this.candidatureService.getCandidature().subscribe(
      (response:Candidature[])=>{
        console.log("Get all candidatures")
        console.log(response)
        this.ListCandidatures=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
   
    console.log(this.ListCandidatures)

  }

  fetchCandidature() {
    this.candidatureService.getCandidature().subscribe((data: any[]) => {
      console.log(data);
      this.candidatures = data;
    });
    
  }
  
  ngOnInit(): void { 
    this.fetchCandidature();

    this.getallCandidatures();

  }


  AcceptButton(e:any)
  {e.statut="Approved"
    this.candidatureService.AcceptCandidature(e).subscribe((data)=>{

console.log(data);

//envoyer  un mail au candidate que sa candidature a été accepté
this.send(e);

})
  }

  RefuseButton(e:any)
  {e.statut="Declined"
    this.candidatureService.RefuseCandidature(e).subscribe((data)=>{
e=data;

this.send(e );
    })
  }

send(e:any){
  const statut = e.statut;
  emailjs.init(this.emailJsPublicKey);
  emailjs.send("service_uikptns","template_6dalidm",{
    from_name: statut,
    status:statut
   // status: this.newCandidature.status,
    }).then((response) => {
      console.log("Email envoyé avec succé !");
    }, (error) => {
      console.log("Erreur lors du send email : ",error);
    });
  }


  removeCandidature(idCandidature: number){

    if(confirm('Are you sure you want to delete this candidacy? ')){
      this.candidatureService.deleteCandidature(idCandidature).subscribe(()=>{
        this.fetchingCandidacy();
        console.log('Candudature deleted successfully.');
        
    },
    (error) => {
      console.error('Error deleting candidacy:', error);
    }
      );
  } else {
    console.log('Deletion canceled');
  }
  
}



fetchingCandidacy():void {
  this.candidatureService.getCandidature().subscribe(
    (data: Candidature[])=> {
      console.log('fetched candidacy :', data);
      this.candidatures = data;
    },
    (erreur)=> {
      console.log('Erreur de chargement des données ', erreur);
    }
  )
}
}
