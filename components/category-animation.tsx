"use client";

import { useEffect, useState, useRef } from "react";

interface CategoryAnimationProps {
  category: string;
  isActive: boolean;
  onComplete: () => void;
}

type Stage = "idle" | "container" | "items" | "done";

const categoryConfig: Record<string, { container: string; tagline: string }> = {
  pizza: { container: "Pizza Stone", tagline: "Straight from the oven" },
  burger: { container: "Grill Plate", tagline: "Flame-grilled perfection" },
  wrap: { container: "Tortilla Press", tagline: "Freshly wrapped" },
  sandwich: { container: "Cutting Board", tagline: "Stacked with love" },
  pasta: { container: "Pasta Bowl", tagline: "Buon Appetito" },
  drinks: { container: "Cocktail Glass", tagline: "Crafted to perfection" },
  coffee: { container: "Coffee Cup", tagline: "Freshly brewed" },
  fries: { container: "Fry Basket", tagline: "Crispy & golden" },
  salads: { container: "Salad Bowl", tagline: "Fresh & vibrant" },
  rice: { container: "Rice Bowl", tagline: "Perfectly steamed" },
  nachos: { container: "Nacho Platter", tagline: "Loaded & ready" },
  desserts: { container: "Dessert Plate", tagline: "Sweet indulgence" },
};

export function CategoryAnimation({ category, isActive, onComplete }: CategoryAnimationProps) {
  const [stage, setStage] = useState<Stage>("idle");
  const hasStarted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isActive && !hasStarted.current) {
      hasStarted.current = true;
      setStage("container");
      
      const itemsTimer = setTimeout(() => setStage("items"), 600);
      const doneTimer = setTimeout(() => setStage("done"), 1600);
      const completeTimer = setTimeout(() => {
        onCompleteRef.current();
      }, 2200);

      return () => {
        clearTimeout(itemsTimer);
        clearTimeout(doneTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setStage("idle");
      hasStarted.current = false;
    }
  }, [isActive]);

  if (!isActive || stage === "idle") return null;

  const config = categoryConfig[category] || { container: "Plate", tagline: "Enjoy" };

  const renderAnimation = () => {
    switch (category) {
      case "pizza":
        return <PizzaAnimation stage={stage} />;
      case "burger":
        return <BurgerAnimation stage={stage} />;
      case "wrap":
        return <WrapAnimation stage={stage} />;
      case "sandwich":
        return <SandwichAnimation stage={stage} />;
      case "pasta":
        return <PastaAnimationContent stage={stage} />;
      case "drinks":
        return <DrinksAnimation stage={stage} />;
      case "coffee":
        return <CoffeeAnimation stage={stage} />;
      case "fries":
        return <FriesAnimation stage={stage} />;
      case "salads":
        return <SaladsAnimation stage={stage} />;
      case "rice":
        return <RiceAnimation stage={stage} />;
      case "nachos":
        return <NachosAnimation stage={stage} />;
      case "desserts":
        return <DessertsAnimation stage={stage} />;
      default:
        return <DefaultAnimation stage={stage} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {renderAnimation()}
        <p
          className={`absolute -bottom-12 left-1/2 -translate-x-1/2 font-serif text-xl text-primary transition-opacity duration-500 whitespace-nowrap ${
            stage === "done" ? "opacity-100" : "opacity-0"
          }`}
        >
          {config.tagline}
        </p>
      </div>
    </div>
  );
}

// Pizza Animation - Stone with pizza sliding in
function PizzaAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="70" ry="12" className="fill-black/30" />
        <ellipse cx="100" cy="130" rx="75" ry="20" className="fill-secondary" />
        <ellipse cx="100" cy="125" rx="70" ry="18" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <g className="animate-slide-in-right" style={{ transformOrigin: "center" }}>
            <ellipse cx="100" cy="115" rx="55" ry="14" fill="oklch(0.75 0.12 55)" />
            <ellipse cx="100" cy="112" rx="52" ry="12" fill="oklch(0.85 0.08 60)" />
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={75 + (i % 4) * 18}
                cy={105 + Math.floor(i / 4) * 12}
                r="5"
                fill="oklch(0.5 0.15 25)"
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <circle key={i} cx={80 + i * 12} cy={112} r="2" className="fill-green-600" />
            ))}
          </g>
        </svg>
      )}
    </>
  );
}

// Burger Animation - Grill plate with burger stacking
function BurgerAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="65" ry="10" className="fill-black/30" />
        <rect x="35" y="140" width="130" height="8" rx="2" className="fill-secondary" />
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={45 + i * 20} y="140" width="3" height="8" className="fill-muted" />
        ))}
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <g>
            <ellipse cx="100" cy="135" rx="35" ry="8" fill="oklch(0.55 0.12 55)" className="animate-drop-1" />
            <ellipse cx="100" cy="128" rx="38" ry="6" fill="oklch(0.5 0.15 25)" className="animate-drop-2" />
            <ellipse cx="100" cy="122" rx="36" ry="5" fill="oklch(0.75 0.12 100)" className="animate-drop-3" />
            <path d="M65 118 Q100 125 135 118" fill="none" stroke="oklch(0.65 0.15 140)" strokeWidth="3" className="animate-drop-3" />
            <ellipse cx="100" cy="112" rx="38" ry="8" fill="oklch(0.55 0.12 55)" className="animate-drop-4" />
            <ellipse cx="100" cy="108" rx="36" ry="6" fill="oklch(0.7 0.08 80)" className="animate-drop-5" />
            {[...Array(8)].map((_, i) => (
              <circle key={i} cx={80 + (i % 4) * 12} cy={106 + Math.floor(i / 4) * 3} r="1" fill="oklch(0.8 0.05 90)" className="animate-drop-5" />
            ))}
          </g>
        </svg>
      )}
    </>
  );
}

// Wrap Animation - Tortilla rolling
function WrapAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="60" ry="10" className="fill-black/30" />
        <ellipse cx="100" cy="140" rx="65" ry="25" className="fill-secondary" />
        <ellipse cx="100" cy="135" rx="60" ry="22" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <g className="animate-roll-in">
            <ellipse cx="100" cy="120" rx="45" ry="15" fill="oklch(0.85 0.06 85)" />
            <path d="M55 120 Q100 100 145 120 Q100 140 55 120" fill="oklch(0.8 0.05 80)" />
            <ellipse cx="100" cy="118" rx="30" ry="8" fill="oklch(0.65 0.1 140)" />
            {[...Array(6)].map((_, i) => (
              <rect key={i} x={80 + i * 6} y={115} width="4" height="6" rx="1" fill="oklch(0.55 0.12 55)" />
            ))}
          </g>
        </svg>
      )}
    </>
  );
}

// Sandwich Animation - Layers stacking
function SandwichAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="55" ry="8" className="fill-black/30" />
        <rect x="40" y="145" width="120" height="12" rx="2" className="fill-secondary" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <path d="M50 140 L100 130 L150 140 L150 145 L100 155 L50 145 Z" fill="oklch(0.7 0.08 70)" className="animate-drop-1" />
          <rect x="55" y="130" width="90" height="6" rx="1" fill="oklch(0.7 0.15 140)" className="animate-drop-2" />
          <rect x="55" y="124" width="90" height="5" rx="1" fill="oklch(0.85 0.06 85)" className="animate-drop-3" />
          <rect x="55" y="119" width="90" height="4" rx="1" fill="oklch(0.65 0.12 25)" className="animate-drop-4" />
          <path d="M50 115 L100 105 L150 115 L150 120 L100 130 L50 120 Z" fill="oklch(0.7 0.08 70)" className="animate-drop-5" />
        </svg>
      )}
    </>
  );
}

// Pasta Animation Content - Bowl with pasta strands
function PastaAnimationContent({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="70" ry="12" className="fill-black/30" />
        <path d="M30 100 Q30 160 100 160 Q170 160 170 100 L170 95 Q170 80 100 80 Q30 80 30 95 Z" className="fill-secondary stroke-border" strokeWidth="2" />
        <ellipse cx="100" cy="90" rx="68" ry="12" className="fill-muted stroke-border/50" strokeWidth="1" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pasta-drop"
              style={{ left: `${35 + i * 4}%`, animationDelay: `${i * 60}ms` }}
            >
              <svg width="20" height="60" viewBox="0 0 20 60" className="overflow-visible">
                <path
                  d={`M10 0 Q${5 + Math.random() * 10} 20 ${8 + Math.random() * 4} 40 Q${6 + Math.random() * 8} 50 10 60`}
                  fill="none" stroke="oklch(0.85 0.08 85)" strokeWidth="3" strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>
      )}
      {stage === "done" && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-fade-in">
          {[...Array(12)].map((_, i) => (
            <path
              key={i}
              d={`M${50 + Math.random() * 20} ${95 + Math.random() * 10} Q${70 + Math.random() * 30} ${85 + Math.random() * 15} ${100 + Math.random() * 30} ${95 + Math.random() * 10}`}
              fill="none" stroke="oklch(0.85 0.08 85)" strokeWidth="2.5" strokeLinecap="round"
              style={{ opacity: 0.7 + Math.random() * 0.3 }}
            />
          ))}
          <ellipse cx="100" cy="92" rx="25" ry="8" className="fill-primary/60" />
        </svg>
      )}
    </>
  );
}

// Drinks Animation - Cocktail glass with liquid pouring
function DrinksAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="30" ry="6" className="fill-black/30" />
        <rect x="95" y="130" width="10" height="35" className="fill-muted" />
        <ellipse cx="100" cy="165" rx="25" ry="6" className="fill-secondary" />
        <path d="M60 80 L100 130 L140 80 Z" fill="none" className="stroke-muted" strokeWidth="3" />
        <path d="M62 82 L100 128 L138 82 Z" className="fill-secondary/50" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="drinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.2 25)" />
              <stop offset="100%" stopColor="oklch(0.55 0.25 15)" />
            </linearGradient>
          </defs>
          <path d="M70 90 L100 120 L130 90 Z" fill="url(#drinkGrad)" className="animate-fill-up" />
          {stage === "done" && (
            <>
              <circle cx="85" cy="95" r="3" className="fill-primary/60 animate-bubble" />
              <circle cx="110" cy="100" r="2" className="fill-primary/40 animate-bubble" style={{ animationDelay: "0.2s" }} />
              <line x1="100" y1="70" x2="100" y2="85" className="stroke-muted" strokeWidth="2" />
              <circle cx="100" cy="68" r="6" fill="oklch(0.7 0.15 25)" />
            </>
          )}
        </svg>
      )}
    </>
  );
}

// Coffee Animation - Cup with steam
function CoffeeAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="45" ry="8" className="fill-black/30" />
        <path d="M55 90 L60 160 L140 160 L145 90 Z" className="fill-secondary" />
        <ellipse cx="100" cy="90" rx="45" ry="12" className="fill-muted" />
        <path d="M145 100 Q170 100 170 125 Q170 150 145 150" fill="none" className="stroke-secondary" strokeWidth="8" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <ellipse cx="100" cy="95" rx="38" ry="8" fill="oklch(0.35 0.08 50)" className="animate-fade-in" />
          {stage === "done" && (
            <g className="animate-steam">
              <path d="M85 70 Q80 50 85 30" fill="none" className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
              <path d="M100 65 Q105 45 100 25" fill="none" className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
              <path d="M115 70 Q120 50 115 30" fill="none" className="stroke-muted-foreground/30" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}
        </svg>
      )}
    </>
  );
}

// Fries Animation - Basket with fries popping up
function FriesAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="55" ry="10" className="fill-black/30" />
        <path d="M45 100 L55 160 L145 160 L155 100 Z" className="fill-secondary" />
        <path d="M45 100 L155 100" className="stroke-muted" strokeWidth="4" />
        {[...Array(5)].map((_, i) => (
          <line key={i} x1={55 + i * 22} y1="105" x2={58 + i * 22} y2="155" className="stroke-muted/50" strokeWidth="2" />
        ))}
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x={65 + (i % 6) * 12}
              y={60 + Math.random() * 20}
              width="8"
              height={35 + Math.random() * 15}
              rx="2"
              fill="oklch(0.8 0.12 85)"
              className="animate-fry-pop"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </svg>
      )}
    </>
  );
}

// Salads Animation - Bowl with greens tossing
function SaladsAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="65" ry="12" className="fill-black/30" />
        <path d="M35 110 Q35 160 100 160 Q165 160 165 110 L165 105 Q165 90 100 90 Q35 90 35 105 Z" className="fill-secondary" />
        <ellipse cx="100" cy="100" rx="63" ry="12" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx={70 + (i % 4) * 20}
              cy={85 + Math.floor(i / 4) * 15}
              rx={12 + Math.random() * 5}
              ry={6 + Math.random() * 3}
              fill={i % 2 === 0 ? "oklch(0.6 0.15 140)" : "oklch(0.5 0.12 145)"}
              className="animate-toss"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
          {stage === "done" && (
            <>
              <circle cx="80" cy="95" r="6" fill="oklch(0.6 0.2 25)" />
              <circle cx="120" cy="90" r="5" fill="oklch(0.7 0.15 100)" />
              <circle cx="100" cy="98" r="4" fill="oklch(0.85 0.05 90)" />
            </>
          )}
        </svg>
      )}
    </>
  );
}

// Rice Animation - Bowl with rice and steam
function RiceAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="55" ry="10" className="fill-black/30" />
        <path d="M45 110 Q45 160 100 160 Q155 160 155 110 L155 105 Q155 90 100 90 Q45 90 45 105 Z" className="fill-secondary" />
        <ellipse cx="100" cy="100" rx="53" ry="12" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <ellipse cx="100" cy="95" rx="45" ry="10" fill="oklch(0.95 0.02 90)" className="animate-fade-in" />
          {[...Array(30)].map((_, i) => (
            <ellipse
              key={i}
              cx={65 + (i % 10) * 7}
              cy={88 + Math.floor(i / 10) * 5}
              rx="3"
              ry="1.5"
              fill="oklch(0.95 0.02 90)"
              className="animate-rice-grain"
              style={{ animationDelay: `${i * 20}ms` }}
            />
          ))}
          {stage === "done" && (
            <g className="animate-steam">
              <path d="M85 70 Q80 50 85 35" fill="none" className="stroke-muted-foreground/20" strokeWidth="2" strokeLinecap="round" />
              <path d="M100 68 Q105 48 100 33" fill="none" className="stroke-muted-foreground/20" strokeWidth="2" strokeLinecap="round" />
              <path d="M115 70 Q120 50 115 35" fill="none" className="stroke-muted-foreground/20" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      )}
    </>
  );
}

// Nachos Animation - Platter with chips piling
function NachosAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="70" ry="12" className="fill-black/30" />
        <ellipse cx="100" cy="145" rx="75" ry="18" className="fill-secondary" />
        <ellipse cx="100" cy="140" rx="70" ry="15" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <polygon
              key={i}
              points={`${70 + (i % 5) * 15},${125 - Math.floor(i / 5) * 10} ${80 + (i % 5) * 15},${105 - Math.floor(i / 5) * 10} ${90 + (i % 5) * 15},${125 - Math.floor(i / 5) * 10}`}
              fill="oklch(0.75 0.12 85)"
              className="animate-chip-pile"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
          {stage === "done" && (
            <>
              <ellipse cx="100" cy="115" rx="20" ry="8" fill="oklch(0.7 0.15 80)" />
              {[...Array(5)].map((_, i) => (
                <circle key={i} cx={85 + i * 8} cy={113} r="2" fill="oklch(0.5 0.15 140)" />
              ))}
            </>
          )}
        </svg>
      )}
    </>
  );
}

// Desserts Animation - Plate with cake slice
function DessertsAnimation({ stage }: { stage: Stage }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
          stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <ellipse cx="100" cy="170" rx="60" ry="10" className="fill-black/30" />
        <ellipse cx="100" cy="150" rx="65" ry="12" className="fill-secondary" />
        <ellipse cx="100" cy="147" rx="60" ry="10" className="fill-muted" />
      </svg>
      {(stage === "items" || stage === "done") && (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <g className="animate-dessert-appear">
            <path d="M70 140 L100 90 L130 140 Z" fill="oklch(0.85 0.06 85)" />
            <path d="M70 140 L100 90 L100 140 Z" fill="oklch(0.8 0.05 80)" />
            <rect x="70" y="125" width="60" height="15" fill="oklch(0.55 0.15 25)" />
            <rect x="70" y="115" width="60" height="10" fill="oklch(0.85 0.06 85)" />
            <ellipse cx="100" cy="95" rx="15" ry="8" fill="oklch(0.95 0.02 90)" />
            {stage === "done" && (
              <>
                <circle cx="95" cy="93" r="3" fill="oklch(0.55 0.2 25)" />
                <line x1="100" y1="80" x2="100" y2="60" className="stroke-primary" strokeWidth="2" />
                <polygon points="97,60 100,55 103,60" fill="oklch(0.65 0.2 40)" />
              </>
            )}
          </g>
        </svg>
      )}
    </>
  );
}

// Default Animation - Simple plate
function DefaultAnimation({ stage }: { stage: Stage }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
        stage !== "idle" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <ellipse cx="100" cy="170" rx="60" ry="10" className="fill-black/30" />
      <ellipse cx="100" cy="140" rx="65" ry="15" className="fill-secondary" />
      <ellipse cx="100" cy="135" rx="55" ry="12" className="fill-muted" />
    </svg>
  );
}
