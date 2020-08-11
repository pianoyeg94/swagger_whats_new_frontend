import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-swagger-file-changes-filter',
  templateUrl: './swagger-file-changes-filter.component.html',
  styleUrls: ['./swagger-file-changes-filter.component.scss']
})
export class SwaggerFileChangesFilterComponent implements OnInit {
  @Output() swaggerFileChangeTypeSelected = new EventEmitter<string>();
  @Output() whereSwaggerFileChangeHappenedSelected = new EventEmitter<string>();

  selectedSwaggerFileChangeType: { value: string, label: string } = null;

  swaggerFileChangeTypesList = [
    { value: 'additions', label: 'Additions' },
    { value: 'removals', label: 'Removals' }
  ];

  ngOnInit() {
    this.selectedSwaggerFileChangeType = this.swaggerFileChangeTypesList[0];
    this.swaggerFileChangeTypeSelected.emit(this.selectedSwaggerFileChangeType.value);
    this.whereSwaggerFileChangeHappenedSelected.emit('endpoints');
  }

  onSelect() {
    this.swaggerFileChangeTypeSelected.emit(this.selectedSwaggerFileChangeType.value);
  }

  onChecked(whereSwaggerFileChangeHappened: string) {
    this.whereSwaggerFileChangeHappenedSelected.emit(whereSwaggerFileChangeHappened);
  }
}
