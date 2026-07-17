"use client";

import { FormEvent, useState } from "react";

type Step = "use" | "contact" | "done";

const USE_TYPES = [
  { value: "personal", label: "Personal life", hint: "Home, habits, daily routines" },
  { value: "work", label: "Work", hint: "Solo productivity and focus" },
  { value: "team", label: "Team / company", hint: "Shared ops and workflows" },
  { value: "exploring", label: "Just exploring", hint: "Not sure yet? That’s fine" },
] as const;

export default function WaitlistForm() {
  const [step, setStep] = useState<Step>("use");
  const [useType, setUseType] = useState("");
  const [name, setName] = useState("");

  function onUseContinue(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!useType) return;
    setStep("contact");
  }

  function onContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Storage wiring comes later — collect use type, name, email only for now
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!fullName || !email || !useType) return;
    setName(fullName);
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="waitlist-success" role="status" aria-live="polite">
        <p className="waitlist-success-kicker">You&apos;re on the list</p>
        <h2>Thanks{name ? `, ${name.split(" ")[0]}` : ""}.</h2>
        <p>We&apos;ll reach out when Cuppet is ready for you.</p>
        <a className="nav-cta waitlist-back" href="/">
          Back to home
        </a>
      </div>
    );
  }

  if (step === "use") {
    return (
      <form className="waitlist-form" onSubmit={onUseContinue}>
        <p className="waitlist-step" aria-hidden="true">
          Step 1 of 2
        </p>
        <fieldset className="waitlist-use">
          <legend className="waitlist-use-legend">How will you use Cuppet?</legend>
          <p className="waitlist-use-help" id="waitlist-use-help">
            Pick the closest fit. It helps us prioritize early access.
          </p>
          <div className="waitlist-use-options" role="radiogroup" aria-describedby="waitlist-use-help">
            {USE_TYPES.map((opt) => (
              <label
                key={opt.value}
                className={`waitlist-use-option${useType === opt.value ? " is-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="useType"
                  value={opt.value}
                  required
                  checked={useType === opt.value}
                  onChange={() => setUseType(opt.value)}
                />
                <span className="waitlist-use-label">{opt.label}</span>
                <span className="waitlist-use-hint">{opt.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <button className="nav-cta waitlist-submit" type="submit" disabled={!useType}>
          Continue
        </button>
      </form>
    );
  }

  return (
    <form className="waitlist-form" onSubmit={onContactSubmit}>
      <p className="waitlist-step" aria-hidden="true">
        Step 2 of 2
      </p>
      <button className="waitlist-back-step" type="button" onClick={() => setStep("use")}>
        ← Change use type
      </button>
      <div className="waitlist-field">
        <label htmlFor="waitlist-name">Name</label>
        <input
          id="waitlist-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
          maxLength={80}
          autoFocus
        />
      </div>
      <div className="waitlist-field">
        <label htmlFor="waitlist-email">Email</label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
          maxLength={120}
        />
      </div>
      <button className="nav-cta waitlist-submit" type="submit">
        Join the waitlist
      </button>
      <p className="waitlist-note">No spam. Just an invite when it&apos;s your turn.</p>
    </form>
  );
}
