export interface RemoteVCSAccount {
  id?: number;
  service: string;
  accountType: string;
  accountName: string;
  registeredAt?: string;
  tempToken?: string;
}
