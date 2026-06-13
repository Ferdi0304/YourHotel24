import { useState, useRef, useEffect } from "react";

const HOTELS = [
  { id: 1, name: "Hotel Alpina Deluxe", city: "Zermatt", country: "Schweiz", price: 189, originalPrice: 280, rating: 4.8, reviews: 1243, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", tags: ["Wellness", "Berge", "Spa"], amenities: ["Pool", "Spa", "Restaurant"], lastMinute: true, nomad: false, cat: "wellness" },
  { id: 2, name: "The Urban Nomad Hub", city: "Berlin", country: "Deutschland", price: 79, originalPrice: 79, rating: 4.6, reviews: 892, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", tags: ["Nomad", "Design", "Zentral"], amenities: ["Coworking", "Gigabit WLAN", "Café"], lastMinute: false, nomad: true, cat: "nomad" },
  { id: 3, name: "Boutique Riviera", city: "Nizza", country: "Frankreich", price: 134, originalPrice: 210, rating: 4.9, reviews: 567, img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80", tags: ["Meer", "Design", "Luxus"], amenities: ["Pool", "Bar", "Strand"], lastMinute: true, nomad: false, cat: "design" },
  { id: 4, name: "Nomad Base Vienna", city: "Wien", country: "Österreich", price: 65, originalPrice: 65, rating: 4.5, reviews: 445, img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", tags: ["Nomad", "Zentral", "Budget"], amenities: ["Coworking", "WLAN", "Küche"], lastMinute: false, nomad: true, cat: "nomad" },
  { id: 5, name: "Palazzo Venezia", city: "Venedig", country: "Italien", price: 245, originalPrice: 390, rating: 4.9, reviews: 2100, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", tags: ["Luxus", "Romantik", "Design"], amenities: ["Kanal-View", "Bar", "Spa"], lastMinute: true, nomad: false, cat: "luxury" },
  { id: 6, name: "Schwarzwald Retreat", city: "Freiburg", country: "Deutschland", price: 112, originalPrice: 155, rating: 4.7, reviews: 334, img: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80", tags: ["Wellness", "Natur", "Ruhe"], amenities: ["Sauna", "Wanderwege", "Pool"], lastMinute: true, nomad: false, cat: "wellness" },
  { id: 7, name: "Rooftop Loft Barcelona", city: "Barcelona", country: "Spanien", price: 98, originalPrice: 98, rating: 4.7, reviews: 1567, img: "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80", tags: ["Design", "Nomad", "Stadtleben"], amenities: ["Rooftop Pool", "Coworking", "Gym"], lastMinute: false, nomad: true, cat: "design" },
  { id: 8, name: "Alpine Spa Resort", city: "Innsbruck", country: "Österreich", price: 167, originalPrice: 220, rating: 4.8, reviews: 789, img: "https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800&q=80", tags: ["Wellness", "Spa", "Berge"], amenities: ["Therme", "Spa", "Restaurant"], lastMinute: true, nomad: false, cat: "wellness" },
];

const gold = "#d4af37";
const dark = "#0d0b08";
const cream = "#f0e6c8";

function HotelCard({ hotel, highlight }) {
  const disc = Math.round((1 - hotel.price / hotel.originalPrice) * 100);
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.city)}&aid=yourhotel24`;
  return (
    <div style={{ background: highlight ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${highlight ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 16, overflow: "hidden" }}>
      <div style={{ position: "relative", height: 180 }}>
        <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
        {hotel.lastMinute && <div style={{ position: "absolute", top: 12, left: 12, background: "#e74c3c", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>⚡ LAST MINUTE</div>}
        {hotel.nomad && <div style={{ position: "absolute", top: 12, left: 12, background: "#2ecc71", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>💻 NOMAD</div>}
        {disc > 0 && <div style={{ position: "absolute", top: 12, right: 12, background: "#e74c3c", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 800 }}>-{disc}%</div>}
        <div style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: 12, opacity: 0.8 }}>{hotel.city}, {hotel.country}</div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: cream, marginBottom: 8 }}>{hotel.name}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {hotel.tags.map(t => <span key={t} style={{ background: "rgba(212,175,55,0.15)", color: gold, padding: "2px 8px", borderRadius: 10, fontSize: 11 }}>{t}</span>)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ color: gold, fontSize: 13, marginBottom: 2 }}>★ {hotel.rating} <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>({hotel.reviews})</span></div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: gold }}>€{hotel.price}</span>
              {disc > 0 && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>€{hotel.originalPrice}</span>}
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>/Nacht</span>
            </div>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ background: `linear-gradient(135deg, ${gold}, #b8960c)`, color: "#000", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 800, textDecoration: "none" }}>BUCHEN →</a>
        </div>
      </div>
    </div>
  );
}

function AIChat() {
  const [msgs, setMsgs] = useState([{ role: "assistant", text: "Hallo! 🏨 Ich bin dein persönlicher Hotel-Berater.\n\nBeschreib mir deinen Traumurlaub – Budget, Stimmung, Reiseziel – und ich finde das perfekte Hotel!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput("");
    setMsgs(prev => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const ctx = HOTELS.map(h => `ID:${h.id} | ${h.name} | ${h.city}, ${h.country} | €${h.price}/Nacht | Tags: ${h.tags.join(", ")} | LastMinute: ${h.lastMinute} | Nomad: ${h.nomad}`).join("\n");
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `Du bist ein freundlicher Hotel-Berater auf yourhotel24.com. Antworte auf Deutsch.\n\nVerfügbare Hotels:\n${ctx}\n\nEmpfehle passende Hotels und gib ihre IDs am Ende an im Format [HOTELS:1,2,3]. Sei warm und persönlich.`,
          messages: [{ role: "user", content: q }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Entschuldigung, bitte nochmal versuchen.";
      const match = text.match(/\[HOTELS:([\d,]+)\]/);
      if (match) setSuggested(HOTELS.filter(h => match[1].split(",").map(Number).includes(h.id)));
      else setSuggested([]);
      setMsgs(prev => [...prev, { role: "assistant", text: text.replace(/\[HOTELS:[\d,]+\]/, "").trim() }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", text: "Verbindungsfehler – bitte nochmal versuchen!" }]);
    }
    setLoading(false);
  };

  const quickTips = ["Wellness Alpen 150€", "Nomad Barcelona", "Last Minute Meer", "Romantik Italien"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? `linear-gradient(135deg, ${gold}, #b8960c)` : "rgba(255,255,255,0.07)", color: m.role === "user" ? "#000" : cream, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.1)" : "none" }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 6, padding: "12px 16px", background: "rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px", width: "fit-content" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: gold, animation: `bounce 1.2s ${i*0.2}s infinite` }} />)}
          </div>
        )}
        {suggested.length > 0 && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontSize: 12, color: "rgba(212,175,55,0.7)", textTransform: "uppercase", letterSpacing: 1 }}>✨ Meine Empfehlungen</div>
            {suggested.map(h => <HotelCard key={h.id} hotel={h} highlight />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="z.B. 'Wellness Hotel Alpen, Budget 150€'" style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 16px", color: cream, fontSize: 14, outline: "none", fontFamily: "inherit" }} />
          <button onClick={send} disabled={loading || !input.trim()} style={{ background: loading ? "rgba(212,175,55,0.3)" : `linear-gradient(135deg, ${gold}, #b8960c)`, border: "none", borderRadius: 12, padding: "12px 20px", color: "#000", fontWeight: 800, cursor: "pointer", fontSize: 16 }}>→</button>
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {quickTips.map(s => <button key={s} onClick={() => setInput(s)} style={{ background: "rgba(212,175,55,0.1)", border: `1px solid rgba(212,175,55,0.3)`, borderRadius: 20, padding: "4px 12px", color: gold, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{s}</button>)}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [cat, setCat] = useState("all");

  const filtered = HOTELS.filter(h => cat === "all" || h.cat === cat);
  const deals = HOTELS.filter(h => h.lastMinute).sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price));
  const nomads = HOTELS.filter(h => h.nomad);

  const tabs = [["home","🏠 Start"],["deals","⚡ Deals"],["nomad","💻 Nomad"],["ai","🤖 KI-Berater"]];
  const cats = [["all","Alle"],["wellness","🧘 Wellness"],["design","🎨 Design"],["luxury","👑 Luxus"],["nomad","💻 Nomad"]];

  return (
    <div style={{ minHeight: "100vh", background: dark, color: cream, fontFamily: "Georgia, serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${gold}; border-radius: 2px; }
        input::placeholder { color: rgba(240,230,200,0.35) !important; }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0) } 40% { transform:translateY(-6px) } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes shimmer { 0% { background-position:-200% center } 100% { background-position:200% center } }
        a:hover { opacity: 0.85; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(13,11,8,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,55,0.15)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>
          <span style={{ color: gold }}>your</span>hotel<span style={{ color: gold }}>24</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ background: tab === id ? "rgba(212,175,55,0.15)" : "transparent", border: tab === id ? `1px solid rgba(212,175,55,0.4)` : "1px solid transparent", borderRadius: 8, padding: "6px 12px", color: tab === id ? gold : "rgba(240,230,200,0.55)", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>{label}</button>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {tab === "home" && (
        <div>
          <div style={{ position: "relative", height: "88vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80)", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.22)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(212,175,55,0.07) 0%, rgba(13,11,8,0.5) 70%)" }} />
            <div style={{ position: "relative", zIndex: 1, animation: "fadeUp 0.8s ease forwards" }}>
              <div style={{ fontSize: 12, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 20, opacity: 0.8 }}>✦ Dein smarter Hotel-Begleiter</div>
              <h1 style={{ fontSize: "clamp(40px,8vw,90px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, background: `linear-gradient(135deg, ${cream} 30%, ${gold} 60%, ${cream} 90%)`, backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
                Dein perfektes<br />Hotel, 24/7
              </h1>
              <p style={{ fontSize: 17, color: "rgba(240,230,200,0.6)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}>KI-Beratung · Last Minute Deals · Nomad-Hotels<br />Alles an einem Ort.</p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setTab("ai")} style={{ background: `linear-gradient(135deg, ${gold}, #b8960c)`, border: "none", borderRadius: 12, padding: "15px 30px", color: "#000", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 32px rgba(212,175,55,0.3)" }}>🤖 KI-Berater starten</button>
                <button onClick={() => setTab("deals")} style={{ background: "transparent", border: `1px solid rgba(212,175,55,0.5)`, borderRadius: 12, padding: "15px 30px", color: gold, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>⚡ Last Minute Deals</button>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 40, display: "flex", gap: 48 }}>
              {[["8+","Hotels"],["4.7★","Ø Bewertung"],["Bis -45%","Ersparnis"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: gold }}>{n}</div>
                  <div style={{ fontSize: 11, color: "rgba(240,230,200,0.4)", letterSpacing: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
              {cats.map(([c,l]) => (
                <button key={c} onClick={() => setCat(c)} style={{ background: cat===c ? `linear-gradient(135deg, ${gold}, #b8960c)` : "rgba(255,255,255,0.05)", border: cat===c ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "8px 20px", color: cat===c ? "#000" : "rgba(240,230,200,0.6)", cursor: "pointer", fontFamily: "inherit", fontWeight: cat===c ? 700 : 400, fontSize: 14 }}>{l}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 20 }}>
              {filtered.map(h => <HotelCard key={h.id} hotel={h} />)}
            </div>
          </div>
        </div>
      )}

      {/* DEALS */}
      {tab === "deals" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Nur heute verfügbar</div>
            <h2 style={{ fontSize: 46, fontWeight: 900 }}>⚡ Last Minute Deals</h2>
            <p style={{ color: "rgba(240,230,200,0.5)", marginTop: 12 }}>Die besten Angebote – spontan und günstig</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 20 }}>
            {deals.map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
          <div style={{ marginTop: 48, padding: 32, borderRadius: 20, background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.2)", textAlign: "center" }}>
            <div style={{ fontSize: 20, color: gold, marginBottom: 8 }}>🤖 Nichts Passendes dabei?</div>
            <p style={{ color: "rgba(240,230,200,0.5)", marginBottom: 20 }}>Sag dem KI-Berater was du suchst!</p>
            <button onClick={() => setTab("ai")} style={{ background: `linear-gradient(135deg, ${gold}, #b8960c)`, border: "none", borderRadius: 10, padding: "12px 28px", color: "#000", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>KI-Berater fragen →</button>
          </div>
        </div>
      )}

      {/* NOMAD */}
      {tab === "nomad" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#2ecc71", textTransform: "uppercase", marginBottom: 12 }}>Remote Work Freundlich</div>
            <h2 style={{ fontSize: 46, fontWeight: 900 }}>💻 Nomad Hotels</h2>
            <p style={{ color: "rgba(240,230,200,0.5)", marginTop: 12 }}>Gigabit WLAN · Coworking · Weltweit</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 36, background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
            {[["📶","Gigabit WLAN","Schnelles Internet"],["🖥️","Coworking","Dedizierte Bereiche"],["🌍","Weltweit","Top-Städte"]].map(([i,t,d]) => (
              <div key={t} style={{ textAlign: "center", padding: 16 }}>
                <div style={{ fontSize: 30, marginBottom: 8 }}>{i}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: cream, marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 13, color: "rgba(240,230,200,0.4)" }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 20 }}>
            {nomads.map(h => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </div>
      )}

      {/* AI */}
      {tab === "ai" && (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900 }}>🤖 KI Hotel-Berater</h2>
            <p style={{ color: "rgba(240,230,200,0.45)", fontSize: 14, marginTop: 6 }}>Beschreib deinen Traumurlaub – die KI empfiehlt das perfekte Hotel</p>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: `1px solid rgba(212,175,55,0.2)`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <AIChat />
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ marginTop: 80, padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center", color: "rgba(240,230,200,0.3)", fontSize: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: gold, marginBottom: 8 }}>yourhotel24.com</div>
        <p>* Affiliate-Links: Bei Buchung über unsere Links erhalten wir eine Provision – für dich entstehen keine Mehrkosten.</p>
        <p style={{ marginTop: 4 }}>© 2025 yourhotel24.com · Alle Rechte vorbehalten</p>
      </footer>
    </div>
  );
}
