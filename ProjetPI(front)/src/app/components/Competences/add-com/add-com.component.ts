import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Competences } from 'src/app/models/competences';
@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})

export class AddComComponent {
  competences: Competences = new Competences(0, '', '', 0);
  addCompForm: FormGroup 
 constructor(private formBuilder: FormBuilder){ this.addCompForm = this.formBuilder.group({});}
 ngOnInit(): void {

  this.competences={id:1,name:"",description:"",level:0}
 }
 AddComp(){ console.log("notre form"+JSON.stringify(this.addCompForm.value))
 this.competences.id=this.addCompForm.value.id
 this.competences.name=this.addCompForm.value.name
 this.competences.level=this.addCompForm.value.level
 this.competences.description=this.addCompForm.value.description
// this.addCompForm.emit(this.competences)}

 
 }
}
