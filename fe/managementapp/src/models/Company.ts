export interface Company {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface CreateCompanyRequest {
  name: string;
  phone: string;
  address: string;
  email: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
}

export interface ListCompanyResponse {
  companies: Company[];
}
