import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const AnalyticsCard = ({
  name,
  value,
  icon,
  trend = null,
  color = "blue",
  isLoading = false,
  isRupee = false
}) => {
  const [animate, setAnimate] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  // Color themes with gradients and accents
  const themes = {
    blue: {
      title: "text-sky-700",
      value: "text-blue-900",
      iconBg: "bg-gradient-to-tr from-blue-100 via-sky-50 to-blue-200",
      iconShadow: "shadow-blue-400/30",
      border: "border-blue-200",
      gradientBg: "bg-gradient-to-br from-blue-50/50 to-sky-50/50",
      trendUp: "text-emerald-600",
      trendDown: "text-rose-600",
    },
    green: {
      title: "text-emerald-700",
      value: "text-emerald-900",
      iconBg: "bg-gradient-to-tr from-emerald-100 via-green-50 to-emerald-200",
      iconShadow: "shadow-emerald-400/30",
      border: "border-emerald-200",
      gradientBg: "bg-gradient-to-br from-emerald-50/50 to-green-50/50",
      trendUp: "text-emerald-600",
      trendDown: "text-rose-600",
    },
    purple: {
      title: "text-purple-700",
      value: "text-purple-900",
      iconBg: "bg-gradient-to-tr from-purple-100 via-violet-50 to-purple-200",
      iconShadow: "shadow-purple-400/30",
      border: "border-purple-200",
      gradientBg: "bg-gradient-to-br from-purple-50/50 to-violet-50/50",
      trendUp: "text-emerald-600",
      trendDown: "text-rose-600",
    },
    amber: {
      title: "text-amber-700",
      value: "text-amber-900",
      iconBg: "bg-gradient-to-tr from-amber-100 via-yellow-50 to-amber-200",
      iconShadow: "shadow-amber-400/30",
      border: "border-amber-200",
      gradientBg: "bg-gradient-to-br from-amber-50/50 to-yellow-50/50",
      trendUp: "text-emerald-600",
      trendDown: "text-rose-600",
    },
    red: {
      title: "text-rose-700",
      value: "text-rose-900",
      iconBg: "bg-gradient-to-tr from-rose-100 via-red-50 to-rose-200",
      iconShadow: "shadow-rose-400/30",
      border: "border-rose-200",
      gradientBg: "bg-gradient-to-br from-rose-50/50 to-red-50/50",
      trendUp: "text-emerald-600",
      trendDown: "text-rose-600",
    },
  };

  const currentTheme = themes[color] || themes.blue;

  // Format the number with commas and handle large values
  const formatNumber = (num) => {
    if (typeof num !== "number") return num;

    // Add abbreviations for large numbers
    // if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    // if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    // if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";

    return new Intl.NumberFormat().format(num);
  };

  // Animation effect
  useEffect(() => {
    setAnimate(true);

    // Skip animation for non-numbers or during loading
    if (typeof value !== "number" || isLoading) {
      setDisplayValue(value);
      return;
    }

    // Animation for numbers
    const duration = 1200;
    const steps = 20;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isLoading]);

  // Format the display value
  const formattedValue =
    typeof displayValue === "number"
      ? formatNumber(displayValue)
      : displayValue || 0;

  return (
    <div
      className={`border ${currentTheme.border} rounded-xl p-6 ${
        currentTheme.gradientBg
      } shadow-sm hover:shadow-md transition-all duration-300 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } min-h-40`}
    >
      <div className="flex justify-between items-start mb-6">
        <h1
          className={`text-base font-semibold uppercase tracking-wider ${currentTheme.title} pt-3 pr-6`}
        >
          {name}
        </h1>
        <div
          className={`w-16 h-16 shadow-md ${currentTheme.iconShadow} rounded-full ${currentTheme.iconBg} p-3 flex items-center justify-center`}
        >
          {typeof icon === "string" ? (
            <img className="w-full object-contain" src={icon} alt={name} />
          ) : (
            icon
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <h1 className={`text-xl md:text-2xl ${currentTheme.value}`}>
          {isLoading ? "..." : isRupee ? `₹ ${formattedValue}` : formattedValue}
        </h1>

        {trend !== null && !isLoading && (
          <div
            className={`flex items-center space-x-1 ${
              trend >= 0 ? currentTheme.trendUp : currentTheme.trendDown
            }`}
          >
            {trend >= 0 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};



export default AnalyticsCard;
