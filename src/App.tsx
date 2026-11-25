import {
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";

type Page = "home" | "events" | "gallery" | "team" | "merch" | "soon";
type EventItem = {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  price: string;
  image: string;
  description: string;
};

const TICKET_URL = "https://haaafla.com/event/sol-beats-dcb2a9a3";
const INSTAGRAM_URL = "https://www.instagram.com/underthestars.ke?cplk=OWw5Zmw5Z2Uzcjlz";
const EMAIL = "hello@underthestars.co.ke";
// Add your WhatsApp number here in international format, no "+" or spaces (e.g. "254712345678")
const WHATSAPP_NUMBER = "";
const whatsapp = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const MERCH_PRICE = "KES 2,500";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const media = {
  logo: asset("brand/uts-logo.png"),
  solSign: asset("brand/sol-sign.jpg"),
  bigBros: asset("brand/big-bros.jpg"),
  solCups: asset("brand/sol-cups.jpg"),
  mvera: asset("brand/mvera.jpg"),
  petras: asset("brand/dj-petras.jpg"),
  memory: (n: number) => asset(`gallery/memory-${String(n).padStart(2, "0")}.jpg`),
};

const events: EventItem[] = [
  {
    id: "sol-and-beats",
    title: "Sol & Beats",
    date: "28 November · 8PM—6AM",
    venue: "Giryama Paradise",
    city: "Kilifi",
    price: "Tickets on Haaafla",
    image: media.solSign,
    description:
      "Our sun-soaked, bass-heavy escape returns for edition three. One long night in Kilifi, built around good sound, big energy and the people who make it unforgettable.",
  },
];

const gallery = [
  {
    src: media.memory(1),
    category: "Moments",
    alt: "Guest in an Under The Stars tee smiling on board",
    photo: true,
  },
  {
    src: media.solSign,
    category: "Posters",
    alt: "Sol and Beats roadside sign artwork",
    tall: true,
  },
  {
    src: media.memory(2),
    category: "Moments",
    alt: "Guest laughing in sunglasses with a flower in her hair",
    photo: true,
  },
  { src: media.memory(4), category: "Behind the scenes", alt: "Host addressing guests on board", photo: true },
  { src: media.bigBros, category: "Posters", alt: "Big Bros Sol and Beats artist poster" },
  { src: media.memory(3), category: "Moments", alt: "Guest in a yellow jersey smiling at the camera", photo: true },
  { src: media.memory(8), category: "Moments", alt: "Two friends hugging and smiling", photo: true },
  { src: media.mvera, category: "Posters", alt: "Mvera Sol and Beats artist poster", tall: true },
  { src: media.memory(5), category: "Moments", alt: "Guest in a cap checking his phone by the water", photo: true },
  { src: media.memory(6), category: "Moments", alt: "Guest in a red bucket hat flashing a peace sign", photo: true },
  { src: media.petras, category: "Posters", alt: "DJ Petraz Sol and Beats artist poster" },
  { src: media.memory(9), category: "Moments", alt: "Two friends posing together", photo: true },
  { src: media.memory(7), category: "Moments", alt: "Guest in a navy shirt and sunglasses", photo: true },
  { src: media.solCups, category: "Posters", alt: "Sol and Beats red cups artwork", tall: true },
  { src: media.memory(10), category: "Moments", alt: "Guest in a white top and red shorts", photo: true },
  { src: media.memory(13), category: "Behind the scenes", alt: "Pouring drinks for guests on board", photo: true },
  { src: media.memory(11), category: "Moments", alt: "Guest in a yellow tee looking out over the water", photo: true },
  { src: media.memory(12), category: "Moments", alt: "Guest in a yellow tee adjusting his sunglasses", photo: true },
];

const merchandise = [
  { name: "Aurora Edition", tag: "White · Sailboat print", image: asset("merch/aurora.webp") },
  { name: "Eclipse Edition", tag: "Orange · Kanji detail", image: asset("merch/eclipse.webp") },
  { name: "Luna Edition", tag: "White · Back print", image: asset("merch/luna.webp") },
  { name: "Phoenix Edition", tag: "Teal · Logo print", image: asset("merch/phoenix.webp") },
  { name: "Standard Tee", tag: "White · Outline logo", image: asset("merch/standard.webp") },
  { name: "Vega Edition · Burgundy", tag: "Burgundy · Text print", image: asset("merch/vega-burgundy.webp") },
  { name: "Vega Edition · White", tag: "White · Text print", image: asset("merch/vega-white.webp") },
];

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
type IconName = "ticket" | "pin" | "clock" | "calendar" | "mail" | "arrow" | "up";
const iconPaths: Record<IconName, ReactNode> = {
  ticket: (
    <>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2M13 11v2M13 17v2" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  up: <path d="M12 19V5M5 12l7-7 7 7" />,
};

function Arrow() {
  return <Icon name="arrow" />;
}

/* Brand-colour social icons (shared gradient lives in <IconDefs />) */
function IconDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.05" r="1.3">
          <stop offset="0" stopColor="#feda75" />
          <stop offset="0.25" stopColor="#fa7e1e" />
          <stop offset="0.5" stopColor="#d62976" />
          <stop offset="0.75" stopColor="#962fbf" />
          <stop offset="1" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="brand-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6.5" fill="url(#ig-grad)" />
      <rect x="5.2" y="5.2" width="13.6" height="13.6" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="brand-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6.5" fill="#25d366" />
      <path
        d="M12 4.8a7.2 7.2 0 0 0-6.2 10.9L4.9 19.2l3.6-.9A7.2 7.2 0 1 0 12 4.8Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 8.9c.2 2.3 2.4 4.7 4.8 5.2.6-.2 1-.7 1.1-1.3l-1.3-.7-.7.5a3.7 3.7 0 0 1-2.2-2.2l.5-.7-.7-1.3c-.6.1-1.1.5-1.5 1.5Z"
        fill="#fff"
      />
    </svg>
  );
}

/* ---------- Hand-drawn doodles that draw themselves when scrolled into view ---------- */
const P = (d: string) => <path d={d} pathLength={1} />;
const spark = (x: number, y: number, r: number) =>
  P(`M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z`);
const rays = (cx: number, cy: number, n: number, r1: number, a: number, b: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = (i * 2 * Math.PI) / n;
    const r2 = i % 2 ? a : b;
    const f = (v: number) => v.toFixed(1);
    return P(
      `M${f(cx + Math.cos(t) * r1)} ${f(cy + Math.sin(t) * r1)}L${f(cx + Math.cos(t) * r2)} ${f(cy + Math.sin(t) * r2)}`,
    );
  });
const wave = (y: number, n: number) => P(`M0 ${y}q18 -20 37 0${" t37 0".repeat(n)}`);

const doodles: Record<string, { vb: string; shapes: ReactElement[] }> = {
  dhow: {
    vb: "0 0 200 200",
    shapes: [
      P("M22 136 L178 128 C166 156 122 168 82 164 C52 160 32 150 22 136 Z"),
      P("M98 132 L98 26"),
      P("M98 34 C132 60 152 94 170 122 L98 124"),
      P("M94 54 C74 78 58 102 40 124 L94 124"),
      P("M98 26 l16 4 l-16 7"),
      P("M52 146 q16 6 34 4"),
      P("M8 184 q10 -10 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0"),
    ],
  },
  sun: {
    vb: "0 0 200 200",
    shapes: [
      <circle cx="100" cy="100" r="32" pathLength={1} />,
      ...rays(100, 100, 16, 46, 62, 76),
      P("M86 94 q6 -8 13 -2"),
      P("M106 92 q7 -7 13 0"),
      P("M88 110 q12 11 26 0"),
    ],
  },
  star: {
    vb: "0 0 200 200",
    shapes: [spark(100, 100, 78), spark(40, 46, 18), spark(164, 150, 24), P("M160 40 l0.1 0"), P("M34 150 l0.1 0")],
  },
  gulls: {
    vb: "0 0 200 120",
    shapes: [
      P("M16 56 q20 -30 42 0 q20 -30 42 0"),
      P("M118 30 q13 -20 26 0 q13 -20 26 0"),
      P("M138 92 q9 -14 18 0 q9 -14 18 0"),
    ],
  },
  headphones: {
    vb: "0 0 200 200",
    shapes: [
      P("M44 124 C44 48 156 48 156 124"),
      <rect x="28" y="118" width="28" height="54" rx="12" pathLength={1} />,
      <rect x="144" y="118" width="28" height="54" rx="12" pathLength={1} />,
      P("M158 172 C160 198 120 202 100 192"),
      P("M14 130 q-8 14 0 28"),
      P("M186 130 q8 14 0 28"),
    ],
  },
  vinyl: {
    vb: "0 0 200 200",
    shapes: [
      <circle cx="96" cy="108" r="70" pathLength={1} />,
      <circle cx="96" cy="108" r="54" pathLength={1} />,
      <circle cx="96" cy="108" r="24" pathLength={1} />,
      <circle cx="96" cy="108" r="5" pathLength={1} />,
      P("M50 76 A56 56 0 0 1 92 54"),
      P("M146 138 A56 56 0 0 1 106 160"),
      P("M182 20 L154 96 l-6 8"),
    ],
  },
  notes: {
    vb: "0 0 200 200",
    shapes: [
      P("M72 150 V54 L152 38 V134"),
      P("M72 80 L152 64"),
      <ellipse cx="56" cy="152" rx="17" ry="12" transform="rotate(-20 56 152)" pathLength={1} />,
      <ellipse cx="136" cy="136" rx="17" ry="12" transform="rotate(-20 136 136)" pathLength={1} />,
      spark(176, 40, 12),
    ],
  },
  palm: {
    vb: "0 0 200 200",
    shapes: [
      P("M98 190 C92 150 106 112 100 72"),
      P("M100 72 C74 46 44 52 24 80"),
      P("M100 72 C128 42 162 50 182 80"),
      P("M100 72 C88 44 98 22 114 12"),
      P("M100 72 C70 70 52 92 46 118"),
      P("M100 72 C128 70 148 92 154 116"),
      <circle cx="95" cy="82" r="5" pathLength={1} />,
      <circle cx="107" cy="84" r="5" pathLength={1} />,
      P("M58 192 q42 -10 84 0"),
    ],
  },
  camera: {
    vb: "0 0 200 200",
    shapes: [
      <rect x="20" y="64" width="160" height="108" rx="14" pathLength={1} />,
      P("M64 64 l10 -20 h52 l10 20"),
      <circle cx="100" cy="118" r="30" pathLength={1} />,
      <circle cx="100" cy="118" r="15" pathLength={1} />,
      P("M150 80 h14"),
      spark(168, 30, 10),
    ],
  },
  tee: {
    vb: "0 0 200 200",
    shapes: [
      P("M62 36 L16 72 L42 108 L62 94 V176 H138 V94 L158 108 L184 72 L138 36 C128 60 72 60 62 36 Z"),
      spark(100, 118, 18),
      P("M80 150 h40"),
    ],
  },
  waves: {
    vb: "0 0 300 60",
    shapes: [wave(20, 7), wave(46, 7)],
  },
  constellation: {
    vb: "0 0 620 240",
    shapes: [
      P("M40 190 L130 120 L226 164 L318 74 L412 120 L500 46 L586 98"),
      spark(40, 190, 12),
      spark(130, 120, 16),
      spark(226, 164, 11),
      spark(318, 74, 20),
      spark(412, 120, 13),
      spark(500, 46, 17),
      spark(586, 98, 12),
    ],
  },
};

function Doodle({
  name,
  className = "",
  style,
}: {
  name: keyof typeof doodles;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const { vb, shapes } = doodles[name];
  return (
    <svg
      ref={ref}
      viewBox={vb}
      className={`doodle ${seen ? "drawn" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {shapes.map((shape, i) =>
        cloneElement(shape as ReactElement<{ style?: CSSProperties }>, {
          key: i,
          style: { "--k": i } as CSSProperties,
        }),
      )}
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <img
      src={media.logo}
      alt="Under The Stars"
      className={compact ? "brand-logo small" : "brand-logo"}
    />
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}

function TicketLink({ className = "solid-button", children = "Get tickets" }) {
  return (
    <a className={className} href={TICKET_URL} target="_blank" rel="noreferrer">
      <Icon name="ticket" />
      <span>{children}</span>
      <Arrow />
    </a>
  );
}

function Marquee() {
  const copy = Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      SOL & BEATS <i>✦</i> GIRYAMA PARADISE <i>✦</i> KILIFI <i>✦</i> 8PM TILL 6AM <i>✦</i>
    </span>
  ));
  return (
    <div className="marquee" aria-hidden="true">
      <div>{copy}</div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(
        window.scrollY > 640 &&
          window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 260,
      );
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (next: Page) => {
    setPage(next);
    setSelectedEvent(null);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = lightbox !== null || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox, menuOpen]);

  const visibleGallery = useMemo(
    () => gallery.filter((item) => filter === "All" || item.category === filter),
    [filter],
  );

  return (
    <div className="site-shell">
      <IconDefs />
      <header className="header">
        <button className="logo-button" onClick={() => navigate("home")} aria-label="Go home">
          <Brand compact />
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {(["home", "events", "gallery", "team", "merch"] as Page[]).map((item) => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => navigate(item)}
            >
              {item === "merch" ? "shop" : item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="social-icon"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Under The Stars on Instagram"
          >
            <InstagramIcon />
          </a>
          <TicketLink className="mini-ticket">Tickets</TicketLink>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <i />
            <i />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-top">
            <Brand compact />
            <button onClick={() => setMenuOpen(false)}>Close ×</button>
          </div>
          <nav>
            {(["home", "events", "gallery", "team", "merch", "soon"] as Page[]).map(
              (item, index) => (
                <button key={item} onClick={() => navigate(item)}>
                  <small>0{index + 1}</small>
                  {item === "merch" ? "Shop" : item}
                </button>
              ),
            )}
          </nav>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="menu-social">
            <InstagramIcon /> <span>@underthestars.ke</span>
          </a>
        </div>
      )}

      <main>
        {page === "home" && <Home navigate={navigate} openEvent={setSelectedEvent} />}
        {page === "events" && !selectedEvent && <Events openEvent={setSelectedEvent} />}
        {page === "events" && selectedEvent && (
          <EventDetail event={selectedEvent} back={() => setSelectedEvent(null)} />
        )}
        {page === "gallery" && (
          <GalleryPage
            filter={filter}
            setFilter={setFilter}
            items={visibleGallery}
            open={setLightbox}
          />
        )}
        {page === "team" && <TeamPage />}
        {page === "merch" && <MerchPage />}
        {page === "soon" && <ComingSoon navigate={navigate} />}
      </main>

      <Footer navigate={navigate} />

      <a
        className={`float-ticket ${scrolled && !menuOpen && lightbox === null ? "show" : ""}`}
        href={TICKET_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Get Sol and Beats tickets"
      >
        <Icon name="ticket" />
        <span>Get tickets</span>
      </a>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            Close ×
          </button>
          <button
            className="lightbox-arrow prev"
            onClick={() =>
              setLightbox((lightbox - 1 + visibleGallery.length) % visibleGallery.length)
            }
            aria-label="Previous photo"
          >
            ←
          </button>
          <img src={visibleGallery[lightbox].src} alt={visibleGallery[lightbox].alt} />
          <div className="lightbox-caption">
            <span>{visibleGallery[lightbox].category}</span>
            <span>
              {lightbox + 1} / {visibleGallery.length}
            </span>
          </div>
          <button
            className="lightbox-arrow next"
            onClick={() => setLightbox((lightbox + 1) % visibleGallery.length)}
            aria-label="Next photo"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

function Home({
  navigate,
  openEvent,
}: {
  navigate: (page: Page) => void;
  openEvent: (event: EventItem) => void;
}) {
  const moveCollage = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mx",
      `${(event.clientX - rect.left) / rect.width - 0.5}`,
    );
    event.currentTarget.style.setProperty(
      "--my",
      `${(event.clientY - rect.top) / rect.height - 0.5}`,
    );
  };

  return (
    <>
      <section className="hero" onMouseMove={moveCollage}>
        <div className="sun-orb" />
        <Doodle name="gulls" className="d-gulls" />
        <Doodle name="dhow" className="d-boat float" />
        <Doodle name="star" className="d-star-a twinkle" />
        <div className="hero-copy">
          <p className="hero-kicker">KILIFI · EDITION THREE · 8PM—6AM</p>
          <h1>
            SOL <small>&</small>
            <br />
            <span>BEATS</span>
          </h1>
          <p className="hero-note">The coast is calling. We’re taking the night all the way.</p>
          <div className="hero-actions">
            <TicketLink>Get into it</TicketLink>
            <button className="text-button" onClick={() => navigate("gallery")}>
              See the world <Arrow />
            </button>
          </div>
        </div>
        <div className="poster-stack">
          <div className="poster-shadow" />
          <img
            className="hero-poster"
            src={media.solSign}
            alt="Sol and Beats edition three poster"
          />
          <img className="poster-card card-one" src={media.petras} alt="" />
          <img className="poster-card card-two" src={media.mvera} alt="" />
          <span className="sticker sticker-one">
            GOOD MUSIC
            <br />
            NO SLEEP
          </span>
          <span className="sticker sticker-two">03</span>
        </div>
        <button className="scroll-pill" onClick={() => navigate("events")}>
          Explore ↓
        </button>
      </section>
      <Marquee />
      <TicketStrip />

      <section className="intro section-pad">
        <Doodle name="notes" className="d-notes float" />
        <div className="intro-title">
          <SectionLabel>The UTS feeling</SectionLabel>
          <h2>
            NOT JUST AN EVENT.
            <br />
            <i>IT’S A WHOLE MOOD.</i>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="lead">
            UNDER THE STARS makes home-grown experiences where sound, style and real community meet.
          </p>
          <div className="scribble">come as you are!</div>
          <p>
            No copy-and-paste nights. Every edition has its own world, its own artwork and its own
            story. We make it, then we live it with you.
          </p>
          <button className="text-button dark" onClick={() => navigate("team")}>
            Meet the energy <Arrow />
          </button>
        </div>
      </section>

      <section className="featured section-pad">
        <Doodle name="constellation" className="d-constellation" />
        <Doodle name="waves" className="d-waves" />
        <div className="section-heading">
          <div>
            <SectionLabel>Now boarding</SectionLabel>
            <h2>
              ONE NIGHT.
              <br />
              <i>FULL VOLUME.</i>
            </h2>
          </div>
          <span className="edition">
            EDITION
            <br />
            N° 03
          </span>
        </div>
        <div className="featured-layout">
          <button
            className="featured-image"
            onClick={() => {
              navigate("events");
              openEvent(events[0]);
            }}
          >
            <img src={media.solCups} alt="Sol and Beats edition three campaign artwork" />
            <span className="image-tag">View event</span>
          </button>
          <div className="event-meta">
            <span className="date-bubble">28 NOV</span>
            <h3>
              GIRYAMA
              <br />
              <span>PARADISE, KILIFI</span>
            </h3>
            <p>{events[0].description}</p>
            <TicketLink>Get tickets on Haaafla</TicketLink>
          </div>
        </div>
      </section>

      <section className="lineup section-pad">
        <Doodle name="headphones" className="d-headphones float" />
        <Doodle name="vinyl" className="d-vinyl" />
        <div className="lineup-copy">
          <SectionLabel>On the controls</SectionLabel>
          <h2>
            BIG ENERGY.
            <br />
            <i>ZERO FILLER.</i>
          </h2>
          <p>A glimpse into the artists and sounds shaping edition three.</p>
        </div>
        <div className="lineup-cards">
          {[media.bigBros, media.mvera, media.petras].map((image, index) => (
            <button
              key={image}
              onClick={() => navigate("gallery")}
              style={{ "--i": index } as React.CSSProperties}
            >
              <img
                src={image}
                alt={
                  ["Big Bros artist artwork", "Mvera artist artwork", "DJ Petraz artist artwork"][
                    index
                  ]
                }
              />
            </button>
          ))}
        </div>
      </section>

      <section className="portal-grid">
        <button onClick={() => navigate("gallery")} className="portal gallery-portal">
          <img src={media.memory(1)} alt="" style={{ objectPosition: "center 30%" }} />
          <span>Go inside</span>
          <h3>
            THE
            <br />
            MEMORIES
          </h3>
          <b>↗</b>
        </button>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="portal social-portal">
          <div className="giant-icon">
            <InstagramIcon />
          </div>
          <span>Follow the motion</span>
          <h3>
            @UNDERTHESTARS<em>.KE</em>
          </h3>
          <p className="portal-note">Behind the scenes, drops and the next lineup first.</p>
          <b>↗</b>
        </a>
      </section>

      <section className="manifesto">
        <Doodle name="constellation" className="d-sky" />
        <Doodle name="star" className="d-star-b twinkle" />
        <p>THE NIGHT IS OUR PLAYGROUND</p>
        <h2>
          COME FOR THE MUSIC.
          <br />
          STAY FOR THE <i>STORY.</i>
        </h2>
        <button className="outline-button" onClick={() => navigate("soon")}>
          See what’s next <Arrow />
        </button>
      </section>
    </>
  );
}

function Events({ openEvent }: { openEvent: (event: EventItem) => void }) {
  return (
    <div className="page">
      <PageHero
        eyebrow="The next one"
        title={
          <>
            SOL &<br />
            <i>BEATS 03</i>
          </>
        }
        note="Kilifi. Sunset to sunrise."
        doodle="sun"
      />
      <section className="event-feature section-pad">
        <button className="event-poster" onClick={() => openEvent(events[0])}>
          <img src={events[0].image} alt="Sol and Beats event artwork" />
          <span>View details ↗</span>
        </button>
        <div className="event-info">
          <span>{events[0].date}</span>
          <h2>{events[0].title}</h2>
          <p>
            {events[0].venue}, {events[0].city}
          </p>
          <p className="event-description">{events[0].description}</p>
          <TicketLink>Book on Haaafla</TicketLink>
        </div>
      </section>
      <Marquee />
    </div>
  );
}

function EventDetail({ event, back }: { event: EventItem; back: () => void }) {
  return (
    <div className="event-detail">
      <button className="back-button" onClick={back}>
        ← All events
      </button>
      <div className="detail-image">
        <img src={event.image} alt={`${event.title} artwork`} />
      </div>
      <div className="detail-copy">
        <SectionLabel>{event.date}</SectionLabel>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>
              {event.venue}, {event.city}
            </dd>
          </div>
          <div>
            <dt>Doors</dt>
            <dd>8:00 PM — 6:00 AM</dd>
          </div>
          <div>
            <dt>Tickets</dt>
            <dd>{event.price}</dd>
          </div>
          <div>
            <dt>Energy</dt>
            <dd>All the way up</dd>
          </div>
        </dl>
        <TicketLink>Get tickets on Haaafla</TicketLink>
        <small>Secure external checkout via Haaafla.</small>
      </div>
    </div>
  );
}

function GalleryPage({
  filter,
  setFilter,
  items,
  open,
}: {
  filter: string;
  setFilter: (x: string) => void;
  items: typeof gallery;
  open: (x: number) => void;
}) {
  const categories = ["All", "Posters", "Moments", "Behind the scenes"];
  return (
    <div className="page">
      <PageHero
        eyebrow="The archive"
        title={
          <>
            LOUD IMAGES.
            <br />
            <i>REAL MOMENTS.</i>
          </>
        }
        note="Tap anything. Take it all in."
        doodle="camera"
      />
      <div className="filter-bar section-pad">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <section className="gallery-grid section-pad">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            className={item.photo ? "gallery-item photo" : item.tall ? "gallery-item tall" : "gallery-item"}
            onClick={() => open(index)}
          >
            <img src={item.src} alt={item.alt} />
            <span>{item.category}</span>
            <b>Open ↗</b>
          </button>
        ))}
      </section>
    </div>
  );
}

function TeamPage() {
  const crews = [
    {
      number: "01",
      title: "THE CURATORS",
      text: "We choose the sounds, the spaces and the details that make each edition feel completely its own.",
    },
    {
      number: "02",
      title: "THE MAKERS",
      text: "Our visual crew turns each night into a world—from the first poster to the last light.",
    },
    {
      number: "03",
      title: "THE MOVERS",
      text: "Promoters and hosts who bring the right people together, not just the biggest crowd.",
    },
  ];
  return (
    <div className="page">
      <PageHero
        eyebrow="Behind UTS"
        title={
          <>
            MADE BY
            <br />
            <i>REAL PEOPLE.</i>
          </>
        }
        note="One crew. Many moving parts."
        doodle="star"
      />
      <section className="crew-grid section-pad">
        {crews.map((crew) => (
          <article key={crew.number}>
            <span>{crew.number}</span>
            <h2>{crew.title}</h2>
            <p>{crew.text}</p>
          </article>
        ))}
      </section>
      <section className="team-collage section-pad">
        <img src={media.memory(4)} alt="Under The Stars host speaking to guests on board" style={{ objectPosition: "center 35%" }} />
        <div>
          <SectionLabel>All together now</SectionLabel>
          <p>
            Promoters, selectors, designers and storytellers, all obsessed with how a night{" "}
            <i>feels.</i>
          </p>
        </div>
      </section>
    </div>
  );
}

function MerchPage() {
  return (
    <div className="page">
      <PageHero
        eyebrow="Limited runs"
        title={
          <>
            WEAR THE
            <br />
            <i>ENERGY.</i>
          </>
        }
        note="Made for after dark and the day after."
        doodle="tee"
      />
      <section className="merch-grid section-pad">
        {merchandise.map((item, index) => (
          <article className="product" key={item.name}>
            <a
              href={whatsapp(`Hi UNDER THE STARS, I would like to order the ${item.name} (${MERCH_PRICE}).`)}
              target="_blank"
              rel="noreferrer"
              className="product-image"
              aria-label={`Order ${item.name} on WhatsApp`}
            >
              <img src={item.image} alt={`${item.name} t-shirt`} loading="lazy" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </a>
            <div className="product-info">
              <div>
                <h3>{item.name}</h3>
                <small>{item.tag}</small>
              </div>
              <p>{MERCH_PRICE}</p>
            </div>
            <a
              className="order-link"
              href={whatsapp(`Hi UNDER THE STARS, I would like to order the ${item.name} (${MERCH_PRICE}).`)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>Order on WhatsApp</span>
            </a>
          </article>
        ))}
      </section>
      <div className="order-note section-pad">
        <p>Small drops. Once they’re gone, they’re gone.</p>
        <a className="outline-button" href={whatsapp("Hi UNDER THE STARS, I would like to order merch.")} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          <span>Ask about sizes</span>
        </a>
      </div>
    </div>
  );
}

function ComingSoon({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <section className="coming-soon">
      <div className="soon-poster">
        <img src={media.petras} alt="" />
        <img src={media.mvera} alt="" />
        <img src={media.bigBros} alt="" />
      </div>
      <div className="soon-content">
        <Brand />
        <SectionLabel>Beyond the events</SectionLabel>
        <h1>
          A BIGGER
          <br />
          <i>WORLD</i>
          <br />
          IS LOADING.
        </h1>
        <p>Stories, early access, drops and more ways to live under the stars.</p>
        <a
          className="solid-button"
          href={`mailto:${EMAIL}?subject=Keep%20me%20updated`}
        >
          <Icon name="mail" />
          <span>Keep me in the loop</span>
          <Arrow />
        </a>
      </div>
      <button className="soon-back" onClick={() => navigate("home")}>
        ← Back home
      </button>
    </section>
  );
}

function PageHero({
  eyebrow,
  title,
  note,
  doodle,
}: {
  eyebrow: string;
  title: ReactNode;
  note: string;
  doodle: keyof typeof doodles;
}) {
  return (
    <section className="page-hero section-pad">
      <Doodle name={doodle} className="d-page float" />
      <SectionLabel>{eyebrow}</SectionLabel>
      <div>
        <h1>{title}</h1>
        <p>{note}</p>
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <button className="footer-brand" onClick={() => navigate("home")} aria-label="Go home">
          <Brand compact />
          <span>
            Home-grown music, culture
            <br />
            and nightlife in Kenya.
          </span>
        </button>
        <nav className="footer-links" aria-label="Footer">
          {(["home", "events", "gallery", "team", "merch"] as Page[]).map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item === "merch" ? "Shop" : item}
            </button>
          ))}
        </nav>
        <div className="footer-actions">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
            <InstagramIcon />
          </a>
          <a href={whatsapp("Hi UNDER THE STARS!")} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
            <WhatsAppIcon />
          </a>
          <a className="mail-chip" href={`mailto:${EMAIL}`} aria-label="Email" title="Email">
            <Icon name="mail" />
          </a>
          <TicketLink className="mini-ticket">Tickets</TicketLink>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="credit">
          <span>© {new Date().getFullYear()} UNDER THE STARS</span>
          <b>BY APREIS TECHIES</b>
        </div>
        <span className="where">NAIROBI · KILIFI · KENYA</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <Icon name="up" />
        </button>
      </div>
    </footer>
  );
}

function TicketStrip() {
  return (
    <section className="ticket-strip section-pad" aria-label="Tickets">
      <div className="ticket-card">
        <div className="ticket-date">
          <small>SAT</small>
          <b>28</b>
          <span>NOV</span>
        </div>
        <div className="ticket-body">
          <span className="ticket-kicker">Edition three</span>
          <h2>Sol &amp; Beats</h2>
          <ul>
            <li>
              <Icon name="clock" /> 8PM — 6AM
            </li>
            <li>
              <Icon name="pin" /> Giryama Paradise, Kilifi
            </li>
          </ul>
        </div>
        <TicketLink className="solid-button ticket-cta">Get tickets</TicketLink>
      </div>
    </section>
  );
}

export default App;
