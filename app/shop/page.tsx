import Image from "next/image";

type Badge = { label: string; variant: "green" | "blue" | "gray" };
type Service = {
  title: string;
  priceFrom: number;
  duration: string;
  bullets: string[];
};
type Review = {
  name: string;
  location: string;
  stars: number;
  date: string;
  text: string;
  verified?: boolean;
  photos?: string[];
};

const shop = {
  name: "Precision Auto Detailing",
  city: "Chantilly, VA",
  addressShort: "Chantilly, VA",
  isOpen: true,
  closesAt: "6:00 PM",
  rating: 4.9,
  reviewCount: 128,
  responseTime: "15 minutes",
  badges: [
    { label: "Verified Pro", variant: "green" },
    { label: "Immaculate Reviews", variant: "blue" },
    { label: "Mobile Service", variant: "gray" },
  ] as Badge[],
  highlights: ["Mobile Service", "15 Mile Radius", "Fully Insured", "Eco-Friendly"],
  about:
    "Over 10 years of experience in premium detailing and ceramic coatings. We specialize in paint correction, interior deep cleaning and ceramic coatings to make your car look brand new.",
  serving: ["Fairfax", "Chantilly", "Centreville"],
  gallery: [
    "/detail-foam.jpg",
    "/car-detailing-1.jpg",
    "/shine-shop.webp",
    "/interior-steam.webp",
    "/auto-detailing-2.webp"
  ],
  services: [
    {
      title: "Full Interior Detail",
      priceFrom: 150,
      duration: "2–3 Hours",
      bullets: ["Deep clean seats & carpets", "Dash & trim detail", "Windows cleaned", "Deodorize"],
    },
    {
      title: "Exterior Detail",
      priceFrom: 180,
      duration: "2–3 Hours",
      bullets: ["Hand wash", "Clay bar (as needed)", "Wax/sealant", "Wheel & tire clean"],
    },
    {
      title: "Ceramic Coating",
      priceFrom: 499,
      duration: "5+ Hours",
      bullets: ["Paint prep", "Long-lasting protection", "High gloss finish", "Aftercare tips"],
    },
  ] as Service[],
  reviews: [
    {
      name: "Sarah P.",
      location: "Fairfax, VA",
      stars: 5,
      date: "Jan 2026",
      text: "Amazing job! My car looks brand new!",
      photos: ["/images/rev-1a.jpg", "/images/rev-1b.jpg"],
    },
    {
      name: "Michael T.",
      location: "Chantilly, VA",
      stars: 5,
      date: "Dec 2025",
      text: "Super professional and thorough. Highly recommend!",
      verified: true,
    },
  ] as Review[],
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function BadgePill({ badge }: { badge: Badge }) {
  const styles =
    badge.variant === "green"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : badge.variant === "blue"
      ? "bg-blue-50 text-blue-700 ring-blue-200"
      : "bg-slate-50 text-slate-700 ring-slate-200";

  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1", styles)}>
      <span className="h-2 w-2 rounded-full bg-current opacity-60" />
      {badge.label}
    </span>
  );
}

function Stars({ value }: { value: number }) {
  // Render 5 stars (simple)
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`${value} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("h-4 w-4", i < full ? "text-amber-400" : "text-slate-200")}
          fill="currentColor"
        >
          <path d="M10 15.27l-5.18 2.73 1-5.82L1.64 7.97l5.84-.85L10 1.86l2.52 5.26 5.84.85-4.18 4.21 1 5.82z" />
        </svg>
      ))}
    </div>
  );
}

function IconRowItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-700">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
        <span className="h-3 w-3 rounded-full bg-slate-400" />
      </span>
      <span>{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold text-slate-900">{children}</h2>;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl bg-white shadow-sm ring-1 ring-slate-200", className)}>{children}</div>;
}

function Button({
  children,
  variant = "primary",
  className,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50"
      : "bg-transparent text-slate-700 hover:bg-slate-100";

  return (
    <button type={type} className={cn(base, styles, className)}>
      {children}
    </button>
  );
}

function Input({ placeholder }: { placeholder: string }) {
  return (
    <input
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
      placeholder={placeholder}
    />
  );
}

function Select({ placeholder }: { placeholder: string }) {
  return (
    <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200">
      <option value="">{placeholder}</option>
      {shop.services.map((s) => (
        <option key={s.title} value={s.title}>
          {s.title}
        </option>
      ))}
    </select>
  );
}

export default async function Shop({ params }: { params: Promise<{ slug: string }> }) {
  // In real app: fetch by slug from DB.
  const { slug } = await params;
  void slug;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="px-3 py-2">
              ← Back
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="px-3 py-2">
              ⤴︎
            </Button>
            <Button variant="ghost" className="px-3 py-2">
              ♡
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6">
        {/* Title / Meta */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{shop.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {shop.badges.map((b) => (
              <BadgePill key={b.label} badge={b} />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{shop.rating.toFixed(1)}</span>
              <Stars value={shop.rating} />
              <span className="text-slate-500">({shop.reviewCount} reviews)</span>
            </div>
            <span className="text-slate-300">•</span>
            <span>{shop.city}</span>
            <span className="text-slate-300">•</span>
            <span className={cn("font-medium", shop.isOpen ? "text-emerald-700" : "text-rose-700")}>
              {shop.isOpen ? "Open" : "Closed"}
            </span>
            <span className="text-slate-300">•</span>
            <span>Closes {shop.closesAt}</span>
          </div>
        </div>

        {/* Gallery + CTAs */}
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="overflow-hidden lg:col-span-8">
            <div className="grid gap-2 p-2 md:grid-cols-3">
              <div className="relative col-span-2 h-56 overflow-hidden rounded-xl md:h-72">
                <Image
                  src={shop.gallery[0]}
                  alt="Cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
              <div className="grid gap-2">
                {shop.gallery.slice(1, 4).map((src) => (
                  <div key={src} className="relative h-[86px] overflow-hidden rounded-xl md:h-[96px]">
                    <Image src={src} alt="Gallery" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 pb-4 pt-2">
              <Button variant="secondary" className="w-full md:w-auto">
                View all photos ({shop.gallery.length})
              </Button>
            </div>
          </Card>

          <Card className="lg:col-span-4">
            <div className="p-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                <Button className="w-full">Request Quote</Button>
                <Button variant="secondary" className="w-full">
                  📞 Call
                </Button>
                <Button variant="secondary" className="w-full">
                  💬 Message
                </Button>
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">Typically replies in {shop.responseTime}</p>

              <div className="mt-5 border-t border-slate-200 pt-5">
                <div className="grid gap-3">
                  {shop.highlights.map((h) => (
                    <IconRowItem key={h} label={h} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex gap-6 overflow-x-auto border-b border-slate-200 text-sm font-semibold text-slate-600">
            {["Overview", "Services", "Reviews", "Gallery", "Location"].map((t, idx) => (
              <a
                key={t}
                href={idx === 0 ? "#overview" : `#${t.toLowerCase()}`}
                className={cn(
                  "whitespace-nowrap border-b-2 py-3",
                  idx === 0 ? "border-blue-600 text-blue-700" : "border-transparent hover:text-slate-900"
                )}
              >
                {t}
              </a>
            ))}
          </div>
        </div>

        {/* Overview */}
        <section id="overview" className="mt-6 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-8">
            <div className="p-5">
              <SectionTitle>About</SectionTitle>
              <p className="mt-2 text-sm leading-6 text-slate-700">{shop.about}</p>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Serving:</span>
                  {shop.serving.map((s, i) => (
                    <span key={s} className="text-slate-700">
                      {s}
                      {i < shop.serving.length - 1 ? " · " : ""}
                    </span>
                  ))}
                  <span className="text-slate-300">•</span>
                  <a href="#location" className="font-semibold text-blue-700 hover:underline">
                    Check Zip Code
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-4">
            <div className="p-5">
              <SectionTitle>Quick Request</SectionTitle>
              <form className="mt-4 grid gap-3">
                <Select placeholder="Select service" />
                <Input placeholder="Zip code" />
                <Input placeholder="Preferred date" />
                <Button type="submit">Send Request</Button>
                <p className="text-xs text-slate-500">Your info is only shared with this provider.</p>
              </form>
            </div>
          </Card>
        </section>

        {/* Services */}
        <section id="services" className="mt-8">
          <SectionTitle>Popular Services</SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {shop.services.map((s) => (
              <Card key={s.title}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{s.duration}</p>
                    </div>
                    <p className="text-sm text-slate-600">
                      from <span className="text-lg font-bold text-blue-700">${s.priceFrom}</span>
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="mt-5 w-full">Request Quote</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionTitle>Customer Reviews</SectionTitle>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-slate-900">{shop.rating.toFixed(1)}</div>
              <div>
                <Stars value={shop.rating} />
                <p className="text-sm text-slate-600">{shop.reviewCount} reviews</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4">
            {shop.reviews.map((r, idx) => (
              <Card key={`${r.name}-${idx}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {r.name} <span className="text-slate-400">·</span>{" "}
                        <span className="font-normal text-slate-600">{r.location}</span>
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <Stars value={r.stars} />
                        <span className="text-sm text-slate-500">{r.date}</span>
                        {r.verified && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                            ✓ Verified Service
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700">{r.text}</p>

                  {r.photos?.length ? (
                    <div className="mt-4 flex gap-2">
                      {r.photos.map((src) => (
                        <div key={src} className="relative h-16 w-24 overflow-hidden rounded-xl ring-1 ring-slate-200">
                          <Image src={src} alt="Review photo" fill className="object-cover" sizes="96px" />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Location */}
        <section id="location" className="mt-10">
          <SectionTitle>Location</SectionTitle>
          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-8">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Address:</span> {shop.addressShort}
                  </p>
                  <Button variant="secondary">Get directions</Button>
                </div>

                <div className="mt-4 h-56 rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                  {/* Replace with a real map later */}
                  <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-500">
                    Map Placeholder
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-4">
              <div className="p-5">
                <SectionTitle>Hours</SectionTitle>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {[
                    ["Mon", "9:00 AM – 6:00 PM"],
                    ["Tue", "9:00 AM – 6:00 PM"],
                    ["Wed", "9:00 AM – 6:00 PM"],
                    ["Thu", "9:00 AM – 6:00 PM"],
                    ["Fri", "9:00 AM – 6:00 PM"],
                    ["Sat", "10:00 AM – 4:00 PM"],
                    ["Sun", "Closed"],
                  ].map(([d, h]) => (
                    <div key={d} className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{d}</span>
                      <span className="text-slate-600">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Bottom sticky request bar (mobile-first) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center">
          <div className="grid w-full gap-2 md:grid-cols-3">
            <Select placeholder="Select service" />
            <Input placeholder="Zip code" />
            <Input placeholder="Preferred date" />
          </div>
          <Button className="w-full md:w-auto md:px-8">Send Request</Button>
        </div>
      </div>
    </div>
  );
}
