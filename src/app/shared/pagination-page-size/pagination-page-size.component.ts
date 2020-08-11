import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination-page-size',
  templateUrl: './pagination-page-size.component.html',
  styleUrls: ['./pagination-page-size.component.scss']
})
export class PaginationPageSizeComponent implements OnInit, OnDestroy {
  @Input() pageSizesArray: number[];
  @Input() selectedPageSize$: Observable<number>;
  @Output() pageSizeSelected = new EventEmitter<number>();

  selectedPageSizeSubscription: Subscription;
  selectedPageSize: number;

  ngOnInit() {
    this.selectedPageSizeSubscription = this.selectedPageSize$
      .subscribe(selectedPageSize => this.selectedPageSize = selectedPageSize);
  }

  onPageSizeSelected(pageSize: number) {
    this.selectedPageSize = pageSize;
    this.pageSizeSelected.emit(pageSize);
  }

  ngOnDestroy() {
    this.selectedPageSizeSubscription.unsubscribe();
  }
}
