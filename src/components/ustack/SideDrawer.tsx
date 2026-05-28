import { AnimatePresence, motion } from "framer-motion";
import { Home, Wallet, Activity, User, Settings, ShieldCheck, HelpCircle, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import type { Tab } from "./BottomNav";

const links: { id: Tab | "settings" | "protection" | "help" | "logout"; icon: typeof Home; label: string }[] = [
  { id: "home", icon: Home, label: "Home" },
  { id: "vaults", icon: Wallet, label: "Vaults" },
  { id: "activity", icon: Activity, label: "Activity" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "protection", icon: ShieldCheck, label: "Price Protection" },
  { id: "settings", icon: Settings, label: "Settings" },
  { id: "help", icon: HelpCircle, label: "Help" },
  { id: "logout", icon: LogOut, label: "Log out" },
];

export function SideDrawer({ open, onClose, onSelect }: {
  open: boolean;
  onClose: () => void;
  onSelect: (t: Tab) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 grad-hero z-0 flex flex-col"
        >
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 30 }}
            className="flex-1 px-7 pt-16 pb-10"
          >
            <div className="flex items-center gap-3">
              <Logo size={42} />
              <div>
                <div className="text-base font-semibold">Norman K.</div>
                <div className="text-xs text-muted-foreground">@norman · UStack</div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-1">
              {links.map((l, i) => {
                const Icon = l.icon;
                const isTab = ["home","vaults","activity","profile"].includes(l.id);
                return (
                  <motion.button
                    key={l.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                    onClick={() => isTab ? onSelect(l.id as Tab) : onClose()}
                    className="flex items-center gap-4 py-3.5 px-2 text-left active:scale-[0.98] transition"
                  >
                    <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[1.05rem] font-medium">{l.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-10 glass rounded-2xl p-4">
              <div className="text-xs text-muted-foreground">Total stacked</div>
              <div className="text-xl font-semibold mt-1">4,812,000 sats</div>
              <div className="text-xs text-muted-foreground mt-0.5">≈ 0.0481 BTC</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
