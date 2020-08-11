import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SwaggerProject } from '../models/swagger-project.model';
import { SwaggerFileChangeCommentFromServer, SwaggerFileChangeFromServer } from './response-models/swagger-file-changes-response';
import { SwaggerFileChange } from '../models/swagger-file-change.model';


@Injectable({ providedIn: 'root' })
export class SwaggerFileChangesHttpService {

  constructor(private http: HttpClient) {}

  loadSwaggerFileChanges(swaggerProject: SwaggerProject) {
    return this.http.get<SwaggerFileChangeFromServer[]>(
      `${environment.apiUrl}/swagger-projects/${swaggerProject.id}/swagger-file-changes/`
    ).pipe(
      map(swaggerFileChanges => {
        return {
          swaggerProject,
          swaggerFileChanges
        };
      })
    );
  }

  createSwaggerFileChangeComment(
    commentText: string,
    swaggerFileChange: SwaggerFileChange
  ): Observable<{
    newComment: SwaggerFileChangeCommentFromServer,
    swaggerFileChange: SwaggerFileChange
  }> {
    return this.http.post<SwaggerFileChangeCommentFromServer>(
      `${environment.apiUrl}/swagger-file-changes/${swaggerFileChange.id}/comments/`,
      { comment_text: commentText }
    ).pipe(
      map(newComment => {
        return { newComment, swaggerFileChange };
      })
    );
  }

  updateSwaggerFileChangeComment(
    commentText: string,
    commentId: number,
    swaggerFileChangeId: number
  ) {
    return this.http.put<SwaggerFileChangeCommentFromServer>(
      `${environment.apiUrl}/swagger-file-changes/${swaggerFileChangeId}/comments/${commentId}/`,
      { comment_text: commentText }
    );
  }

  deleteSwaggerFileChangeComment(commentId: number, swaggerFileChangeId: number) {
    return this.http.delete(
      `${environment.apiUrl}/swagger-file-changes/${swaggerFileChangeId}/comments/${commentId}/`
    );
  }
}


