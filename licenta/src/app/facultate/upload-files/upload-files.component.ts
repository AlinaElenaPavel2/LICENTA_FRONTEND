import { Component, OnInit } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'
import { FileUploadService } from 'src/app/facultate/Services/UploadFilesService/file-upload.service'
import { NotifierService } from 'angular-notifier'
import { FileStorageService } from '../Services/FileStorageService/file-storage.service'
import { Router, ActivatedRoute } from '@angular/router'

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
  token:string
  componenta: string
  private notifier: NotifierService

  descrieri: string[] = []
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
      authToken:this.token,
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
    let i = 0
    this.uploader.response.subscribe(res => {
      this.response = res
      if (this.response.split(',')[1].includes('fileDownloadUri') == true) {
        var filename = this.response
          .split(',')[0]
          .substring(14, this.response.split(',')[0].length - 1)
        var path =
          'aplicatie/src/main/resources/Files/' +
          this.materie +
          '/' +
          this.componenta +
          '/' +
          filename
        // console.log(path)
        // console.log(this.descrieri[i])
        console.log('---------')
        var book = {
          path: path,
          descriere: this.descrieri[i]
        }
        console.log(JSON.stringify(book))

        this.fileStorage.postareBook(this.materie, this.componenta, book)

        i += 1
        this.showNotification('success', 'Fisierul s-a incarcat cu succes!')
        // setTimeout(async () => {
        //   window.location.reload()
        // }, 200)
        this.reloadCurrentRoute()
      } else {
        this.showNotification('error', 'Fisierele nu s-au putut incarca!')
      }
    })
  }

  onKey (descriere, i) {
    this.descrieri.push(descriere)
  }

  constructor (
    private fileUploadService: FileUploadService,
    private fileStorage: FileStorageService,
    notifier: NotifierService,
    private router: Router,
  ) {
    this.notifier = notifier
    setTimeout(async () => {
      this.materie = localStorage.getItem('Materie')
      this.componenta = localStorage.getItem('Componenta')
      this.token=sessionStorage.getItem("token")
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
    this.uploader = new FileUploader({ url: this.URL })
  }

  public fileOverAnother (e: any): void {
    this.hasAnotherDropZoneOver = e
  }

  public showNotification (type: string, message: string): void {
    this.notifier.notify(type, message)
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}
