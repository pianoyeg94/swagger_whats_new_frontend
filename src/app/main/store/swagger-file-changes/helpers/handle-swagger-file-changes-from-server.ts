import { SwaggerProject } from '../../../models/swagger-project.model';
import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { RelatedCommitDetail } from '../../../models/related-commit-detail.model';
import { SwaggerFileChangeComment } from '../../../models/swagger-file-change-comment.model';
import { SwaggerFileChangeFromServer } from '../../../services/response-models/swagger-file-changes-response';

export const handleSwaggerFileChangesFromServer = (
  response: {
    swaggerProject: SwaggerProject
    swaggerFileChanges: SwaggerFileChangeFromServer[]
  }
) => {
  const swaggerFileChanges: SwaggerFileChange[] = [];

  if (response.swaggerFileChanges.length) {

    for (const change of response.swaggerFileChanges) {

      const comments: SwaggerFileChangeComment[] = [];
      const relatedCommitDetails: RelatedCommitDetail[] = [];

      if (change.comments.length) {
        for (const comment of change.comments) {
          comments.push({
            id: comment.id,
            commentText: comment.comment_text,
            commentAuthor: {
              id: comment.comment_author.id,
              firstName: comment.comment_author.first_name,
              lastName: comment.comment_author.last_name,
              profilePhotoUrl: comment.comment_author.profile.profile_photo
            },
            createdAt: new Date(comment.created_at).toLocaleString(),
            updatedAt: new Date(comment.updated_at).toLocaleString()
          });
        }
      }

      if (change.related_commit_details.length) {
        for (const detail of change.related_commit_details) {
          relatedCommitDetails.push({
            pushedBy: detail.pushed_by,
            timestamp: new Date(detail.timestamp).toLocaleString(),
            commitUrls: detail.commit_urls
          });
        }
      }

      swaggerFileChanges.push({
        id: change.id,
        changesAddedAt: new Date(change.changes_added_at).toLocaleString(),
        comments,
        relatedCommitDetails,
        swaggerFileChanges: change.swagger_file_changes
      });
    }
  }

  return { swaggerFileChanges };
};

