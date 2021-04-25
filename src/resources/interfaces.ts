export interface Address {
  province: string;
  city: string;
  county: string;
  town: string;
  detail: string;
}

export interface CapitalTeam {
  name: string;
  contacts: string;
}

export interface ContactDetail {
  type: "fixed" | "mobile" | "email";
  scene: string;
  value: string;
  entity?: string;
}

export interface Config {
  user?: User;
}

/* Models */
export interface Model {
  _id?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Populated<T> = T | null;
type Ref<T> = string | undefined;

export interface Business extends Entity {}

export interface ConfigItem extends Model, Record<string, any> {
  desc: string;
  value: any;
}

export interface Capital extends Entity {
  features: string[];
  majorLp: string;
  teams: CapitalTeam[];
  recentInvestments: string[];
}

export interface Contact extends Model {
  name: string;
  contactDetails: ContactDetail[];
  remarks?: string;
}

export interface Entity extends Model {
  name: string;
  abbr: string;
  contacts: Contact[];
  addresses: Address[];
  files: File[];
  remarks: string;
}

export interface File extends Model {
  uri: string;
  thumbnailUrl?: string;
  name: string;
  url: string;
}

export interface Investment extends Model {
  status: "pending" | "rejected" | "following" | "funded";
  capital: Capital;
  business: Business;
  ndaStatus: "pending" | "sent" | "signed";
  ndaSignedOn: string;
  materialSentOn: string;
  meetings: Meeting[];
}

export interface Meeting extends Model {
  investment: Ref<Investment>;
  date: string;
  files: File[];
  remarks?: string;
}

export interface Post extends Model {
  title: string;
  slug?: string;
  content: string;
  tags: string[];
  posterUrl: string | null;
  target?: string;
  author: Populated<User>;
}

export interface User extends Model {
  role: string;
  fullName?: string;
  login?: string;
  password?: string;
  mobile?: string;
  email?: string;
  mailingAddress?: Partial<Address>;
  idNo?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  can: (cap: string) => boolean;
}

export interface AuthLoginPostBody {
  login: string;
  password: string;
}

export interface AuthLoginResponseBody {
  token: string;
  user: User;
}

export interface ListQuery {
  order?: string;
  limit?: number;
  skip?: number;
}

export interface ListResponseBase {
  $headers: Record<string, string>;
}

export interface AuthTokenUserIdResponseBody extends AuthLoginResponseBody {}

export interface UserPostBody extends User {}

export interface UserPutBody extends User {}

export interface UserQuery extends ListQuery {}
