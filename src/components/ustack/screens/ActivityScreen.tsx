import { motion } from "framer-motion";
import { ArrowDownToLine, Trophy, Flame, ShieldCheck, ArrowUpFromLine, Vault } from "lucide-react";
import { activity } from "@/lib/ustack-data";

const iconMap = {
  deposit: ArrowDownToLine, milestone: Trophy, streak: Flame,
  protection: ShieldCheck, withdraw: ArrowUpFromLine, vault: Vault,
} as const;
const gradMap = {
  deposit: "grad-coral", milestone: "grad-mint", streak: "grad-btc",
  protection: "grad-teal", withdraw: "grad-teal", vault: "grad-coral",
} as const;

export function ActivityScreen() {
  return (
    <div className="px-5 pt-2 flex flex-col gap-5">
      <div>
        <div className="text-2xl font-semibold tracking-tight">Activity</div>
        <div className="text-sm text-muted-foreground">Every step you took toward your goals.</div>
      </div>

      <div className="flex flex-col gap-2">
        {activity.map((a, i) => {
          const Icon = iconMap[a.kind];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-card/60 p-3.5 flex items-center gap-3"
            >
              <div className={`w-11 h-11 rounded-xl ${gradMap[a.kind]} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-background" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.meta}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.when}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
