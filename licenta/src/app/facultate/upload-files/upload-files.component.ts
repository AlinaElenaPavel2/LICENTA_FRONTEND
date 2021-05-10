import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { FileUploadService } from 'src/app/facultate/Services/UploadFilesService/file-upload.service'

const URL = 'http://localhost:8080/api/licenta/fileStorage/uploadMultipleFiles'

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  uploader: FileUploader
  hasBaseDropZoneOver: boolean
  hasAnotherDropZoneOver: boolean
  response: string

  constructor (private fileUploadService: FileUploadService) {
    this.uploader = new FileUploader({
      url: URL,
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

    this.hasBaseDropZoneOver = false
    this.hasAnotherDropZoneOver = false

    this.response = ''

    this.uploader.response.subscribe(res => (this.response = res))
  }

  ngOnInit (): void {
    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false
    }
  }

  public fileOverAnother (e: any): void {
    this.hasAnotherDropZoneOver = e
  }
}
