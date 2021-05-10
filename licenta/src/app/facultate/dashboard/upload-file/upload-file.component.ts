import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  component: string
  constructor (
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadFileDocumentModel
  ) {
    this.component = data.component
  }

  ngOnInit (): void {}
}
export class UploadFileDocumentModel {
  constructor (public component: string) {}
}
