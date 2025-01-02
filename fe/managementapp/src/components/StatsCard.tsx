import React from "react";

interface StatsCardProps {
  title: string;
  value?: number;
  percentage?: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentage,
  icon,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 font-bold">{title}</h3>
        <div className="text-[#636AE8FF]">{icon}</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[#6E74E9FF] text-2xl font-semibold">{value}</span>
        <span className="text-green-500">{percentage} so với tháng trước</span>
      </div>
    </div>
  );
};

export default StatsCard;
