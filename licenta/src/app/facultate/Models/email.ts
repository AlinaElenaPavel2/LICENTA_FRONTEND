export class Email {
  subject: string
  text: string

  setComponents (subject: string, text: string) {
    this.subject = subject
    this.text = text
  }

  setSubject (subject: string) {
    this.subject = subject
  }

  setText (text: string) {
    this.text = text
  }
}
