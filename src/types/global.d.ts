import {
  ReposListForOrgResponseItem,
  ReposCreateForAuthenticatedUserResponse,
  OrgsListForAuthenticatedUserResponseItem,
  UsersGetAuthenticatedResponse,
} from '@octokit/rest';

declare global {
  type User = UsersGetAuthenticatedResponse;
  type Org = OrgsListForAuthenticatedUserResponseItem;
  type Repo = ReposListForOrgResponseItem;
  type NewRepo = ReposCreateForAuthenticatedUserResponse;

  interface ProjectOptions {
    sourceRepo: Repo;
    branch: string;
    projectName: string;
    projectNameHuman: string;
    projectDir: string;
    shouldCreateRemote: boolean;
    shouldInstall?: boolean;
    owner?: string;
  }
}
