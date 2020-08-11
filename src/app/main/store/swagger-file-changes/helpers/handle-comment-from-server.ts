import { Update } from '@ngrx/entity';

import { SwaggerFileChangeCommentFromServer } from '../../../services/response-models/swagger-file-changes-response';
import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { SwaggerFileChangeComment } from '../../../models/swagger-file-change-comment.model';


export const handleCommentFromServer = (
  response: {
    newComment: SwaggerFileChangeCommentFromServer,
    swaggerFileChange: SwaggerFileChange
  }
) => {
  const comment: SwaggerFileChangeComment = {
    id: response.newComment.id,
    commentText: response.newComment.comment_text,
    createdAt: new Date(response.newComment.created_at).toLocaleString(),
    updatedAt: new Date(response.newComment.updated_at).toLocaleString(),
    commentAuthor: {
      id: response.newComment.comment_author.id,
      firstName: response.newComment.comment_author.first_name,
      lastName: response.newComment.comment_author.last_name,
      profilePhotoUrl: response.newComment.comment_author.profile.profile_photo
    }
  };

  const swaggerFileChange = { ...response.swaggerFileChange };
  const comments = [...swaggerFileChange.comments];
  comments.push(comment);
  const updatedSwaggerFileChange: Update<SwaggerFileChange> = {
    id: swaggerFileChange.id,
    changes: {
      comments
    }
  };

  return { updatedSwaggerFileChange };
};
