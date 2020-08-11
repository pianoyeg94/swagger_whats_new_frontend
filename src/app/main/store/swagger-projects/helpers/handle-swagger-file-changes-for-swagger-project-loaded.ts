import { Update } from '@ngrx/entity';

import { SwaggerProject } from '../../../models/swagger-project.model';
import { SwaggerFileChangeFromServer } from '../../../services/response-models/swagger-file-changes-response';


export const handleSwaggerFileChangesForSwaggerProjectLoaded = (
  response: {
    swaggerProject: SwaggerProject
    swaggerFileChanges: SwaggerFileChangeFromServer[]
  }
) => {
  const swaggerFileChangeIds: number[] = [];

  if (response.swaggerFileChanges.length) {
    for (const change of response.swaggerFileChanges) {
      swaggerFileChangeIds.push(change.id);
    }
  }

  const swaggerProject = { ...response.swaggerProject };
  const updatedSwaggerProject: Update<SwaggerProject> = {
    id: swaggerProject.id,
    changes: {
      swaggerFileChangeIds
    }
  };

  return { updatedSwaggerProject };
};

