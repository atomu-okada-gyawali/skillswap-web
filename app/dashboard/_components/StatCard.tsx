import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  colorClass?: string;
  iconColorClass?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorClass = "bg-white",
  iconColorClass = "text-c5",
}: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md ${colorClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-opacity-10 ${iconColorClass.replace("text-", "bg-")}`}>
          <Icon className={`w-6 h-6 ${iconColorClass}`} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend.isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}>
            {trend.isUp ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
