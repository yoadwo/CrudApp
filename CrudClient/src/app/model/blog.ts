import { Post } from "./post";

export interface Blog {
    id: number | undefined;
    title: string;
    url: string;
    posts?: Post[];
  }