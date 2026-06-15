"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Accessible context, e.g. the product name. */
  label: string;
}

const btnClass =
  "flex h-10 w-10 items-center justify-center rounded-lg border border-offwhite/20 text-offwhite transition-colors duration-200 hover:border-accent hover:text-accent focus-ring-accent disabled:pointer-events-none disabled:opacity-40";

export default function QuantityStepper({
  value,
  min = 1,
  max = 999,
  onIncrement,
  onDecrement,
  label,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={`Disminuir cantidad de ${label}`}
        className={btnClass}
        style={{ transitionProperty: "color, border-color" }}
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span
        aria-live="polite"
        aria-label={`Cantidad: ${value}`}
        className="w-8 text-center text-sm font-semibold tabular-nums text-offwhite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={`Aumentar cantidad de ${label}`}
        className={btnClass}
        style={{ transitionProperty: "color, border-color" }}
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
