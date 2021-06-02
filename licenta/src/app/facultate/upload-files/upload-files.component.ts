import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { FileUploadService } from 'src/app/facultate/Services/UploadFilesService/file-upload.service'

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  URL = 'http://localhost:8080/api/licenta/fileStorage/disciplina='
  uploader: FileUploader
  hasBaseDropZoneOver: boolean
  hasAnotherDropZoneOver: boolean
  response: string
  materie: string
  componenta: string

  handleFileInput () {
    this.URL =
      'http://localhost:8080/api/licenta/fileStorage/disciplina=' +
      this.materie +
      '/' +
      this.componenta +
      '/uploadMultipleFiles'

    console.log(this.URL)

    this.uploader = new FileUploader({
      url: this.URL,
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
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
    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false
    }

    this.hasBaseDropZoneOver = false
    this.hasAnotherDropZoneOver = false

    this.response = ''

    this.uploader.response.subscribe(res => (this.response = res))
  }
  constructor (private fileUploadService: FileUploadService) {
    setTimeout(async () => {
      this.materie = localStorage.getItem('Materie')
      this.componenta = localStorage.getItem('Componenta')
    }, 1000)

    console.log(this.materie)
    console.log(this.componenta)

    // this.uploader = new FileUploader({
    //   url: this.URL,
    //   // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
    //   // formatDataFunctionIsAsync: true,
    //   formatDataFunction: async item => {
    //     return new Promise((resolve, reject) => {
    //       resolve({
    //         name: item._file.name,
    //         length: item._file.size,
    //         contentType: item._file.type,
    //         date: new Date()
    //       })
    //     })
    //   }
    // })

    // this.hasBaseDropZoneOver = false
    // this.hasAnotherDropZoneOver = false

    // this.response = ''

    // this.uploader.response.subscribe(res => (this.response = res))
  }

  ngOnInit (): void {
    // this.uploader.onBeforeUploadItem = item => {
    //   item.withCredentials = false
    // }
    this.uploader = new FileUploader({ url: this.URL });

  }

  public fileOverAnother (e: any): void {
    this.hasAnotherDropZoneOver = e
  }
}
