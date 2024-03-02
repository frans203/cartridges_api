export enum ConservationStatusEnum {
  GOOD = "GOOD",
  OK = "OK",
  BAD = "BAD",
}

export interface ICartridge {
  name: string;
  release_year: number;
  console: string;
  conservation_status: ConservationStatusEnum;
  cover_url?: string;
}
