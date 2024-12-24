export interface Shipment {
  id: number;
  type: string;
  date: string;
  carrier: string;
  status: string;
  employeeId: number;
}

export interface CreateShipmentRequest {
  type: string;
  date: string;
  carrier: string;
  status: string;
  employeeId: number;
}

export interface UpdateShipmentRequest {
  type?: string;
  date?: string;
  carrier?: string;
  status?: string;
  employeeId?: number;
}

export interface ListShipmentResponse {
  shipments: Shipment[];
}
