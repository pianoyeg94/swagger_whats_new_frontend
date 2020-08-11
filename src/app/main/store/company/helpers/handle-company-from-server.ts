import { CompanyResponse } from '../../../services/response-models/company-response';


export const handleCompanyDetailsFromServer = (response: CompanyResponse) => ({
  company: {
    companyId: response.id,
    companyName: response.company_name,
    createdAt: response.created_at,
    updatedAt: response.updated_at
  }
});


