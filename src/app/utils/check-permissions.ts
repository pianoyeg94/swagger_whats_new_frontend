/* tslint:disable:no-bitwise */

// Permissions from the backend use powers of 2 to leverage the power of bitwise operators
export const checkCompanyMembershipPermissions = (
  memberPermissions: number,
  permissionToCheckFor: number
) => {
  return (memberPermissions & permissionToCheckFor) === permissionToCheckFor;
};
