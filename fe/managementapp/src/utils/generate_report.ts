import { StockReport } from "../models/StockReport";
import * as XLSX from "xlsx";

export const handleGenerateReport = (report: StockReport) => {
  const sheetData = [
    ["Mã báo cáo", report?.id || ""],
    ["Tên báo cáo", report?.name || ""],
    ["Ngày bắt đầu", report?.startDate || ""],
    ["Ngày kết thúc", report?.endDate || ""],
    ["Tổng tiền nhập", report?.inboundPrice || 0],
    ["Tổng tiền xuất", report?.outboundPrice || 0],
    [],
    ["Chi tiết sản phẩm"],
    [
      "Mã sản phẩm",
      "Tên sản phẩm",
      "Số lượng",
      "Số lượng xuất",
      "Tổng tiền nhập",
      "Tổng tiền xuất",
    ],
  ];

  report.items?.forEach((item) => {
    sheetData.push([
      item.id,
      item.product.name,
      item.quantity,
      item.outboundQuantity,
      item.inboundPrice,
      item.outboundPrice,
    ]);
  });

  // Create a new workbook and sheet
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo chi tiết");

  // Download the Excel file
  XLSX.writeFile(workbook, `report-${report?.id}.xlsx`);
};
