import { UserInfoModel } from "./Auth";

export interface Shipment {
  id: number;
  type: string;
  date: Date;
  carrier: string;
  status: string;
  pic: UserInfoModel;
  completedDate: Date;
  fromPosition: string;
  toPosition: string;
}

export interface CreateShipmentRequest {
  type: string;
  date: string;
  carrier: string;
  status: string;
  employeeId: number;
}

export interface UpdateShipmentRequest {
  id: number;
  type?: string;
  date?: string;
  carrier?: string;
  status?: string;
  fromLocation?: string;
  toLocation?: string;
  employeeId?: number;
  completedDate?: string;
}

export interface ListShipmentResponse {
  shipmentList: Shipment[];
}
