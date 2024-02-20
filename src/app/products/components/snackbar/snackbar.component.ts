import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {

  @Input() message : string = '';
  @ViewChild('snackbar') snackbar: ElementRef = new ElementRef('snackbar');


  showSnackbar(message: string) {
    this.message = message;

    this.snackbar.nativeElement.showModal();
    setTimeout(() => { this.snackbar.nativeElement.close(); }, 3000); 
  }
}
