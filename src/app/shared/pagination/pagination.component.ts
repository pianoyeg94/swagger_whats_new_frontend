import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnDestroy {
  @Input() numberOfPages$: Observable<number>;
  @Input() selectedPageNumber$: Observable<number>;
  @Output() pageSelected = new EventEmitter<number>();
  pagesArray$: Observable<number[]>;

  selectedPageNumberSubscription: Subscription;
  selectedPageNumber: number;
  numberOfPages: number;

  ngOnInit() {
    this.pagesArray$ = this.numberOfPages$.pipe(
      tap(numberOfPages => this.numberOfPages = numberOfPages),
      map(numberOfPages => Array(numberOfPages).fill(1).map((x, i) => i + 1))
    );

    this.selectedPageNumberSubscription = this.selectedPageNumber$
      .subscribe(selectedPageNumber => this.selectedPageNumber = selectedPageNumber);
  }

  onPageSelect(pageNumber: number) {
    this.selectedPageNumber = pageNumber;
    this.pageSelected.emit(pageNumber);
  }

  onPageForward() {
    const nextPage = this.selectedPageNumber + 1;
    if (nextPage <= this.numberOfPages) {
      this.selectedPageNumber = nextPage;
      this.pageSelected.emit(nextPage);
    }
  }

  onPageBack() {
    const previousPage = this.selectedPageNumber - 1;
    if (previousPage > 0) {
      this.selectedPageNumber = previousPage;
      this.pageSelected.emit(previousPage);
    }
  }

  ngOnDestroy() {
    this.selectedPageNumberSubscription.unsubscribe();
  }
}
