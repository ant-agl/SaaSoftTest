export interface Account {
  id: number;
  tags: string[];
  type: keyof typeof AccountTypeEnum;
  login: string;
  password: string | null;
}

export enum AccountTypeEnum {
  LOCAL = "Локальная",
  LDAP = "LDAP",
}
