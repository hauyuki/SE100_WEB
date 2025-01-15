import { z } from "zod";

export const AuthSchema = z.object({
  username: z
    .string()
    .email("This email is invalid")
    .min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});
export const RegisterSchema = z.object({
  email: z
    .string()
    .email("This email is invalid")
    .min(1, "This field is required"),
  password: z.string().min(8, "Invalid password"),
  name: z.string().min(1, "This field is required"),
});

// Define the ShipmentRequest Zod schema
export const ShipmentRequestSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // ISO 8601 format
  carrier: z.string(),
  toLocation: z.string(),
  fromLocation: z.string(),
  employeeId: z.number().int(),
});

// Define the ItemRequest Zod schema
export const ItemRequestSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  unitPrice: z.coerce.number().int().nonnegative(),
  manufactoringDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // ISO 8601 format
  expirationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // ISO 8601 format
  productId: z.coerce.number().int().positive(),
});

// Define the InboundReportRequest Zod schema
export const InboundReportRequestSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // ISO 8601 format
  shipment: ShipmentRequestSchema,
  items: z
    .array(ItemRequestSchema)
    .min(1, { message: "At least one item is required" }), // Ensure at least one item in the array
});

// Define the Product Zod schema (assuming this is required for the `product` object inside `InboundReportItem`)
export const ProductSchema = z.object({
  id: z.number().int().positive(),
  sku: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  marketPrice: z.number().nonnegative(),
  productionCost: z.number().nonnegative(),
  capacity: z.string(),
  productType: z.string(),
  weight: z.string(),
  image: z.string(),
  minQuantity: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  category: z.object({
    id: z.number().int().positive(),
    name: z.string(),
  }),
  company: z.object({
    id: z.number().int().positive(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string().email(),
  }),
  tags: z.array(z.string()),
});

export const InboundReportItemSchema = z
  .object({
    id: z.number().int().positive(),
    quantity: z.number().int().positive(),
    expirationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid expiration date format",
    }), // ISO date
    totalPrice: z.number().nonnegative(),
    unitPrice: z.number().nonnegative(),
    manufactoringDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid manufactoring date format",
    }), // ISO date
    stockQuantity: z.number().int().nonnegative(),
    product: ProductSchema,
  })
  .refine(
    (data) =>
      Date.parse(data.manufactoringDate) < Date.parse(data.expirationDate),
    {
      message: "Manufacturing date must be earlier than expiration date",
      path: ["manufactoringDate"], // This will show the error on the manufactoringDate field
    }
  );
export const UpsertProductModelSchema = z.object({
  id: z.number().optional(), // Optional ID field
  name: z.string().min(1, "Product name is required"), // Name is required and cannot be empty
  description: z.string().min(1, "Product description is required"), // Name is required and cannot be empty
  sku: z.string().min(1, "SKU is required"), // SKU is required and cannot be empty
  marketPrice: z.number().min(0, "Market price must be a positive number"), // Market price must be a non-negative number
  productionCost: z
    .number()
    .min(0, "Production cost must be a positive number"), // Production cost must be a non-negative number
  image: z.string().optional(), // Image must be a valid URL
  capacity:z.string(),
  productType:z.string(),
  weight:z.string(),
  minQuantity: z.number().min(0, "Minimum quantity must be a positive number"), // Minimum quantity must be a non-negative number
  maxQuantity: z.number().min(0, "Maximum quantity must be a positive number"), // Maximum quantity must be a non-negative number
  categoryId: z.coerce.number().int().min(1, "Category ID is required"), // Category ID must be a positive number
  companyId: z.coerce.number().int().min(1, "Company ID is required"), // Company ID must be a positive number
  tagIds: z
    .array(
      z.coerce.number().int().min(1, "Each tag ID must be a positive number")
    )
    .nonempty("At least one tag ID is required"), // Tag IDs must be an array of positive numbers and cannot be empty
});
export const UpsertTagModelSchema = z.object({
  id: z.number().optional(), // Optional ID field
  name: z.string().min(1, "Tag name is required"), // Name is required and cannot be empty
  description: z.string().min(1, "Tag description is required"), // Name is required and cannot be empty
  areaId: z.coerce.number().int().min(0, "Must select area"), // Market price must be a non-negative number
});
const OutboundReportItemSchema = z.object({
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"), // Quantity must be greater than 0
  unitPrice: z.number().min(0, "Đơn giá không thể nhỏ hơn 0"),
  productId: z.number().int(), // Product ID must be an integer
});
export const OutboundReportRequestSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày không hợp lệ",
  }), // Date should be a valid ISO string
  shipment: ShipmentRequestSchema, // Nested shipment schema
  items: z.array(OutboundReportItemSchema).min(1, "Cần ít nhất một sản phẩm"), // Ensure at least one item is provided
});
export const UpdateShipmentSchema = z.object({
  type: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // ISO 8601 format
  completedDate: z.string().optional(), // ISO 8601 format
  carrier: z.string(),
  status: z.string(),
  employeeId: z.number().int(),
  fromPosition: z.string().optional(),
  toPosition: z.string().optional(),
});

export type EmployeeRequest = {
  position: string;
  address: string;
  phone: string;
  name: string;
  department: string;
  avatar: string;
  dob: string; // ISO date format
  username: string;
  password: string;
};

export const EmployeeRequestSchema = z.object({
  position: z.string(),
  address: z.string(),
  phone: z.string(),
  name: z.string(),
  department: z.string(),
  avatar: z.string(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  username: z.string(),
  password: z.string().optional(),
});
const InventoryCheckItemSchema = z.object({
  loss: z.number().min(1, "Số lượng mất phải lớn hơn 0"), // Loss must be greater than 0
  productId: z.number().int(), // Product ID must be an integer
});

// Main schema for the report request
export const InventoryCheckRequestSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Ngày không hợp lệ", // Date must be a valid ISO string
  }),
  name: z.string().min(1, "Tên báo cáo không thể để trống"), // InventoryCheck name cannot be empty
  employeeId: z.number().int(), // Employee ID must be an integer
  items: z.array(InventoryCheckItemSchema).min(1, "Cần ít nhất một sản phẩm"), // Ensure at least one item is provided
});
