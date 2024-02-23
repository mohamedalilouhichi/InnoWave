import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DocumentService } from '../service/document.service';
import { document } from '../../models/document';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent implements OnInit{

  document: any[] = [];
  newdocument: any = {}; // Define newCandidature object for adding candidatures

  //candidacyform!:FormGroup
 
  
  @Output() addform=new EventEmitter<document>
  
  constructor(
    private DocumentService: DocumentService, 
    private formBuilder: FormBuilder
    ){ }


  public adddocument(): void {
   // this.candidatureService.addCandidacy(this.newCandidature).subscribe();

    const Documentform: FormGroup = this.formBuilder.group({
      category:  ['',Validators.required],
      description:  ['',Validators.required],
      filePath:  ['',Validators.required],
      uploadDate:  ['',Validators.required],
    });

    this.DocumentService.addDocuments(Documentform.value).subscribe(
      (response) => {
        console.log('succeesssssss', response);
        Documentform.reset();
      },
      (error) => {
        console.log('erreuuuuuuurrr : ', error);
      }
      );
  


  }



  //public addCandidature(): void {
  //  this.candidatureService.addCandidature(this.newCandidature).subscribe(
  //    (response: Candidature) => {
  //    this.candidatures.push(response);
      

  //    console.log("New candidate added");
  //    },

  //  (error: HttpErrorResponse) => {
  //    alert(error.message);
//  }
  //    );
    
    
  //}


  ngOnInit() : void {
   
    


    this.fetchDocument();
   this.adddocument();
  }

  

  fetchDocument() {
    this.DocumentService.getdocument().subscribe((data: any[]) => {
      console.log(data);
      this.document = data;
    });
  }
  


}
