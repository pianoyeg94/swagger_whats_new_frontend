export interface SwaggerProject {
  id?: number;
  projectName: string;
  projectOwnerId?: number;
  useVcs: boolean;
  remoteVcsAccount: {
    vcsService?: string;
    accountName?: string;
  };
  remoteRepoName: string;
  remoteRepoBranch: string;
  swaggerFileUrl: string;
  createdAt?: string;
  updatedAt?: string;
  swaggerFileChangeIds?: number[];
}
