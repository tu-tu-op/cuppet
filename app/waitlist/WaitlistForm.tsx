"use client";

import { FormEvent, useState } from "react";

const USE_TYPES = [
  { value: "personal", label: "Personal life", hint: "Home, habits, daily routines" },
  { value: "work", label: "Work", hint: "Solo productivity and focus" },
  { value: "team", label: "Team / company", hint: "Shared ops and workflows" },
  { value: "exploring", label: "Just exploring", hint: "Not sure yet? That’s fine" },
  { value: "other", label: "Something else", hint: "Describe it in your own words" },
] as const;

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [useType, setUseType] = useState("");
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Storage wiring comes later — browser `required` already gates empty fields.
    setName(String(new FormData(e.currentTarget).get("name") || "").trim());
    setSubmitted(true);
  }

  if (submitted) {
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

  return (
    <form className="waitlist-form" onSubmit={onSubmit}>
      <div className="waitlist-form-section waitlist-purpose">
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
        {useType === "other" && (
          <div className="waitlist-field">
            <label htmlFor="waitlist-purpose">How do you plan to use Cuppet?</label>
            <input
              id="waitlist-purpose"
              name="customPurpose"
              type="text"
              placeholder="Describe what you’d like Cuppet to handle"
              required
              maxLength={160}
            />
          </div>
        )}
      </div>
      <section
        className="waitlist-form-section waitlist-contact"
        aria-labelledby="waitlist-contact-heading"
      >
        <h2 className="waitlist-form-heading" id="waitlist-contact-heading">
          Name and email
        </h2>
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
        <button className="nav-cta waitlist-submit" type="submit" disabled={!useType}>
          Join the waitlist
        </button>
        <p className="waitlist-note">No spam. Just an invite when it&apos;s your turn.</p>
      </section>
    </form>
  );
}
