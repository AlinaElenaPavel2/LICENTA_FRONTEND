import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File
  path = 'assets/images/placeholder.png';

  constructor() { }
  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile.name)
    this.path='assets/images/'+this.selectedFile.name
    // upload picture to server
    // this.http.post('my-backend.com/file-upload', uploadData, {
    //   reportProgress: true,
    //   observe: 'events'
    // })
    //   .subscribe(event => {
    //     console.log(event); // handle event here
    //   });
  }

  changeTab(event) {
    console.log("**************")
  }
  
}
