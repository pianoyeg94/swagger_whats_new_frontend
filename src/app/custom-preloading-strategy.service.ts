import { Injectable } from '@angular/core';
import { ActivatedRoute, PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategyService implements PreloadingStrategy {

  constructor(private activatedRoute: ActivatedRoute) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      return load();
    } else {
      return of(null);
    }
  }
}
