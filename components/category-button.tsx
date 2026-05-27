"use client";

import { LucideIcon } from "lucide-react";

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryButton({
  icon: Icon,
  label,
  isActive,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 px-6 py-4 md:px-8 md:py-5 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      <Icon
        className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-300 ${
          isActive ? "scale-110" : "group-hover:scale-105"
        }`}
      />
      <span className="font-medium text-sm md:text-base tracking-wide">
        {label}
      </span>
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
      )}
    </button>
  );
}
