# KnowledgeHub — AI-Powered Learning Hub (Frontend)

A Vite + React + TypeScript web app that **ingests content from URLs, YouTube links, PDFs, and raw text**, then produces an at-a-glance **executive summary, key insights, concepts, quotes, reading time, difficulty, and credibility**. It also provides a **Dashboard**, **Synthesis** view (topic map + cross-source insights), and a **Library**.
---

## ✨ Features

* **Multi-source ingestion**

  * Paste a **web URL** → fetch & extract text via a CORS proxy (AllOrigins).
  * Paste a **YouTube link** → oEmbed metadata + simulated transcript for analysis.
  * **Upload a PDF** → simulated text extraction (placeholder for PDF.js or server parsing).
  * **Raw text** → analyze directly.
* **AI-style analysis (rule-based for demo)**
  Executive summary, key insights, detailed notes, concept list (name, definition, examples), quotes with context, difficulty, reading time, and a lightweight credibility score.
* **Synthesis view**
  Topic map across sources, prioritized insights, cross-connections.
* **Dashboard**
  Source counts, words processed, hours-saved estimate, progress.
* **Library**
  Example catalog with search & type filters.
* **Clean, responsive UI** with Tailwind + lucide-react icons.

---

## 🧩 Tech Stack (Technologies Used)

* **Framework & Language:** React 18, TypeScript 5, Vite 5
* **Styling:** Tailwind CSS 3
* **Icons:** lucide-react
* **Content Processing (frontend demo):**

  * `fetch` + **AllOrigins** CORS proxy for webpage HTML
  * **YouTube oEmbed** for titles/authors
  * `youtube-transcript` listed (simulated client-side due to CORS/rate limits)
  * `pdf-parse` listed (Node-only; simulated in browser)
* **Tooling:** ESLint, @vitejs/plugin-react
---

## 📂 Project Structure (high-level)

```
src/
  App.tsx                      # View router + modals
  index.css, main.tsx          # App entry
  components/
    Header.tsx                 # Top nav + search/profile/settings
    Dashboard.tsx              # KPI cards, progress
    ContentIngestion.tsx       # URL/YouTube/PDF/Text inputs + pipeline status
    SynthesisResults.tsx       # Topic map + cross-source insights
    DetailedAnalysis.tsx       # Per-source deep-dive
    Library.tsx                # Example catalog + filters
    Profile.tsx, Settings.tsx  # Modals
  hooks/
    useContentAnalysis.ts      # Demo pipeline state (mocked latencies)
  services/
    contentProcessor.ts        # Core processing (web scrape, YT/PDF/text) + analysis heuristics
tailwind.config.js
eslint.config.js
vite.config.ts
```
## 🚀 Getting Started

> **No Python required.** This is a Vite app.

1. **Install dependencies**

   ```bash
   npm install
   ```
2. **Run the dev server**

   ```bash
   npm run dev
   ```

   Vite will print a local URL (often `http://localhost:5173`).
3. **Build for production (optional)**

   ```bash
   npm run build && npm run preview
   ```

---

## 🔧 How It Works (High Level)

* **Web URLs** → fetched via `https://api.allorigins.win/get?url=<encoded>` to bypass CORS; HTML parsed with `DOMParser`; content heuristics look for `article`, `main`, `.content`, `.post-content`, `.entry-content`, etc.
* **YouTube links** → extract ID; query oEmbed for title/author; **simulate** transcript (a real build would proxy to a backend using `youtube-transcript`).
* **PDF files** → read as ArrayBuffer; **simulate** extraction in the client; production would use **PDF.js** (client) or **pdf-parse** (server).
* **Analysis (client-only, heuristic)** → ranks sentences/sections, synthesizes summary, insights, notes, concept list, quotes, difficulty, reading time, credibility.

---

## 🧠 Problem It Solves

People learn from **scattered sources** (articles, videos, PDFs, notes). Manually skimming, extracting insights, and connecting ideas is **slow** and **inconsistent**. **KnowledgeHub** centralizes ingestion and delivers a **fast, structured first pass**: summaries, key ideas, quotes, and cross-connections — helping learners, researchers, and teams **understand faster and retain more**.

---
## 🖥️ Platforms (Where It Works)

* **Web (Desktop & Mobile):** ✅ Chrome, Edge, Firefox, Safari
* **PWA:** ✅ Installable on Android and iOS/iPadOS (Add to Home Screen)
* **Desktop “apps”:** ✅ via **Electron** or **Tauri** wrapper (macOS, Windows, Linux)
* **Mobile “apps”:** ✅ via **Capacitor** (Android APK/AAB, iOS IPA)
* **ChromeOS:** ✅ via browser/PWA

> Network-dependent features (URL/YouTube via CORS proxy) require internet. Offline, raw-text analysis works; full PDF/URL support needs PDF.js and caching or a small backend.

---

## 🛣️ Roadmap Ideas

* Real transcript fetching + PDF parsing via a minimal backend API.
* Stronger article extraction (Readability), boilerplate removal, image/figure capture.
* True **NLP pipelines** for summarization/concepts/quotes (server or on-device WebGPU).
* **Search across your library**, tag suggestions, spaced-repetition export.
* **Auth + persistence** (Supabase): saved sources, notes, highlights.
* Exports to Markdown/Notion/Obsidian; PDF summaries.

---

## 📜 Scripts

```jsonc
"dev": "vite",
"build": "vite build",
"lint": "eslint .",
"preview": "vite preview"
```

## 🙌 Credits

* Icons: **lucide-react**
* Proxy: **AllOrigins**
* Build: **Vite** + **React** + **TypeScript** + **Tailwind**
