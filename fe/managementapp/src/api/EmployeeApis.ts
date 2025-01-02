import { Employee, EmployeeRequest } from "../models/Employee";
import { apiGet, apiPost, apiPut } from "../utils/ApiRequest";

export const EmployeeApis = {
  // Get all Employees
  getAllEmployees(): Promise<Employee[]> {
    return apiGet("/employees");
  },

  // Create new Employee
  createEmployee(request: EmployeeRequest): Promise<Employee> {
    return apiPost("/employees", request);
  },

  // Update Employee
  updateEmployee(id: number, request: EmployeeRequest): Promise<Employee> {
    return apiPut(`/employees/${id}`, request);
  },
  updateEmployeeWithPassword(
    id: number,
    request: EmployeeRequest
  ): Promise<Employee> {
    return apiPut(`/employees/password/${id}`, request);
  },
};
