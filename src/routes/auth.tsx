import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { PhoneFrame } from "@/components/ustack/PhoneFrame";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Create account — UStack" }, { name: "description", content: "Fast, lightweight onboarding. Minimal data." }] }),
  component: Auth,
});

function Auth() {
  const nav = useNavigate();
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [otp, setOtp] = useState(["", "", "", ""]);

  if (step === "done") {
    setTimeout(() => nav({ to: "/app" }), 1400);
    return (
      <PhoneFrame>
        <div className="h-full min-h-screen md:min-h-[860px] flex flex-col items-center justify-center grad-hero">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="w-24 h-24 rounded-full grad-mint flex items-center justify-center shadow-glow-teal">
              <ShieldCheck className="w-12 h-12 text-background" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 text-xl font-semibold">You're all set</motion.div>
          <div className="text-sm text-muted-foreground mt-1">Welcome to UStack</div>
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className="h-full min-h-screen md:min-h-[860px] flex flex-col px-7 pt-14 pb-8">
        <button onClick={() => (step === "otp" ? setStep("form") : nav({ to: "/welcome" }))} className="w-10 h-10 rounded-full glass flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>

        {step === "form" ? (
          <>
            <div className="mt-8">
              <h1 className="text-3xl font-semibold tracking-tight">Create your<br />UStack account</h1>
              <p className="mt-2 text-muted-foreground text-sm">We collect as little data as possible.</p>
            </div>
            <div className="mt-10 flex flex-col gap-4">
              <Field label="Username" placeholder="@yourname" />
              <Field label="Phone Number" placeholder="+260 …" />
              <Field label="Email (optional)" placeholder="you@email.com" />
            </div>
            <div className="mt-6 glass rounded-2xl p-4 text-xs text-muted-foreground leading-relaxed">
              🔒 We never share your information. No aggressive KYC. Just what's needed to keep your stack safe.
            </div>
            <div className="flex-1" />
            <button onClick={() => setStep("otp")} className="grad-coral text-primary-foreground font-semibold py-4 rounded-2xl shadow-glow-coral active:scale-[0.98] transition">
              Continue
            </button>
          </>
        ) : (
          <>
            <div className="mt-8">
              <h1 className="text-3xl font-semibold tracking-tight">Verify your<br />phone number</h1>
              <p className="mt-2 text-muted-foreground text-sm">We sent a 4-digit code to your phone.</p>
            </div>
            <div className="mt-12 flex gap-3 justify-center">
              {otp.map((v, idx) => (
                <input
                  key={idx}
                  inputMode="numeric"
                  maxLength={1}
                  value={v}
                  onChange={(e) => {
                    const nv = [...otp]; nv[idx] = e.target.value.slice(-1); setOtp(nv);
                    const next = document.getElementById(`otp-${idx + 1}`); if (e.target.value && next) (next as HTMLInputElement).focus();
                  }}
                  id={`otp-${idx}`}
                  className="w-16 h-20 text-center text-2xl font-semibold rounded-2xl bg-card border border-border focus:border-primary focus:outline-none focus:shadow-glow-coral transition"
                />
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">Resend code in 0:42</div>
            <div className="flex-1" />
            <button onClick={() => setStep("done")} className="grad-coral text-primary-foreground font-semibold py-4 rounded-2xl shadow-glow-coral active:scale-[0.98] transition">
              Verify & Continue
            </button>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      <input
        placeholder={placeholder}
        className="bg-card border border-border rounded-2xl px-4 py-4 text-base focus:border-primary focus:outline-none focus:shadow-glow-coral transition"
      />
    </label>
  );
}
