import { vaults, type Vault } from "@/lib/ustack-data";
import { VaultCard } from "../VaultCard";

export function VaultsScreen({ onOpenVault, onCreateVault }: { onOpenVault: (v: Vault) => void; onCreateVault: () => void }) {
  return (
    <div className="px-5 pt-2 flex flex-col gap-5">
      <div>
        <div className="text-2xl font-semibold tracking-tight">Your Vaults</div>
        <div className="text-sm text-muted-foreground">Long-term commitments, made calmly.</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {vaults.map((v) => (
          <VaultCard key={v.id} vault={v} onClick={() => onOpenVault(v)} large />
        ))}
        <button
          onClick={onCreateVault}
          className="h-44 rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-muted-foreground active:scale-[0.98] transition"
        >
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-xl">+</div>
          <div className="text-xs">New vault</div>
        </button>
      </div>
    </div>
  );
}
