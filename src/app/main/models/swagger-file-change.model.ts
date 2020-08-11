import { SwaggerFileChangeComment } from './swagger-file-change-comment.model';
import { RelatedCommitDetail } from './related-commit-detail.model';
import { SwaggerFileChangeDetail } from './swagger-file-change-detail.model';

export interface SwaggerFileChange {
  id: number;
  comments: SwaggerFileChangeComment[];
  relatedCommitDetails?: RelatedCommitDetail[];
  changesAddedAt: string;
  swaggerFileChanges: {
    removals: {
      endpoints: SwaggerFileChangeDetail[];
      methods: SwaggerFileChangeDetail[];
      contracts: SwaggerFileChangeDetail[];
      contract_properties: SwaggerFileChangeDetail[];
    };
    additions: {
      endpoints: SwaggerFileChangeDetail[];
      methods: SwaggerFileChangeDetail[];
      contracts: SwaggerFileChangeDetail[];
      contract_properties: SwaggerFileChangeDetail[];
    };
  };
}
