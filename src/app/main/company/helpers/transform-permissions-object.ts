import { CompanyMembershipPermissions } from '../../models/company-membership-permissions.model';


export const transformPermissionsObject = (permissionsObj: CompanyMembershipPermissions) => {
  const permissions = [];

  for (const permission of Object.entries(permissionsObj)) {
    const labelInitLst = permission[0].split(/(?=[A-Z])/);
    const labelUpperLst = [];
    labelInitLst.forEach(s => {
      s = s.charAt(0).toUpperCase() + s.slice(1);
      labelUpperLst.push(s);
    });
    const label = labelUpperLst.join(' ');
    permissions.push({ value: permission[1], label });
  }

  return permissions;
};
