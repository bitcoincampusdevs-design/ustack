import { Home, Layers, Activity, User } from "lucide-react";
import { motion } from "framer-motion";

export type Tab = "home" | "vaults" | "activity" | "profile";

const items: { id: Tab; Icon: typeof Home; label: string }[] = [
  { id: "home",     Icon: Home,     label: "Home" },
  { id: "vaults",   Icon: Layers,   label: "Vaults" },
  { id: "activity", Icon: Activity, label: "Activity" },
  { id: "profile",  Icon: User,     label: "Profile" },
];

export function BottomNav({ tab, onChange }: { tab: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)]">
      <div
        className="glass-strong relative flex items-center gap-1 rounded-full px-2 py-2"
        style={{ boxShadow: "var(--shadow-float)" }}
      >
        {items.map(({ id, Icon, label }, i) => {
          const isActive = id === tab;
          return (
            <div key={id} className="flex flex-1 items-center">
              {i === 2 && <div className="w-14 shrink-0" aria-hidden />}
              <button
                onClick={() => onChange(id)}
                className="relative flex flex-1 flex-col items-center justify-center rounded-full px-4 py-2 text-[10px] font-medium"
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "oklch(1 0 0 / 0.08)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon
                  className="relative h-5 w-5"
                  style={{ color: isActive ? "oklch(0.82 0.13 190)" : "oklch(0.68 0.015 255)" }}
                />
                <span
                  className="relative mt-0.5"
                  style={{ color: isActive ? "oklch(0.95 0.02 200)" : "oklch(0.6 0.015 255)" }}
                >
                  {label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
