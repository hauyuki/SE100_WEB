export interface Tag {
  id: number;
  name: string;
  description: string;
  createdDate: string;
}

export interface CreateTagRequest {
  name: string;
  description: string;
}

export interface UpdateTagRequest {
  name?: string;
  description?: string;
}

export interface ListTagResponse {
  tags: Tag[];
}
