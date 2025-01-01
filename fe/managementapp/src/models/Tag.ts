export interface Tag {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  area: { id: number; name: string };
}

export interface CreateTagRequest {
  name: string;
  description: string;
  areaId: number;
}

export interface UpdateTagRequest {
  name?: string;
  description?: string;
}

export interface ListTagResponse {
  tags: Tag[];
}
