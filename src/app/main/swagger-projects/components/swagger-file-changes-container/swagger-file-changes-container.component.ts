import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { SwaggerFileChangeDetail } from '../../../models/swagger-file-change-detail.model';


@Component({
  selector: 'app-swagger-file-changes-container',
  templateUrl: './swagger-file-changes-container.component.html',
  styleUrls: ['./swagger-file-changes-container.component.scss']
})
export class SwaggerFileChangesContainerComponent implements OnInit, OnChanges {
  @Input() swaggerFileChangeType: string;
  @Input() whereSwaggerFileChangeHappened: string;

  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;

  swaggerFileRemovals$: Observable<{
    endpoints: SwaggerFileChangeDetail[],
    methods: SwaggerFileChangeDetail[],
    contracts: SwaggerFileChangeDetail[],
    contract_properties: SwaggerFileChangeDetail[]
  }>;

  swaggerFileAdditions$: Observable<{
    endpoints: SwaggerFileChangeDetail[],
    methods: SwaggerFileChangeDetail[],
    contracts: SwaggerFileChangeDetail[],
    contract_properties: SwaggerFileChangeDetail[]
  }>;

  swaggerFileChangesContainerTitle: string;

  swaggerFileChangesContainerTitleMapping = {
    additions: {
      endpoints: 'Added Endpoints',
      methods: 'Added Methods',
      contracts: 'Added Contracts',
      contractProperties: 'Added Contract Properties'
    },
    removals: {
      endpoints: 'Removed Endpoints',
      methods: 'Removed Methods',
      contracts: 'Removed Contracts',
      contractProperties: 'Removed Contract Properties'
    }
  };

  ngOnInit() {
    this.swaggerFileChangesContainerTitle =
      this.swaggerFileChangesContainerTitleMapping[
        this.swaggerFileChangeType][this.whereSwaggerFileChangeHappened];

    this.swaggerFileAdditions$ = this.swaggerFileChange$.pipe(
      map(swaggerFileChange => swaggerFileChange.swaggerFileChanges.additions),
    );

    this.swaggerFileRemovals$ = this.swaggerFileChange$.pipe(
      map(swaggerFileChange => swaggerFileChange.swaggerFileChanges.removals),
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.swaggerFileChangesContainerTitle =
      this.swaggerFileChangesContainerTitleMapping[
        this.swaggerFileChangeType][this.whereSwaggerFileChangeHappened];
  }
}


