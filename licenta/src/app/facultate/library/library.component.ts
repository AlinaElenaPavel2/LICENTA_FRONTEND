import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/'

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  uploader: FileUploader
  hasBaseDropZoneOver: boolean
  hasAnotherDropZoneOver: boolean
  response: string
  constructor () {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async item => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          })
        })
      }
    })

    this.hasBaseDropZoneOver = false
    this.hasAnotherDropZoneOver = false

    this.response = ''

    this.uploader.response.subscribe(res => (this.response = res))
  }

  ngOnInit (): void {}

  public fileOverAnother (e: any): void {
    this.hasAnotherDropZoneOver = e
  }
}
