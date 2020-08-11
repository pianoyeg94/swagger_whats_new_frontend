export interface SwaggerFileChangeComment {
  id: number;
  commentText: string;
  commentAuthor: {
    id: number;
    firstName: string;
    lastName: string;
    profilePhotoUrl: string;
  }
  createdAt: string;
  updatedAt: string;
}
