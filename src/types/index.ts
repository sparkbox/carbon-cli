import { ReposListForOrgResponseItem, ReposCreateForAuthenticatedUserResponse } from '@octokit/rest';

export type Repo = ReposListForOrgResponseItem;
export type NewRepo = ReposCreateForAuthenticatedUserResponse;

export interface ProjectOptions {
  sourceRepo: string;
  branch: string;
  projectName: string;
  projectNameHuman: string;
  projectDir: string;
  shouldCreateRemote: boolean;
}
