import React, { useMemo, useState } from "react";
import "./App.css";
import "./index.css";

const brand = {
  yellow: "#F5C400",
  black: "#000000",
  white: "#FFFFFF",
};

const programs = [
  {
    slug: "business-owner",
    name: "Business Owner Training",
    tagline: "Launch and run a profitable electronics repair shop with real systems.",
    shortDesc:
      "A practical 2-month program for people who want to open or improve an electronics repair shop—systems, pricing, workflow, hiring, and marketing.",
    whoItsFor: [
      "Beginners who want to open a repair shop",
      "Owners who want better systems and organization",
      "People switching careers into repair business",
    ],
    outcomes: [
      "Build your shop workflow (intake → repair → QC → delivery)",
      "Set pricing rules and policies that protect profit",
      "Set up parts sourcing + inventory control",
      "Launch marketing and partnerships for consistent leads",
    ],
    curriculum: [
      {
        week: "Week 1 — Repair Business Foundations",
        topics: [
          "Types of repair shops (street, mall, grocery)",
          "Services to offer vs services to avoid",
          "Startup costs & realistic budgeting",
          "Tools & equipment overview",
        ],
      },
      {
        week: "Week 2 — Legal Setup & Documentation",
        topics: [
          "Business registration basics",
          "Insurance & liability overview",
          "Repair waivers & warranties",
          "Customer intake forms",
        ],
      },
      {
        week: "Week 3 — Inventory & Parts Management",
        topics: [
          "Where to buy parts",
          "Quality vs price decisions",
          "Managing defective parts",
          "Stock tracking systems",
        ],
      },
      {
        week: "Week 4 — Pricing & Profit Control",
        topics: [
          "Repair pricing models",
          "Labor vs parts margins",
          "Warranty cost control",
          "Common pricing mistakes",
        ],
      },
      {
        week: "Week 5 — Store Operations & Workflow",
        topics: [
          "Daily opening & closing checklist",
          "Repair flow management",
          "Speed vs quality balance",
          "Reducing mistakes",
        ],
      },
      {
        week: "Week 6 — Employees & Training",
        topics: [
          "Hiring the right people",
          "Training new technicians",
          "Productivity tracking",
          "Employee accountability",
        ],
      },
      {
        week: "Week 7 — Marketing & Partnerships",
        topics: [
          "Local marketing strategies",
          "Google & social platforms",
          "Business partnerships",
          "B2B repair opportunities",
        ],
      },
      {
        week: "Week 8 — Scaling & Graduation",
        topics: ["Platform profile setup", "Final Q&A", "Graduation & certification"],
      },
    ],
  },
  {
    slug: "employee",
    name: "Employee Training Program",
    tagline: "Train employees to work faster, cleaner, and more professionally.",
    shortDesc:
      "1-month employee training focused on organization, pricing confidence, customer service, productivity, and repair workflow—plus 2 months free support.",
    whoItsFor: ["Repair shop employees", "New hires", "Shops needing standardized workflow"],
    outcomes: [
      "Better organized workstations",
      "Confident pricing conversations",
      "Fewer customer conflicts",
      "Improved accountability and productivity",
    ],
    curriculum: [
      {
        week: "Week 1 — Store Setup & Organization",
        topics: [
          "Proper workstation setup",
          "Tool & parts organization",
          "Opening & closing procedures",
          "Daily cleaning standards",
        ],
      },
      {
        week: "Week 2 — Pricing Confidence & Customer Service",
        topics: [
          "Understanding repair pricing",
          "Handling price objections",
          "Warranty explanation",
          "Building customer trust",
        ],
      },
      {
        week: "Week 3 — Problem-Solving & Difficult Customers",
        topics: [
          "Identifying problematic customers",
          "De-escalation techniques",
          "Handling complaints",
          "Protecting business reputation",
        ],
      },
      {
        week: "Week 4 — Productivity, Communication & Repairs",
        topics: [
          "Daily productivity systems",
          "Time management",
          "Communication with managers",
          "Phone, tablet, laptop & smartwatch repairs",
        ],
      },
    ],
  },
  {
    slug: "flipping",
    name: "Flipping Electronics Training",
    tagline: "Buy, test, negotiate, and resell electronics profitably.",
    shortDesc:
      "1-month flipping program showing daily buying, testing, pricing, and selling with live deal breakdowns—plus 2 months free support.",
    whoItsFor: ["Beginners wanting extra income", "Existing flippers", "Anyone wanting a repeatable system"],
    outcomes: ["Buy devices safely", "Avoid scams and locked devices", "Price for maximum profit", "Scale flipping consistently"],
    curriculum: [
      {
        week: "Week 1 — Flipping Fundamentals",
        topics: ["Devices that flip best", "Market demand", "Profit calculation", "Common beginner mistakes"],
      },
      {
        week: "Week 2 — Buying Devices",
        topics: ["Where to find deals", "Local vs online sourcing", "Negotiation techniques", "Red flags"],
      },
      {
        week: "Week 3 — Testing & Grading",
        topics: ["Functional testing checklist", "Cosmetic grading", "iCloud & lock checks", "Repair vs resell decisions"],
      },
      {
        week: "Week 4 — Selling for Profit",
        topics: ["Where to sell", "Listing optimization", "Pricing strategies", "Handling buyers"],
      },
    ],
  },
];

const pricing = {
  "business-owner": 1999,
  employee: 599,
  flipping: 599,
};

const faqs = [
  { q: "Do I need experience to join?", a: "No. Each program is built for beginners with clear, structured steps and rules." },
  { q: "What if I miss a live session?", a: "You can watch the recording and still submit questions for Friday Q&A." },
  { q: "Is Friday Q&A mandatory?", a: "Not mandatory, but it’s where we solve real situations and student questions." },
  { q: "Do I get a certificate?", a: "Yes—certificate of completion is included with every program." },
  { q: "Is flipping risky?", a: "It can be if you don’t follow rules. We teach scam-proof checks + risk buffers." },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-semibold text-black/80">
      {children}
    </span>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
        active ? "border-black bg-black text-[var(--brand-yellow)]" : "border-black/10 bg-white hover:bg-black/5"
      }`}
    >
      {children}
    </button>
  );
}

function Card({ children }) {
  return <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">{children}</div>;
}

function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl bg-[var(--brand-yellow)] px-4 py-2 text-sm font-semibold text-black hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl border border-black/20 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-semibold text-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      {children}
    </button>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen((v) => !v)} className="text-left rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="font-bold">{q}</div>
        <div
          className={`h-8 w-8 rounded-xl grid place-items-center border border-black/10 bg-black/5 text-sm transition ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </div>
      </div>
      {open ? <div className="mt-3 text-sm text-black/70">{a}</div> : null}
    </button>
  );
}

export default function DeviceRaptorsAcademyLivePreview() {
  const [route, setRoute] = useState("home");
  const [selectedProgram, setSelectedProgram] = useState("business-owner");

  const program = useMemo(() => programs.find((p) => p.slug === selectedProgram), [selectedProgram]);
  const price = pricing[selectedProgram];

  return (
    <div
      style={{
        "--brand-yellow": brand.yellow,
      }}
      className="min-h-screen text-black relative"
    >
      <div className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <button onClick={() => setRoute("home")} className="flex items-center gap-2 no-underline">
            <div className="h-9 w-9 rounded-xl bg-black text-[var(--brand-yellow)] grid place-items-center font-black">DR</div>
            <div className="leading-tight text-left">
              <div className="font-extrabold">Device Raptors Academy</div>
              <div className="text-xs text-black/60">Live UI preview</div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-5">
            {[
              ["home", "Home"],
              ["programs", "Programs"],
              ["schedule", "Schedule"],
              ["pricing", "Pricing"],
              ["faq", "FAQ"],
            ].map(([r, label]) => (
              <button
                key={r}
                onClick={() => setRoute(r)}
                className={`text-sm font-semibold no-underline ${route === r ? "text-black" : "text-black/70 hover:text-black"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SecondaryButton onClick={() => setRoute("programs")}>View Programs</SecondaryButton>
            <PrimaryButton onClick={() => setRoute("apply")}>Apply</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        {route === "home" ? (
          <div>
            <div className="py-12 md:py-16">
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
                <div className="relative p-6 md:p-10">
                  <div className="max-w-3xl">
                    <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">
                      Live training 2x/week + Friday Q&A
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
                      Learn Electronics Repair & Make Money With Real-World Training
                    </h1>
                    <p className="mt-4 text-lg text-black/70">
                      Built by a real repair business. Learn repair systems, store operations, and flipping with a format that works even
                      if you’re busy.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      <PrimaryButton onClick={() => setRoute("apply")}>Apply Now</PrimaryButton>
                      <SecondaryButton onClick={() => setRoute("programs")}>View Programs</SecondaryButton>
                      <GhostButton onClick={() => setRoute("pricing")}>See Pricing</GhostButton>
                    </div>

                    <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap gap-2">
                        <Badge>5-Star Repair Business</Badge>
                        <Badge>7+ Years Experience</Badge>
                        <Badge>Real Shop Systems</Badge>
                        <Badge>Live + Recordings</Badge>
                        <Badge>Certificate Included</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <Card>
                      <div className="font-extrabold">Simple weekly format</div>
                      <p className="mt-2 text-sm text-black/70">Two live sessions + Friday Q&A. Recordings included.</p>
                    </Card>
                    <Card>
                      <div className="font-extrabold">Built by Device Raptors</div>
                      <p className="mt-2 text-sm text-black/70">Real systems: intake, pricing, workflow, customer handling.</p>
                    </Card>
                    <Card>
                      <div className="font-extrabold">Designed for results</div>
                      <p className="mt-2 text-sm text-black/70">Templates, scripts, checklists—so you can move faster.</p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-12 border-t border-black/10">
              <div className="max-w-2xl">
                <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">Programs</div>
                <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">Pick the training that fits your goal</h2>
                <p className="mt-2 text-black/70">
                  Three tracks: open your shop, train employees properly, or flip electronics safely for profit.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {programs.map((p) => (
                  <Card key={p.slug}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-extrabold">{p.name}</div>
                        <p className="mt-2 text-sm text-black/70">{p.shortDesc}</p>
                      </div>
                      <div className="h-10 w-10 rounded-xl bg-black text-[var(--brand-yellow)] grid place-items-center font-black">
                        ★
                      </div>
                    </div>

                    <ul className="mt-4 grid gap-2 text-sm text-black/75">
                      {p.outcomes.slice(0, 4).map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-[2px] inline-block h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-2">
                      <PrimaryButton
                        onClick={() => {
                          setSelectedProgram(p.slug);
                          setRoute("programs");
                        }}
                      >
                        Learn More
                      </PrimaryButton>
                      <SecondaryButton onClick={() => setRoute("apply")}>Apply</SecondaryButton>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="py-12">
              <div className="rounded-3xl bg-black p-8 text-white shadow-sm">
                <div className="max-w-2xl">
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">
                    Device Raptors Academy
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">Ready to learn a skill that pays?</h3>
                  <p className="mt-2 text-white/80">Apply now. We’ll help you pick the right program.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <PrimaryButton onClick={() => setRoute("apply")}>Apply Now</PrimaryButton>
                    <SecondaryButton onClick={() => setRoute("programs")}>View Programs</SecondaryButton>
                    <SecondaryButton onClick={() => setRoute("pricing")}>See Pricing</SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {route === "programs" ? (
          <div className="py-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">Programs</div>
                <h2 className="mt-3 text-3xl font-extrabold">{program.name}</h2>
                <p className="mt-2 text-black/70">{program.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <PrimaryButton onClick={() => setRoute("apply")}>Apply Now</PrimaryButton>
                <SecondaryButton onClick={() => setRoute("pricing")}>Pricing</SecondaryButton>
                <GhostButton onClick={() => setRoute("home")}>Back Home</GhostButton>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {programs.map((p) => (
                <Pill key={p.slug} active={p.slug === selectedProgram} onClick={() => setSelectedProgram(p.slug)}>
                  {p.name}
                </Pill>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <div className="text-lg font-extrabold">Who it’s for</div>
                <ul className="mt-4 grid gap-2 text-sm text-black/75">
                  {program.whoItsFor.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <div className="text-lg font-extrabold">Outcomes</div>
                <ul className="mt-4 grid gap-2 text-sm text-black/75">
                  {program.outcomes.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-10">
              <div className="max-w-2xl">
                <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">
                  Curriculum
                </div>
                <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">Curriculum summary</h3>
                <p className="mt-2 text-black/70">A realistic month-long breakdown designed for busy people.</p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {program.curriculum.map((w) => (
                  <Card key={w.week}>
                    <div className="font-extrabold">{w.week}</div>
                    <ul className="mt-3 grid gap-2 text-sm text-black/75">
                      {w.topics.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {route === "schedule" ? (
          <div className="py-12">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">Schedule</div>
              <h2 className="mt-3 text-3xl font-extrabold">Twice a week live + Friday Q&A</h2>
              <p className="mt-2 text-black/70">Join live when you can. Watch recordings when you can’t.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { day: "Tuesday", detail: "Live session (1.5–2 hours)" },
                { day: "Thursday", detail: "Live session (1.5–2 hours)" },
                { day: "Friday", detail: "Live Q&A (recorded)" },
              ].map((s) => (
                <Card key={s.day}>
                  <div className="text-lg font-extrabold">{s.day}</div>
                  <div className="mt-2 text-sm text-black/70">{s.detail}</div>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="font-extrabold">Notes</div>
              <ul className="mt-3 grid gap-2 text-sm text-black/75">
                {[
                  "If you can’t join live, watch recordings and submit questions.",
                  "Friday Q&A is where we solve real student situations.",
                  "Certificate included after completion.",
                ].map((n) => (
                  <li key={n} className="flex gap-2">
                    <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex gap-2">
              <PrimaryButton onClick={() => setRoute("apply")}>Apply Now</PrimaryButton>
              <SecondaryButton onClick={() => setRoute("programs")}>View Programs</SecondaryButton>
            </div>
          </div>
        ) : null}

        {route === "pricing" ? (
          <div className="py-12">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">Pricing</div>
              <h2 className="mt-3 text-3xl font-extrabold">Simple, transparent pricing</h2>
              <p className="mt-2 text-black/70">No tiers. One price per program.</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {programs.map((p) => (
                <div key={p.slug} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                  <div className="text-lg font-extrabold">{p.name}</div>
                  <div className="mt-2 text-3xl font-black">${pricing[p.slug]}</div>
                  <div className="mt-2 text-sm text-black/70">
                    {p.slug === "business-owner" && "2-month live training + ongoing guidance"}
                    {p.slug !== "business-owner" && "1-month training + 2 months free support"}
                  </div>
                  <ul className="mt-4 grid gap-2 text-sm text-black/75">
                    <li>Live sessions twice a week</li>
                    <li>Recordings included</li>
                    <li>Friday Q&A</li>
                    <li>Certificate of completion</li>
                  </ul>
                  <div className="mt-5">
                    <PrimaryButton
                      onClick={() => {
                        setSelectedProgram(p.slug);
                        setRoute("apply");
                      }}
                    >
                      Apply
                    </PrimaryButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {route === "faq" ? (
          <div className="py-12">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">FAQ</div>
              <h2 className="mt-3 text-3xl font-extrabold">Quick answers</h2>
              <p className="mt-2 text-black/70">If you still have questions, apply or message us after.</p>
            </div>

            <div className="mt-8 grid gap-3">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>

            <div className="mt-10 flex gap-2">
              <PrimaryButton onClick={() => setRoute("apply")}>Apply Now</PrimaryButton>
              <SecondaryButton onClick={() => setRoute("programs")}>View Programs</SecondaryButton>
            </div>
          </div>
        ) : null}

        {route === "apply" ? (
          <ApplyPanel selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} onDone={() => setRoute("home")} />
        ) : null}
      </div>

      <div className="mt-16 border-t border-black/10 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-extrabold">Device Raptors Academy</div>
            <p className="mt-2 text-sm text-black/70">Learn repair, store operations, and flipping from a real business.</p>
          </div>
          <div className="text-sm">
            <div className="font-bold">Navigate</div>
            <div className="mt-2 grid gap-1">
              <button className="text-left text-black/70 hover:text-black" onClick={() => setRoute("programs")}>
                Programs
              </button>
              <button className="text-left text-black/70 hover:text-black" onClick={() => setRoute("schedule")}>
                Schedule
              </button>
              <button className="text-left text-black/70 hover:text-black" onClick={() => setRoute("pricing")}>
                Pricing
              </button>
              <button className="text-left text-black/70 hover:text-black" onClick={() => setRoute("faq")}>
                FAQ
              </button>
            </div>
          </div>
          <div className="text-sm">
            <div className="font-bold">Contact</div>
            <div className="mt-2 text-black/70 grid gap-1">
              <div>Email: contact@deviceraptors.com</div>
              <div>Phone: 860-894-0271</div>
              <div className="text-xs text-black/50 mt-2">This is a live UI preview inside ChatGPT canvas.</div>
            </div>
          </div>
        </div>
        <div className="border-t border-black/10 py-5 text-center text-xs text-black/60">© {new Date().getFullYear()} Device Raptors Academy</div>
      </div>
    </div>
  );
}

function ApplyPanel({ selectedProgram, setSelectedProgram, onDone }) {
  const [submitted, setSubmitted] = useState(false);
  const program = programs.find((p) => p.slug === selectedProgram);
  const price = pricing[selectedProgram];

  if (submitted) {
    return (
      <div className="py-12">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="text-2xl font-extrabold">Thanks — application received ✅</div>
          <p className="mt-2 text-black/70">
            We’ll reach out within <b>24–48 hours</b> to confirm your program and schedule preference.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PrimaryButton onClick={onDone}>Back Home</PrimaryButton>
            <SecondaryButton onClick={() => setSubmitted(false)}>Submit another</SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl">
        <div className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-bold text-[var(--brand-yellow)]">Apply</div>
        <h2 className="mt-3 text-3xl font-extrabold">Apply to Device Raptors Academy</h2>
        <p className="mt-2 text-black/70">Fill this out and we’ll contact you with next steps.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {programs.map((p) => (
            <Pill key={p.slug} active={p.slug === selectedProgram} onClick={() => setSelectedProgram(p.slug)}>
              {p.name}
            </Pill>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-black/5 p-4 text-sm text-black/70">
          Selected: <b>{program.name}</b>
        </div>

      <form
        name="academy-application"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={async (e) => {
          e.preventDefault();

          const form = e.target;
          const formData = new FormData(form);

          await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
          });

          setSubmitted(true);
        }}
        >
        <input type="hidden" name="form-name" value="academy-application" />
        <input type="hidden" name="bot-field" />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Full name" name="fullName" placeholder="Your name" />
          <Field label="Email" name="email" type="email" placeholder="you@email.com" />
          <Field label="Phone" name="phone" placeholder="(###) ###-####" />
          <Field label="City/State" name="location" placeholder="Wallingford, CT" />

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-bold">Preferred schedule</label>
            <select name="schedule" className="rounded-xl border border-black/10 px-3 py-2 text-sm">
              <option value="Live">Live</option>
              <option value="Recordings">Recordings</option>
            </select>
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-bold">Goals</label>
            <textarea
              name="goals"
              rows={5}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm"
              placeholder="Tell us your goal and what you want to achieve..."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <PrimaryButton type="submit">Submit Application</PrimaryButton>
          <SecondaryButton type="button" onClick={onDone}>Back</SecondaryButton>
        </div>
      </form>


          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-bold">Goals</label>
            <textarea
              name="goals"
              rows={5}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm"
              placeholder="Tell us your goal and what you want to achieve..."
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <form
            name="academy-application"
            method="POST"
            data-netlify="true"
            onSubmit={async (e) => {
              e.preventDefault();

              const form = e.target;
              const formData = new FormData(form);

              await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
              });

              setSubmitted(true);
            }}
          >
            <input type="hidden" name="form-name" value="academy-application" />

            <PrimaryButton type="submit">
              Submit Application
            </PrimaryButton>

            <SecondaryButton type="button" onClick={onDone}>
              Back
            </SecondaryButton>
          </form>
        </div>


        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Card>
            <div className="font-extrabold">What you get</div>
            <ul className="mt-3 grid gap-2 text-sm text-black/75">
              <li className="flex gap-2">
                <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                <span>Live sessions twice a week</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                <span>Recording access</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                <span>Friday Q&A (recorded)</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                <span>Certificate of completion</span>
              </li>
              {selectedProgram !== "business-owner" ? (
                <li className="flex gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  <span>2 months free support after training</span>
                </li>
              ) : (
                <li className="flex gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--brand-yellow)]" />
                  <span>2-month program (8 weeks)</span>
                </li>
              )}
            </ul>
          </Card>

          <Card>
            <div className="font-extrabold">Program + price</div>
            <p className="mt-2 text-sm text-black/70">
              <b>{program.name}</b>
            </p>
            <div className="mt-2 text-3xl font-black">${price}</div>
            <div className="mt-2 text-xs text-black/60">
              {selectedProgram === "business-owner" ? "2-month training" : "1-month training + 2 months free support"}
            </div>
          </Card>
        </div>
      </div>
  );
}

function Field({ label, placeholder, name, type = "text" }) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-bold">{label}</label>
      <input
        name={name}
        type={type}
        className="rounded-xl border border-black/10 px-3 py-2 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

