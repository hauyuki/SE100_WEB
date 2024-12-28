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
