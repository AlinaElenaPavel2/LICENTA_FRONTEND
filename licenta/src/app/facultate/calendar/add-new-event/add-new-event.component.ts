import { Component, Inject, OnInit } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as moment from 'moment'
import { NotifierService } from 'angular-notifier'
import { EvenimentService } from 'src/app/facultate/Services/EvenimentService/eveniment.service'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {
  public notifier: NotifierService
  public title: string
  public descriere: string
  public start_date
  public end_date
  materie: string
  refresh: Subject<any> = new Subject()

  constructor (
    public dialog: MatDialogRef<AddNewEventComponent>,
    private evenimentService: EvenimentService,
    notifier: NotifierService
  ) {
    this.notifier = notifier

    setTimeout(async () => {
      this.materie = localStorage.getItem('Materie')
    }, 1000)
  }
  ngOnInit (): void {}

  async addEvent () {
    const format1 = 'YYYY-MM-DD HH:mm'

    var start = moment(this.start_date)
    var end = moment(this.end_date)
    var days = moment.duration(end.diff(start)).asDays()
    if (days < 0) {
      this.notifier.notify(
        'warning',
        'Ati ales o zi pentru terminarea evenimentului mai inainte de ziua terminarii!'
      )
    } else {
      var ev = {
        start_date: moment(this.start_date).format(format1),
        end_date: moment(this.end_date).format(format1),
        titlu: this.title,
        descriere: this.descriere
      }
      // var start1 = moment(this.start_date).format(format1)
      // var end1 = moment(this.end_date).format(format1)
      // console.log(start1)
      // console.log(end1)

      await this.evenimentService.addEveniment(this.materie, ev)

      this.dialog.close()
      this.notifier.notify('success', 'Evenimentul a fost adaugat cu success!')
      this.refresh.next();
    }
  }

  cancel () {
    this.dialog.close()
  }

  onKeyTitle (titlu: string) {
    console.log("titlu")
    this.title = titlu
  }
  onKeyDesc (descriere: string) {
    console.log("descriere")
    this.descriere = descriere
  }
}
