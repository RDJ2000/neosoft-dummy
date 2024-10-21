import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DummyapiService } from './service/dummyapi.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dummy_prog';
  dummyData=[]
  paginatedData:any=[]
  dataSubsription!:Subscription
  pageNumber:number=0
  searchValue!:string
  constructor(private apiService:DummyapiService){}
  ngOnInit(){
   this.dataSubsription= this.apiService.getPostData().subscribe((result)=>{
    //  console.log(result)
      this.dummyData=result
      console.log(this.dummyData.slice(0,10));
      console.log(this.dummyData);
      this.paginatedData=this.dummyData.slice(0,10)

      
    }),(err:any)=>{
      console.log(err);
      
    }
  }



  nextPage(){
    this.pageNumber++
    this.paginateData= this.dummyData.slice(this.pageNumber,this.pageNumber*10)

  }
  previousPage(){
    this.pageNumber--
     this.paginateData= this.dummyData.slice(this.pageNumber,this.pageNumber*10)
  }

  sortData(){
    this.paginatedData=this.paginatedData.sort()
  }

  searchData(searchValue:string){
    if (this.paginatedData.includes(searchValue)) {
      const foundIndex = this.paginatedData.indexOf(searchValue);
      console.log('Search Value found', this.paginatedData[foundIndex]);
      alert('Value Found: ' + this.paginatedData[foundIndex]);
    } else {
      console.log('Searched value is not found');
      alert('Searched value is not found');
    }alert("Searched value is not found")
      }
  }


  ngOnDestroy(){
    this.dataSubsription.unsubscribe()
  }
}
