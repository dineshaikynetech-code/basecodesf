import { useState } from "react";
import { BUSINESS_TYPES } from "../constants";
import { BusinessCard } from "../components/BusinessCard";

export default function BusinessSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-foreground">
            What best describes your Business?
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            This will helps us understand your needs better and deliver a more customized experience
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {BUSINESS_TYPES.map((item) => (
            <BusinessCard
              key={item.id}
              item={item}
              selected={selected === item.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}