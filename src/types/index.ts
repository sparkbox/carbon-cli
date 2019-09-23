export interface Repo {
  url: string;
  ssh_url: string; // remote ssh url
  clone_url: string; // remote https url
}

export interface ProjectOptions {
  projectType: string;
  projectName: string;
  projectDir: string;
}
