import { UserInfoModel } from "./Auth";

export interface Shipment {
  id: number;
  type: string;
  date: Date;
  carrier: string;
  status: string;
  pic: UserInfoModel;
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
