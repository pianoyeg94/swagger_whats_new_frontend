import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @ViewChild('accordionContent', { static: false }) accordionContent: ElementRef;
  contentIsOpen = false;
  contentHeightInPx = 0;

  onClick() {
    this.contentIsOpen = !this.contentIsOpen;
    this.contentHeightInPx = this.contentIsOpen ? this.accordionContent.nativeElement.scrollHeight : 0;
  }
}
