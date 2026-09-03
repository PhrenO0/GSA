"use client";

import { CATEGORIES } from "./ring/projects";

export default function CategoryFilter({ activeCategory, onSelectCategory }) {
  return (
    <div className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 z-20 max-w-[95vw] overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-lg border border-black/10 shadow-lg shadow-black/5 transition-all">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm font-semibold scale-102"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
