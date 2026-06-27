import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Leaf,
  Search,
  MapPin,
  Phone,
  Clock,
  BadgeCheck,
  Recycle,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { FACILITIES, ALL_CITIES, type Facility } from "@/data/facilities";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReCycleHub — Find E-Waste Recycling Centers Near You" },
      {
        name: "description",
        content:
          "Locate certified e-waste recycling facilities across India by city or PIN code. Dispose of electronics responsibly with ReCycleHub.",
      },
      { property: "og:title", content: "ReCycleHub — Find E-Waste Recycling Centers" },
      {
        property: "og:description",
        content:
          "Search certified e-waste recycling centers near you. Drop off laptops, phones, batteries and more — responsibly.",
      },
    ],
  }),
  component: Home,
});

const ALL_ITEMS = Array.from(
  new Set(FACILITIES.flatMap((f) => f.accepts)),
).sort();

function Home() {
  const [query, setQuery] = useState("");
  const [item, setItem] = useState<string>("");
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FACILITIES.filter((f) => {
      if (certifiedOnly && !f.certified) return false;
      if (item && !f.accepts.includes(item)) return false;
      if (!q) return true;
      return (
        f.city.toLowerCase().includes(q) ||
        f.state.toLowerCase().includes(q) ||
        f.pincode.includes(q) ||
        f.name.toLowerCase().includes(q)
      );
    }).sort((a, b) => b.rating - a.rating);
  }, [query, item, certifiedOnly]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero
        query={query}
        setQuery={setQuery}
        onQuickPick={(c) => setQuery(c)}
      />

      <section id="search" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {results.length} facilities found
              {query && <span className="text-muted-foreground"> for "{query}"</span>}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter by what you need to recycle, or show only government-certified centers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="h-10 rounded-lg border border-input bg-card px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Filter by item type"
            >
              <option value="">All item types</option>
              {ALL_ITEMS.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm shadow-sm">
              <input
                type="checkbox"
                checked={certifiedOnly}
                onChange={(e) => setCertifiedOnly(e.target.checked)}
                className="h-4 w-4 accent-[color:var(--leaf)]"
              />
              Certified only
            </label>
          </div>
        </div>

        {results.length === 0 ? (
          <EmptyState query={query} onClear={() => { setQuery(""); setItem(""); setCertifiedOnly(false); }} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((f) => (
              <FacilityCard key={f.id} f={f} />
            ))}
          </div>
        )}
      </section>

      <HowItWorks />
      <Stats />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ReCycleHub</span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#search" className="hover:text-foreground">Find centers</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#impact" className="hover:text-foreground">Impact</a>
        </nav>
        <Button asChild size="sm">
          <a href="#search">
            <Search className="h-4 w-4" /> Locate
          </a>
        </Button>
      </div>
    </header>
  );
}

function Hero({
  query,
  setQuery,
  onQuickPick,
}: {
  query: string;
  setQuery: (s: string) => void;
  onQuickPick: (c: string) => void;
}) {
  const quickCities = ["Bengaluru", "Mumbai", "New Delhi", "Hyderabad", "Chennai", "Pune"];
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-leaf)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--leaf)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--sun)" }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--leaf)]/30 bg-background/70 px-3 py-1 text-xs font-medium text-[color:var(--leaf-deep)] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Responsible disposal, made simple
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Find an <span className="text-[color:var(--leaf-deep)]">e-waste recycling</span> center near you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Search certified facilities by city or 6-digit PIN code. Keep electronics out of landfills — recover the metals, save the planet.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-card p-2 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center"
            onSubmit={(e) => {
              e.preventDefault();
              document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <MapPin className="h-5 w-5 text-[color:var(--leaf)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City or PIN code (e.g. Bengaluru or 560068)"
                className="h-12 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
                inputMode="search"
                aria-label="Search by city or PIN code"
              />
            </div>
            <Button size="lg" type="submit" className="h-12 px-6">
              <Search className="h-4 w-4" /> Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Popular:</span>
            {quickCities.map((c) => (
              <button
                key={c}
                onClick={() => {
                  onQuickPick(c);
                  document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-border bg-background/80 px-3 py-1 text-foreground transition hover:border-[color:var(--leaf)] hover:text-[color:var(--leaf-deep)]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FacilityCard({ f }: { f: Facility }) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${f.name}, ${f.address}, ${f.city}, ${f.pincode}`,
  )}`;
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{f.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {f.city}, {f.state} · <span className="font-mono">{f.pincode}</span>
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[color:var(--leaf-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--leaf-deep)]">
          ★ {f.rating.toFixed(1)}
        </div>
      </div>

      {f.certified && (
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-[color:var(--leaf)]/10 px-2.5 py-1 text-xs font-medium text-[color:var(--leaf-deep)]">
          <BadgeCheck className="h-3.5 w-3.5" /> CPCB Certified
        </span>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2 text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" />
          <span>{f.address}</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" />
          <span>{f.hours}</span>
        </div>
        <div className="flex gap-2 text-muted-foreground">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" />
          <a href={`tel:${f.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
            {f.phone}
          </a>
        </div>
        {f.email && (
          <div className="flex gap-2 text-muted-foreground">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--leaf)]" />
            <a href={`mailto:${f.email}`} className="hover:text-foreground">
              {f.email}
            </a>
          </div>
        )}
      </dl>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Accepts</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {f.accepts.map((a) => (
            <span
              key={a}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      <Button asChild variant="outline" className="mt-5 w-full">
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          Get directions <ArrowRight className="h-4 w-4" />
        </a>
      </Button>
    </article>
  );
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
      <div
        className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No facilities match "{query}"</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try a nearby city, a different PIN code, or one of these:{" "}
        {ALL_CITIES.slice(0, 5).join(", ")}…
      </p>
      <Button onClick={onClear} className="mt-5">Clear filters</Button>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search your area",
      desc: "Enter your city or 6-digit PIN code to see nearby drop-off points.",
    },
    {
      icon: ShieldCheck,
      title: "Pick a certified center",
      desc: "Prefer CPCB-authorized recyclers — your data and the environment stay safe.",
    },
    {
      icon: Recycle,
      title: "Drop it off responsibly",
      desc: "Bring old phones, laptops, batteries and appliances. They'll handle the rest.",
    },
  ];
  return (
    <section id="how" className="border-t border-border/60 bg-[color:var(--leaf-soft)]/40">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Three steps from cluttered drawer to recovered raw materials.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-hero)" }}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Step {i + 1}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { v: FACILITIES.length + "+", l: "Recycling centers listed" },
    { v: ALL_CITIES.length + "", l: "Indian cities covered" },
    { v: "1.6M t", l: "E-waste generated in India / yr" },
    { v: "100%", l: "Free for citizens to use" },
  ];
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-16">
      <div
        className="overflow-hidden rounded-3xl p-8 sm:p-12 text-primary-foreground shadow-[var(--shadow-soft)]"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Small action. Compounding impact.
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              India generates over 1.6 million tonnes of e-waste each year — less than 30% is formally recycled. Choosing the right drop-off point recovers gold, copper and rare earths, and keeps toxins out of soil and water.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {items.map((s) => (
              <div key={s.l} className="rounded-2xl bg-background/10 p-5 backdrop-blur">
                <dt className="text-2xl font-semibold sm:text-3xl">{s.v}</dt>
                <dd className="mt-1 text-sm text-primary-foreground/80">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground"
            style={{ background: "var(--gradient-hero)" }}
          >
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold">ReCycleHub</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built for cleaner cities · Data is illustrative — verify with the facility before dropping off.
        </p>
      </div>
    </footer>
  );
}
