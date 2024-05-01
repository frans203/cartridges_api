enum enumUserType {
  "ADMIN",
  "CLIENT",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  type?: enumUserType;
  is_flamengo: boolean;
  watch_one_piece: boolean;
  is_from_sousa: boolean;
}
