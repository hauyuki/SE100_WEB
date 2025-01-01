import { Tag } from "./Tag";

export interface Area {
  id: number;
  name: string;
  tags: Tag[];
}

export interface CreateAreaRequest {
  name: string;
}

export interface UpdateAreaRequest {
  name?: string;
}
