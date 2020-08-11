export interface SwaggerFileChangeDetail {
  what: string[];
  where: string | {
    contract: string;
    endpoints: string[];
    nested_in_other_contracts: string[];
  };
}
