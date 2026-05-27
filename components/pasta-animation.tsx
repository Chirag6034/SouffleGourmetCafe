"use client";

import { useEffect, useState, useRef } from "react";

interface PastaAnimationProps {
  isActive: boolean;
  onComplete: () => void;
}

export function PastaAnimation({ isActive, onComplete }: PastaAnimationProps) {
  const [stage, setStage] = useState<"idle" | "bowl" | "pasta" | "done">("idle");
  const hasStarted = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isActive && !hasStarted.current) {
      hasStarted.current = true;
      setStage("bowl");
      
      const bowlTimer = setTimeout(() => setStage("pasta"), 800);
      const pastaTimer = setTimeout(() => setStage("done"), 2000);
      const completeTimer = setTimeout(() => {
        onCompleteRef.current();
      }, 2800);

      return () => {
        clearTimeout(bowlTimer);
        clearTimeout(pastaTimer);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Bowl */}
        <svg
          viewBox="0 0 200 200"
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
            stage === "bowl" || stage === "pasta" || stage === "done"
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          {/* Bowl shadow */}
          <ellipse
            cx="100"
            cy="170"
            rx="70"
            ry="12"
            className="fill-black/30"
          />
          {/* Bowl body */}
          <path
            d="M30 100 Q30 160 100 160 Q170 160 170 100 L170 95 Q170 80 100 80 Q30 80 30 95 Z"
            className="fill-secondary stroke-border"
            strokeWidth="2"
          />
          {/* Bowl rim highlight */}
          <ellipse
            cx="100"
            cy="90"
            rx="68"
            ry="12"
            className="fill-muted stroke-border/50"
            strokeWidth="1"
          />
          {/* Inner bowl shadow */}
          <ellipse
            cx="100"
            cy="95"
            rx="55"
            ry="8"
            className="fill-background/30"
          />
        </svg>

        {/* Pasta strands dropping */}
        {(stage === "pasta" || stage === "done") && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pasta-drop"
                style={{
                  left: `${35 + i * 4}%`,
                  animationDelay: `${i * 80}ms`,
                }}
              >
                <svg
                  width="20"
                  height="60"
                  viewBox="0 0 20 60"
                  className="overflow-visible"
                >
                  <path
                    d={`M10 0 Q${5 + Math.random() * 10} 20 ${8 + Math.random() * 4} 40 Q${6 + Math.random() * 8} 50 10 60`}
                    fill="none"
                    stroke="oklch(0.85 0.08 85)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* Pasta in bowl */}
        {stage === "done" && (
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full animate-fade-in"
          >
            {/* Pasta pile */}
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d={`M${50 + Math.random() * 20} ${95 + Math.random() * 10} Q${70 + Math.random() * 30} ${85 + Math.random() * 15} ${100 + Math.random() * 30} ${95 + Math.random() * 10}`}
                fill="none"
                stroke="oklch(0.85 0.08 85)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ opacity: 0.7 + Math.random() * 0.3 }}
              />
            ))}
            {/* Sauce drizzle */}
            <ellipse
              cx="100"
              cy="92"
              rx="25"
              ry="8"
              className="fill-primary/60"
            />
            {/* Herbs */}
            {[...Array(5)].map((_, i) => (
              <circle
                key={i}
                cx={80 + Math.random() * 40}
                cy={88 + Math.random() * 8}
                r="2"
                className="fill-green-600"
              />
            ))}
          </svg>
        )}

        {/* Loading text */}
        <p
          className={`absolute -bottom-12 left-1/2 -translate-x-1/2 font-serif text-xl text-primary transition-opacity duration-500 ${
            stage === "done" ? "opacity-100" : "opacity-0"
          }`}
        >
          Buon Appetito
        </p>
      </div>
    </div>
  );
}
