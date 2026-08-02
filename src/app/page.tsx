"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Gift = {
  id: number;
  categoria: string;
  item: string;
  cantidad_sugerida: number;
  cantidad_reservada: number;
  prioridad: string | null;
  estado: string;
  notas: string | null;
  etapa_recomendada: string | null;
  enlaces: unknown;
  precio_aproximado: string | null;
  imagen_url?: string | null;
  visible_web?: boolean;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

const categories = [
  { name: "Todas", icon: "🎁" },
  { name: "Higiene de Bebe", label: "Higiene del bebé", icon: "🛁" },
  { name: "Alimentación y lactancia", icon: "🍼" },
  { name: "Sueño y habitación", icon: "🌙" },
  { name: "Ropa bebe", label: "Ropa de bebé", icon: "👕" },
  { name: "Paseo y transporte", icon: "🚗" },
  { name: "Juego y estimulación", icon: "🧸" },
];

const deliveryAddress = [
  "Mari y Rober",
  "Los Lobos 741, Departamento 148",
  "Garín, Escobar",
  "Código Postal 1619",
  "Provincia de Buenos Aires",
].join("\n");

const eventDate = new Date("2026-09-12T13:00:00-03:00");

function getCountdown() {
  const difference = Math.max(0, eventDate.getTime() - Date.now());
  return {
    finished: difference === 0,
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

function cleanLinks(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}

function displayPrice(value: string | null) {
  if (!value) return "Precio a consultar";
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(numeric);
  }
  return value.includes("$") ? value : `$ ${value}`;
}

function priceValue(value: string | null) {
  if (!value) return null;
  const values = value
    .match(/[\d.]+/g)
    ?.map((item) => Number(item.replaceAll(".", "")))
    .filter((item) => Number.isFinite(item));
  return values?.length ? Math.min(...values) : null;
}

const priceFilters = [
  { label: "Todos los precios", value: "all" },
  { label: "Hasta $25.000", value: "0-25000" },
  { label: "$25.000 a $50.000", value: "25000-50000" },
  { label: "$50.000 a $100.000", value: "50000-100000" },
  { label: "$100.000 a $200.000", value: "100000-200000" },
  { label: "Más de $200.000", value: "200000-max" },
  { label: "Sin precio informado", value: "unknown" },
];

export default function Home() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [reserveGift, setReserveGift] = useState<Gift | null>(null);
  const [buyGift, setBuyGift] = useState<Gift | null>(null);
  const [transferGift, setTransferGift] = useState<Gift | null>(null);
  const [notice, setNotice] = useState("");
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown> | null>(null);

  async function loadGifts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("regalos")
      .select("*")
      .eq("visible_web", true)
      .order("categoria")
      .order("prioridad")
      .order("item");

    if (error) setNotice("No pudimos cargar los regalos. Intentá nuevamente.");
    else setGifts((data ?? []) as Gift[]);
    setLoading(false);
  }

  useEffect(() => {
    void loadGifts();
  }, []);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1_000);
    return () => window.clearInterval(timer);
  }, []);

  const filteredGifts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("es");
    return gifts.filter((gift) => {
      const matchesCategory = category === "Todas" || gift.categoria === category;
      const matchesSearch = !term || `${gift.item} ${gift.categoria}`.toLocaleLowerCase("es").includes(term);
      const price = priceValue(gift.precio_aproximado);
      let matchesPrice = true;
      if (priceFilter === "unknown") matchesPrice = price === null;
      else if (priceFilter !== "all") {
        const [minimum, maximum] = priceFilter.split("-");
        const min = Number(minimum);
        matchesPrice = price !== null && price >= min && (maximum === "max" || price <= Number(maximum));
      }
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [category, gifts, priceFilter, search]);

  return (
    <main className="min-h-screen bg-[#fbf8f3] text-[#4b4742]">
      <header className="sticky top-0 z-40 border-b border-[#ddd6cc]/80 bg-[#fbf8f3]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#inicio" className="font-serif text-xl tracking-wide text-[#66705e]">Francesca</a>
          <nav className="hidden gap-7 text-sm md:flex">
            <a href="#evento" className="hover:text-[#a67379]">El evento</a>
            <a href="#regalos" className="hover:text-[#a67379]">Regalos</a>
            <a href="#como-funciona" className="hover:text-[#a67379]">Cómo funciona</a>
          </nav>
          <button onClick={() => setRsvpOpen(true)} className="rounded-full bg-[#75806b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#626d59]">
            Confirmar asistencia
          </button>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden px-5 py-20 text-center md:py-28">
        <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-[#ecdcd8]/70 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#dce4d5]/80 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[#a67379]">12 · 09 · 2026</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-[#596452] md:text-7xl">Baby Shower <span className="block italic text-[#a67379]">Francesca</span></h1>
          {countdown && (
            countdown.finished ? (
              <p className="mx-auto mt-8 max-w-xl rounded-full bg-[#dfe5d9] px-6 py-4 font-serif text-2xl text-[#596452]">¡Llegó el gran día! 🎀</p>
            ) : (
              <div className="mx-auto mt-9 max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8f686d]">Faltan</p>
                <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-4">
                  {[[countdown.days, "Días"], [countdown.hours, "Horas"], [countdown.minutes, "Minutos"], [countdown.seconds, "Segundos"]].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-[#ddd4ca] bg-white/75 px-2 py-4 shadow-sm sm:px-4">
                      <span className="block font-serif text-2xl text-[#596452] sm:text-4xl">{String(value).padStart(2, "0")}</span>
                      <span className="mt-1 block text-[10px] uppercase tracking-wider text-[#8b8179] sm:text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#6f6963]">
            Si recibiste la invitación, es porque queremos que estés con nosotros compartiendo la llegada de Francesca el día 12 de septiembre de 2026.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-[#6f6963]">Ese día estaremos cumpliendo 33 semanas y queremos celebrarlo.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <button onClick={() => setRsvpOpen(true)} className="rounded-full bg-[#75806b] px-8 py-4 font-medium text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#626d59]">Confirmar asistencia</button>
            <a href="https://maps.app.goo.gl/KY65XNfS6VzWKS7E9" target="_blank" rel="noreferrer" className="rounded-full border border-[#bdb3a8] bg-white/60 px-8 py-4 font-medium hover:bg-white">Cómo llegar</a>
          </div>
          <p className="mt-6 text-sm text-[#8f686d]">Te pedimos que confirmes tu asistencia antes del 26 de agosto de 2026.</p>
        </div>
      </section>

      <section id="evento" className="px-5 pb-20">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#dfd8cf] bg-white shadow-sm md:grid-cols-2">
          <div className="bg-[#dfe5d9] p-9 md:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b676c]">Cuándo</p>
            <p className="mt-4 font-serif text-3xl text-[#596452]">Sábado 12 de septiembre</p>
            <p className="mt-2 text-lg">13:00 hs</p>
          </div>
          <div className="p-9 md:p-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b676c]">Dónde</p>
            <p className="mt-4 font-serif text-3xl text-[#596452]">SUM de Decs Tortugas</p>
            <p className="mt-2 leading-7 text-[#706a64]">Los Lobos 741, B1619 Garín, Provincia de Buenos Aires.</p>
            <a href="https://maps.app.goo.gl/KY65XNfS6VzWKS7E9" target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-medium text-[#986c72]">Abrir en Google Maps →</a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e4ddd4] bg-white/70 px-5 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="text-5xl">🎀</span>
          <h2 className="mt-6 font-serif text-4xl text-[#596452]">Gracias por acompañarnos</h2>
          <p className="mt-5 text-lg leading-8 text-[#706a64]">Gracias por acompañarnos en este momento tan especial. Armamos esta lista con mucho cariño para prepararnos para su llegada.</p>
          <a href="#regalos" className="mt-8 inline-block rounded-full bg-[#a67379] px-8 py-4 font-medium text-white hover:bg-[#936168]">Ver regalos</a>
        </div>
      </section>

      <section id="regalos" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#a67379]">Wishlist</p>
            <h2 className="mt-4 font-serif text-4xl text-[#596452] md:text-5xl">Elegí un regalo para Francesca</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#706a64]">Podés reservarlo para llevarlo al baby shower, comprarlo y enviarlo directamente a casa de Mari y Rober o transferirles el valor para que lo compren.</p>
          </div>

          <div id="como-funciona" className="mx-auto mt-12 max-w-5xl rounded-[2rem] bg-[#dfe5d9] px-6 py-10 text-center md:px-10">
            <h3 className="font-serif text-3xl text-[#596452]">¿Cómo funciona?</h3>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[["01", "Elegí", "Recorré las categorías y encontrá el regalo que más te guste."], ["02", "Reservá", "Completá tus datos e indicá si es individual o grupal."], ["03", "Entregá", "Llevalo al baby shower, envialo a casa o transferí su valor."]].map(([number, title, text]) => (
                <div key={number}><span className="font-serif text-3xl text-[#a67379]">{number}</span><h4 className="mt-3 font-serif text-xl text-[#596452]">{title}</h4><p className="mt-2 text-sm leading-6 text-[#6c6862]">{text}</p></div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((item) => (
              <button key={item.name} onClick={() => setCategory(item.name)} className={`rounded-full border px-4 py-2.5 text-sm transition ${category === item.name ? "border-[#75806b] bg-[#75806b] text-white" : "border-[#d8d0c6] bg-white hover:border-[#a9a095]"}`}>
                <span className="mr-2">{item.icon}</span>{item.label ?? item.name}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-7 grid max-w-3xl gap-3 sm:grid-cols-2">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar un regalo…" className="w-full rounded-full border border-[#d8d0c6] bg-white px-6 py-3.5 outline-none focus:border-[#75806b]" />
            <select value={priceFilter} onChange={(event) => setPriceFilter(event.target.value)} className="w-full rounded-full border border-[#d8d0c6] bg-white px-6 py-3.5 outline-none focus:border-[#75806b]">
              {priceFilters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
            </select>
          </div>

          {notice && <p className="mx-auto mt-6 max-w-xl rounded-2xl bg-[#f5e6e6] p-4 text-center text-sm text-[#8b4f55]">{notice}</p>}

          {loading ? (
            <p className="py-20 text-center text-[#77716b]">Cargando regalos…</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGifts.map((gift) => {
                const available = gift.cantidad_sugerida - gift.cantidad_reservada;
                const links = cleanLinks(gift.enlaces);
                return (
                  <article key={gift.id} className="flex flex-col overflow-hidden rounded-3xl border border-[#e0d9d0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    {gift.imagen_url ? (
                      <img src={gift.imagen_url} alt={gift.item} className="h-52 w-full bg-white object-contain p-3" />
                    ) : (
                      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#eee4df] to-[#e4eadf] text-5xl">{categories.find((item) => item.name === gift.categoria)?.icon ?? "🎁"}</div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs uppercase tracking-wider text-[#a67379]">{gift.categoria}</p>
                      <h3 className="mt-2 font-serif text-2xl text-[#596452]">{gift.item}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#756f69]">{gift.notas || gift.etapa_recomendada || "Elegido especialmente para Francesca."}</p>
                      {gift.etapa_recomendada && gift.notas && <p className="mt-2 text-xs text-[#918981]">Etapa: {gift.etapa_recomendada}</p>}
                      {links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {links.map((link, index) => link.startsWith("http") ? (
                            <a key={link} href={link} target="_blank" rel="noreferrer" className="rounded-full border border-[#d9bfc0] bg-[#f4ece8] px-4 py-2 text-sm font-semibold text-[#8e6268] shadow-sm transition hover:border-[#a67379] hover:bg-[#eadbd7]">
                              {links.length > 1 ? `Ver opción ${index + 1}` : "Ver referencia"}
                            </a>
                          ) : <span key={link} className="rounded-full bg-[#f0eee9] px-3 py-1.5 text-xs text-[#706a64]">Referencia: {link}</span>)}
                        </div>
                      )}
                      <div className="mt-auto pt-5">
                        <p className="font-medium text-[#596452]">{displayPrice(gift.precio_aproximado)}</p>
                        <p className={`mt-2 text-sm font-medium ${available > 0 ? "text-[#667a5d]" : "text-[#a45e66]"}`}>
                          {available === 0
                            ? "RESERVADO"
                            : gift.cantidad_sugerida > 1 && gift.cantidad_reservada > 0
                              ? `Ya se reservaron ${gift.cantidad_reservada} y quedan ${available} pendientes.`
                              : `${available} ${available === 1 ? "unidad disponible" : "unidades disponibles"}`}
                        </p>
                        <div className="mt-5 grid gap-2">
                          <button disabled={available === 0} onClick={() => setReserveGift(gift)} className="rounded-full bg-[#75806b] px-5 py-3 text-sm font-medium text-white hover:bg-[#626d59] disabled:cursor-not-allowed disabled:bg-[#b9b8b5]">Reservar</button>
                          {links.length > 0 && links.some((link) => link.startsWith("http")) && (
                            <button onClick={() => setBuyGift(gift)} className="rounded-full border border-[#a67379] px-5 py-3 text-sm font-medium text-[#8e6268] hover:bg-[#fbf0f1]">Comprar y enviar a casa</button>
                          )}
                          <button disabled={available === 0} onClick={() => setTransferGift(gift)} className="rounded-full border border-[#75806b] px-5 py-3 text-sm font-medium text-[#596452] hover:bg-[#eef2eb] disabled:cursor-not-allowed disabled:border-[#c6c4c0] disabled:text-[#aaa7a2]">
                            Enviar el valor para que lo compren
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          {!loading && filteredGifts.length === 0 && <p className="py-16 text-center">No encontramos regalos con esos filtros.</p>}
        </div>
      </section>

      <footer className="bg-[#596452] px-5 py-12 text-center text-white"><p className="font-serif text-3xl italic">Francesca</p><p className="mt-3 text-sm text-white/70">Gracias por compartir este momento con nosotros.</p></footer>

      {rsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      {reserveGift && <ReserveModal gift={reserveGift} onClose={() => setReserveGift(null)} onSuccess={async () => { setReserveGift(null); await loadGifts(); }} />}
      {buyGift && <BuyModal gift={buyGift} onClose={() => setBuyGift(null)} />}
      {transferGift && <TransferModal gift={transferGift} onClose={() => setTransferGift(null)} onSuccess={async () => { setTransferGift(null); await loadGifts(); }} />}
    </main>
  );
}

function ModalShell({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-[#fbf8f3] p-6 shadow-2xl md:p-8">
        <div className="flex justify-end"><button onClick={onClose} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl">×</button></div>
        {children}
      </div>
    </div>
  );
}

function RsvpModal({ onClose }: { onClose: () => void }) {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [attending, setAttending] = useState(true);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setError("");
    const form = new FormData(event.currentTarget);
    const { error: submitError } = await supabase.from("confirmaciones").insert({
      nombre_apellido: form.get("nombre"),
      asiste: attending,
      cantidad_asistentes: attending ? Number(form.get("cantidad")) : 0,
      restricciones_alimentarias: form.get("restricciones") || null,
      mensaje: form.get("mensaje") || null,
    });
    if (submitError) setError("No pudimos guardar tu respuesta. Intentá nuevamente."); else setSuccess(true);
    setSending(false);
  }

  return <ModalShell onClose={onClose}>{success ? <div className="pb-8 text-center"><span className="text-6xl">💌</span><h2 className="mt-5 font-serif text-3xl text-[#596452]">¡Gracias por responder!</h2><p className="mt-3 text-[#706a64]">Guardamos correctamente tu confirmación.</p><button onClick={onClose} className="mt-7 rounded-full bg-[#75806b] px-7 py-3 text-white">Cerrar</button></div> : <><p className="text-xs uppercase tracking-[0.3em] text-[#a67379]">RSVP</p><h2 className="mt-3 font-serif text-3xl text-[#596452]">Confirmar asistencia</h2><p className="mt-3 text-sm text-[#706a64]">Por favor, respondé antes del 26 de agosto de 2026.</p><form onSubmit={submit} className="mt-7 space-y-5"><Field label="Nombre y apellido"><input name="nombre" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="¿Vas a acompañarnos?"><div className="grid grid-cols-2 gap-3"><Choice active={attending} onClick={() => setAttending(true)}>Sí, voy</Choice><Choice active={!attending} onClick={() => setAttending(false)}>No podré ir</Choice></div></Field>{attending && <><Field label="Cantidad total de asistentes"><input name="cantidad" type="number" min="1" max="10" defaultValue="1" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="Restricciones alimentarias"><textarea name="restricciones" rows={2} className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" placeholder="Opcional" /></Field></>}<Field label="Mensaje"><textarea name="mensaje" rows={3} className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" placeholder="Opcional" /></Field>{error && <p className="text-sm text-[#a04f58]">{error}</p>}<button disabled={sending} className="w-full rounded-full bg-[#75806b] px-6 py-3.5 font-medium text-white disabled:opacity-60">{sending ? "Guardando…" : "Enviar confirmación"}</button></form></>}</ModalShell>;
}

function ReserveModal({ gift, onClose, onSuccess }: { gift: Gift; onClose: () => void; onSuccess: () => Promise<void> }) {
  const available = gift.cantidad_sugerida - gift.cantidad_reservada;
  const [group, setGroup] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setError("");
    const form = new FormData(event.currentTarget);
    const { error: submitError } = await supabase.rpc("reservar_regalo", {
      p_regalo_id: gift.id,
      p_nombre_responsable: form.get("nombre"),
      p_contacto: form.get("contacto"),
      p_cantidad: Number(form.get("cantidad")),
      p_modalidad_entrega: form.get("entrega"),
      p_es_grupal: group,
      p_participantes: group ? form.get("participantes") : null,
      p_mensaje: form.get("mensaje") || null,
    });
    if (submitError) setError(submitError.message.includes("suficientes") ? "Ya no quedan suficientes unidades disponibles." : "No pudimos guardar la reserva. Intentá nuevamente."); else setSuccess(true);
    setSending(false);
  }

  return <ModalShell onClose={onClose}>{success ? <div className="pb-8 text-center"><span className="text-6xl">🎁</span><h2 className="mt-5 font-serif text-3xl text-[#596452]">¡Regalo reservado!</h2><p className="mt-3 text-[#706a64]">Gracias por elegir un regalo para Francesca.</p><button onClick={() => void onSuccess()} className="mt-7 rounded-full bg-[#75806b] px-7 py-3 text-white">Finalizar</button></div> : <><p className="text-xs uppercase tracking-[0.3em] text-[#a67379]">Reservar regalo</p><h2 className="mt-3 font-serif text-3xl text-[#596452]">{gift.item}</h2><p className="mt-2 text-sm text-[#706a64]">Quedan {available} unidades disponibles.</p><form onSubmit={submit} className="mt-7 space-y-5"><Field label="Nombre y apellido"><input name="nombre" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="WhatsApp o correo"><input name="contacto" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="Cantidad"><input name="cantidad" type="number" min="1" max={available} defaultValue="1" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="Modalidad de entrega"><select name="entrega" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]"><option value="baby_shower">Lo llevo al baby shower</option><option value="domicilio">Lo envío a casa de Mari y Rober</option></select></Field><Field label="¿Es un regalo grupal?"><div className="grid grid-cols-2 gap-3"><Choice active={group} onClick={() => setGroup(true)}>Sí</Choice><Choice active={!group} onClick={() => setGroup(false)}>No</Choice></div></Field>{group && <Field label="Colocá los nombres de todas las personas que participan"><textarea name="participantes" rows={3} required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field>}<Field label="Mensaje"><textarea name="mensaje" rows={2} className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" placeholder="Opcional" /></Field>{error && <p className="text-sm text-[#a04f58]">{error}</p>}<button disabled={sending} className="w-full rounded-full bg-[#75806b] px-6 py-3.5 font-medium text-white disabled:opacity-60">{sending ? "Reservando…" : "Confirmar reserva"}</button></form></>}</ModalShell>;
}

function BuyModal({ gift, onClose }: { gift: Gift; onClose: () => void }) {
  const links = cleanLinks(gift.enlaces).filter((link) => link.startsWith("http"));
  const [copied, setCopied] = useState(false);
  async function copyAddress() { await navigator.clipboard.writeText(deliveryAddress); setCopied(true); }
  return <ModalShell onClose={onClose}><p className="text-xs uppercase tracking-[0.3em] text-[#a67379]">Comprar regalo</p><h2 className="mt-3 font-serif text-3xl text-[#596452]">{gift.item}</h2><p className="mt-4 leading-7 text-[#706a64]">Si querés enviarlo directamente, utilizá estos datos al completar la compra:</p><div className="mt-5 whitespace-pre-line rounded-2xl border border-[#d9d1c7] bg-white p-5 leading-7">{deliveryAddress}</div><button onClick={() => void copyAddress()} className="mt-3 w-full rounded-full border border-[#75806b] px-5 py-3 text-sm font-medium text-[#596452]">{copied ? "Dirección copiada ✓" : "Copiar dirección"}</button><div className="mt-7 space-y-3">{links.map((link, index) => <a key={link} href={link} target="_blank" rel="noreferrer" className="block rounded-full bg-[#a67379] px-6 py-3.5 text-center font-medium text-white hover:bg-[#936168]">{links.length > 1 ? `Abrir opción de compra ${index + 1}` : "Comprar regalo"}</a>)}</div><p className="mt-5 text-xs leading-5 text-[#817a74]">La compra se realiza en una tienda externa. Recordá volver a la lista y reservar el regalo para actualizar su disponibilidad.</p></ModalShell>;
}

function TransferModal({ gift, onClose, onSuccess }: { gift: Gift; onClose: () => void; onSuccess: () => Promise<void> }) {
  const available = gift.cantidad_sugerida - gift.cantidad_reservada;
  const [group, setGroup] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setError("");
    const form = new FormData(event.currentTarget);
    const { error: submitError } = await supabase.rpc("reservar_regalo", {
      p_regalo_id: gift.id,
      p_nombre_responsable: form.get("nombre"),
      p_contacto: form.get("contacto"),
      p_cantidad: Number(form.get("cantidad")),
      p_modalidad_entrega: "transferencia",
      p_es_grupal: group,
      p_participantes: group ? form.get("participantes") : null,
      p_mensaje: form.get("mensaje") || null,
    });
    if (submitError) setError(submitError.message.includes("suficientes") ? "Ya no quedan suficientes unidades disponibles." : "No pudimos registrar el regalo. Intentá nuevamente."); else setSuccess(true);
    setSending(false);
  }

  return <ModalShell onClose={onClose}>{success ? <div className="pb-8 text-center"><span className="text-6xl">💝</span><h2 className="mt-5 font-serif text-3xl text-[#596452]">¡Gracias por tu regalo!</h2><p className="mt-3 text-[#706a64]">Registramos la elección y reservamos el regalo para Francesca.</p><button onClick={() => void onSuccess()} className="mt-7 rounded-full bg-[#75806b] px-7 py-3 text-white">Finalizar</button></div> : <><p className="text-xs uppercase tracking-[0.3em] text-[#a67379]">Enviar el valor</p><h2 className="mt-3 font-serif text-3xl text-[#596452]">{gift.item}</h2><p className="mt-2 text-sm text-[#706a64]">Completá tus datos para reservar el regalo y después realizá la transferencia por el medio que prefieras.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-[#d9d1c7] bg-white p-5"><p className="text-xs uppercase tracking-wider text-[#a67379]">Transferencia bancaria</p><p className="mt-3 font-medium text-[#596452]">Banco BBVA</p><p className="mt-2 text-sm leading-6 text-[#706a64]">Caja de Ahorro: 195-755/4<br />Sucursal: 195<br />Alias: MARI.FIORELLINI<br />CBU: 0170195740000000075543</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => void copy("bbva", "MARI.FIORELLINI")} className="rounded-full border border-[#75806b] px-3 py-1.5 text-xs">{copied === "bbva" ? "Alias copiado ✓" : "Copiar alias"}</button><button type="button" onClick={() => void copy("cbu", "0170195740000000075543")} className="rounded-full border border-[#75806b] px-3 py-1.5 text-xs">{copied === "cbu" ? "CBU copiado ✓" : "Copiar CBU"}</button></div></div><div className="rounded-2xl border border-[#d9d1c7] bg-white p-5"><p className="text-xs uppercase tracking-wider text-[#a67379]">Mercado Pago</p><p className="mt-3 font-medium text-[#596452]">Alias</p><p className="mt-2 text-sm text-[#706a64]">glitterparty.mp</p><button type="button" onClick={() => void copy("mp", "glitterparty.mp")} className="mt-4 rounded-full border border-[#75806b] px-3 py-1.5 text-xs">{copied === "mp" ? "Alias copiado ✓" : "Copiar alias"}</button></div></div><form onSubmit={submit} className="mt-7 space-y-5"><Field label="Nombre y apellido"><input name="nombre" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="WhatsApp o correo"><input name="contacto" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="Cantidad"><input name="cantidad" type="number" min="1" max={available} defaultValue="1" required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field><Field label="¿Es un regalo grupal?"><div className="grid grid-cols-2 gap-3"><Choice active={group} onClick={() => setGroup(true)}>Sí</Choice><Choice active={!group} onClick={() => setGroup(false)}>No</Choice></div></Field>{group && <Field label="Colocá los nombres de todas las personas que participan"><textarea name="participantes" rows={3} required className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" /></Field>}<Field label="Mensaje"><textarea name="mensaje" rows={2} className="w-full rounded-2xl border border-[#d8d0c6] bg-white px-4 py-3 outline-none focus:border-[#75806b]" placeholder="Opcional" /></Field>{error && <p className="text-sm text-[#a04f58]">{error}</p>}<button disabled={sending} className="w-full rounded-full bg-[#a67379] px-6 py-3.5 font-medium text-white disabled:opacity-60">{sending ? "Registrando…" : "Reservar y enviar el valor"}</button></form></>}</ModalShell>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-medium text-[#5f5a55]">{label}</span>{children}</label>; }
function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) { return <button type="button" onClick={onClick} className={`rounded-2xl border px-4 py-3 text-sm ${active ? "border-[#75806b] bg-[#e2e8dd] text-[#596452]" : "border-[#d8d0c6] bg-white"}`}>{children}</button>; }
