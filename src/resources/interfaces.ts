export interface Address {
  province: string;
  city: string;
  county: string;
  town: string;
  detail: string;
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

export interface Contract extends Model {
  application: string;
  type: "mca" | "lsa" | null;
  entityOtherIdentity?: string;
  verifiedFields: string[];
  contractPath?: string;
  envelopeId?: string;
  sent?: boolean;
}

export interface ConsumerCreditProfile extends Model {
  user?: string;
  addressInformation: any[];
  consumerIdentity: any;
  employmentInformation: any[];
  inquiry: any[];
  summaries: any[];
  riskModel: any[];
  ssn: any[];
  tradeline: any[];
}

export interface Entity extends Model {
  officialName: string;
  dba?: string;
  fein?: string;
  entityType?: string;
  tags: string[];
  coopSince?: Date;
  incorporateState?: string;
}

export interface File extends Model {
  uri: string;
  thumbnailUrl?: string;
  name: string;
  url: string;
  type: string;
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
