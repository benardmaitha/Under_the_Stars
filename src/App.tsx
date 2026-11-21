import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";

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

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const media = {
  solSign: asset("brand/sol-sign.jpg"),
  bigBros: asset("brand/big-bros.jpg"),
  solCups: asset("brand/sol-cups.jpg"),
  mvera: asset("brand/mvera.jpg"),
  petras: asset("brand/dj-petras.jpg"),
  // Real photos from the day on the water
  memory: (n: number) => asset(`gallery/memory-${String(n).padStart(2, "0")}.jpg`),
  merch1:
    "https://images.unsplash.com/photo-1732475530155-90158f3b5f79?auto=format&fit=crop&w=1000&q=85",
  merch2:
    "https://images.unsplash.com/photo-1563899981-1c5ba5185ca2?auto=format&fit=crop&w=1000&q=85",
  merch3:
    "https://images.unsplash.com/photo-1669266586576-639523db9306?auto=format&fit=crop&w=1000&q=85",
  merch4:
    "https://images.unsplash.com/photo-1633292750937-120a94f5c2bb?auto=format&fit=crop&w=1000&q=85",
};

const events: EventItem[] = [
  {
    id: "sol-and-beats",
    title: "Sol & Beats",
    date: "28 November · 8PM—6AM",
    venue: "Giriyama Paradise",
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
  { name: "Orbit Heavyweight Tee", price: "KES 3,200", image: media.merch1 },
  { name: "After Hours Hoodie", price: "KES 6,500", image: media.merch2 },
  { name: "Signal Cap", price: "KES 2,200", image: media.merch3 },
  { name: "Night Shift Tote", price: "KES 1,800", image: media.merch4 },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.7" r="1" className="icon-fill" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand">
      <img src={asset("favicon.png")} alt="" className={compact ? "brand-icon small" : "brand-icon"} />
      <span className="brand-text">UNDER THE STARS</span>
    </div>
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
      {children} <Arrow />
    </a>
  );
}

function Marquee() {
  const copy = Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      SOL & BEATS <i>✦</i> KILIFI <i>✦</i> 8PM TILL 6AM <i>✦</i>
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
            <InstagramIcon /> @underthestars.ke
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

      <section className="intro section-pad">
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
            <span className="image-tag">Tap to enter</span>
          </button>
          <div className="event-meta">
            <span className="date-bubble">28 NOV</span>
            <h3>
              GIRİYAMA
              <br />
              <span>PARADISE, KILIFI</span>
            </h3>
            <p>{events[0].description}</p>
            <TicketLink>Get tickets on Haaafla</TicketLink>
          </div>
        </div>
      </section>

      <section className="lineup section-pad">
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
            @UNDER
            <br />
            THESTARS.KE
          </h3>
          <b>↗</b>
        </a>
      </section>

      <section className="manifesto">
        <span className="spark spark-a">✦</span>
        <span className="spark spark-b">✦</span>
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
  const whatsapp =
    "https://wa.me/?text=Hi%20UNDER%20THE%20STARS%2C%20I%20would%20like%20to%20order%20merch.";
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
      />
      <section className="merch-grid section-pad">
        {merchandise.map((item, index) => (
          <article className="product" key={item.name}>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="product-image">
              <img src={item.image} alt={item.name} />
              <span>0{index + 1}</span>
              <b>Order ↗</b>
            </a>
            <div>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          </article>
        ))}
      </section>
      <div className="order-note section-pad">
        <p>Small drops. Once they’re gone, they’re gone.</p>
        <a className="outline-button" href={whatsapp} target="_blank" rel="noreferrer">
          Order on WhatsApp <Arrow />
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
          href="mailto:hello@underthestars.co.ke?subject=Keep%20me%20updated"
        >
          Keep me in the loop <Arrow />
        </a>
      </div>
      <button className="soon-back" onClick={() => navigate("home")}>
        ← Back home
      </button>
    </section>
  );
}

function PageHero({ eyebrow, title, note }: { eyebrow: string; title: ReactNode; note: string }) {
  return (
    <section className="page-hero section-pad">
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
    <footer>
      <div className="footer-top">
        <Brand />
        <h2>
          SEE YOU
          <br />
          <i>UNDER THE STARS.</i>
        </h2>
        <a className="footer-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <InstagramIcon />
          <span>
            Follow
            <br />
            @underthestars.ke
          </span>
        </a>
      </div>
      <div className="footer-nav">
        <div>
          {(["home", "events", "gallery", "team", "merch"] as Page[]).map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item === "merch" ? "Shop" : item}
            </button>
          ))}
        </div>
        <TicketLink>Get Sol & Beats tickets</TicketLink>
      </div>
      <div className="footer-bottom">
        <span>© 2025 UNDER THE STARS</span>
        <span>NAIROBI · KILIFI · KENYA</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}

export default App;
