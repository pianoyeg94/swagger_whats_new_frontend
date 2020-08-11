import { SwaggerFileChangeDetail } from '../../models/swagger-file-change-detail.model';

export interface SwaggerFileChangeCommentFromServer {
  id: number;
  comment_text: string;
  created_at: string;
  updated_at: string;
  comment_author: {
    id: number;
    first_name: string;
    last_name: string;
    profile: {
      profile_photo: string;
    };
  };
}

export interface SwaggerFileChangeFromServer {
  id: number;
  changes_added_at: string;
  comments: SwaggerFileChangeCommentFromServer[];
  related_commit_details: [{
    pushed_by: string;
    timestamp: string;
    commit_urls: string[]
  }];
  swagger_file_changes: {
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
