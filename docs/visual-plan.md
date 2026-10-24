# Silfira Realtors — Premium Redesign Plan & AI Image Prompt Pack

> **Brand line:** *"Where Spaces Become Homes"* · Gandhinagar (Sargasan, Kudasan, Raysan, PDEU / Palm Road)
> **Goal:** Keep the existing content, messaging and maroon-cream identity, but take the presentation up to award-site quality: cinematic, layered, scroll-driven, calm, trustworthy.

---

## 0. The improved brief (your prompt, refined)

> Study the Silfira website end-to-end: every page, component, asset, colour, type choice and line of copy. Before planning, research the current standard of high-end web design: Awwwards / FWA / CSS Design Awards Site-of-the-Day winners, premium real-estate and architecture studios (developer launch microsites, luxury hospitality, architecture firms), and modern motion systems (smooth scrolling, scroll-linked timelines, pinned storytelling, parallax depth, mask reveals, view transitions). Distil what makes them feel expensive: **restraint, whitespace, editorial typography, slow eased motion, real depth, and one strong idea per section.**
>
> Then redesign Silfira so it feels like a luxury developer launch site rather than a listings portal, **without changing the brand, content or messaging**. Build a layered "world" that responds to the scroll: a skyline that rises, foliage that frames the foreground, light that shifts from dawn to dusk as the visitor moves down the page, and architecture that assembles itself. Motion must always serve meaning (arrive → explore → trust → act), never distract, respect `prefers-reduced-motion`, and stay smooth on mid-range phones.
>
> Plan every visual asset needed, write production-grade prompts for an AI image generator (title, content, size/ratio, transparency, style, mood, composition, treatment, references), package the existing imagery as a reference set, and then, once the assets arrive, implement the final design to a polished, performant, accessible standard.

---

## 1. What exists today (audit)

| Area | Current state | Verdict |
|---|---|---|
| **Palette** | Deep maroon `#4b0617`, wine `#8d2942`, rose accent `#9d3a52`, blush `#f0c5ce / #f6dce1`, cream `#fbf7f8`. Tailwind `navy`/`gold` scales are actually maroon/rose. | Strong and distinctive. Keep. Add a **warm champagne/brass** metallic accent for luxury highlights. |
| **Type** | Playfair Display (serif, italic accents) + Inter. Large tight-tracked serif headlines. | Good editorial base. Upgrade pairing (see §3). |
| **Logo** | "SR" monogram inside a house outline; huge ghosted "S" on maroon brand card. | Use the ghost-S and house-line as recurring motifs. |
| **Home** | Hero with parallax photo (`home.jpg`, a 720px upward shot of two towers), search bar, maroon intro + stats, property grid, partner marquee, advisors, testimonials (drag), CTA with ghost "S". | Solid bones, framer-motion already in. Missing: depth layers, storytelling, real imagery quality (hero is only 720px). |
| **Properties** | 7 developer renders (towers at dusk, greenery foreground), mixed sizes ~630px. | Low-res; cards need richer hover + consistent framing. |
| **About** | Old style (Unsplash image, generic icons, `rounded-lg` cards). Doesn't match new Home. | Needs a full rebuild in the new language. |
| **Other pages** | Agents, Contact, Valuation, PropertyDetail still in the older template style. | Unify. |
| **Assets** | 18 developer logos, 2 advisor portraits, 8 "why" photos, 7 brochures. | Logos → monochrome treatment; portraits → studio-consistent. |

**Key insight:** the site already has a confident identity (maroon + serif + ghost-S). The upgrade is not a rebrand. It's adding **depth, atmosphere, motion choreography and image quality.**

---

## 2. Research takeaways: what premium sites do

Patterns from award-winning real-estate, architecture and luxury-hospitality sites:

1. **Smooth inertial scroll** (Lenis) + **scroll-linked timelines** (GSAP ScrollTrigger or framer-motion `useScroll`). Everything eases; nothing snaps.
2. **Pinned storytelling chapters.** A section locks while its content transforms (a building assembles, a floor plan draws, a day turns to night).
3. **Layered parallax depth.** Foreground foliage, midground architecture, background sky each move at different speeds. This is why transparent PNGs matter.
4. **Mask and clip reveals.** Images open through a growing rectangle/arch; headlines rise line-by-line from behind a mask.
5. **Editorial typography as the hero.** Oversized serif, generous whitespace, small uppercase tracked labels, numbered chapters (01 / 02 / 03).
6. **Slow, expensive easing.** 0.9–1.4s, `cubic-bezier(.2,.65,.3,1)` / expo-out. Few elements, moving slowly.
7. **Micro-details.** Custom cursor on desktop ("View", "Drag"), magnetic buttons, grain overlay, thin hairline rules, a preloader with the monogram, page transitions with a maroon curtain.
8. **Trust signals designed, not dumped.** Animated counters, developer logos in a calm monochrome rail, real faces, testimonials with typography-first layouts.
9. **Performance discipline.** AVIF/WebP, lazy loading, transform/opacity-only animation, reduced-motion fallbacks.

---

## 3. Design direction: "Maroon Dusk"

**Concept:** *A walk from street to sky at golden hour.* As the visitor scrolls, the light moves from warm dusk through blue hour to a lit-up evening skyline. This matches the existing property renders, which are almost all dusk shots with lit windows and greenery.

### Palette (extended)
| Token | Hex | Use |
|---|---|---|
| Oxblood (base dark) | `#3b0310` / `#4b0617` | Hero, chapters, footer |
| Wine | `#8d2942` | CTA band, hover states |
| Rose accent | `#9d3a52` | Labels, links |
| Blush | `#f6dce1` | Italic headline accents on dark |
| Ivory | `#fbf7f8` / `#f5efe9` | Light sections |
| **NEW Champagne brass** | `#c9a46a` → `#e6cf9f` gradient | Hairlines, numerals, monogram foil, tiny highlights only |
| **NEW Dusk blue** | `#1d2a3a` | Night-sky section, depth backgrounds |
| Foliage green (image-only) | natural | Comes from imagery, never UI |

### Typography
- **Display:** keep Playfair *or* upgrade to **Cormorant Garamond / Fraunces** (variable, softer, more luxury). Italic for emotional words ("dream space", "found home").
- **Body/UI:** Inter → **Manrope** or keep Inter at 300/400 with wider tracking for labels.
- Chapter numerals in champagne: `01 — Arrive`.

### Texture & detail
- 3–4% film-grain overlay sitewide.
- Hairline 1px borders in `white/15` or `#4b0617/10`.
- Arch shapes (from the house-roof in the logo) as image masks and section dividers.

---

## 4. Page-by-page experience plan

### HOME

**00. Preloader (1.2s)**
SR monogram draws itself in champagne line (SVG stroke), counter 0→100, then the maroon curtain lifts upward to reveal the hero.

**01. Hero: "Discover your dream space." (layered parallax world)**
Layers back to front, each a separate asset:
1. Dusk sky gradient (A1)
2. Distant skyline silhouette (A2), moves slowest
3. Hero tower cluster (A3), rises ~8% on load, then slowly scales on scroll
4. Mid-ground trees (A4)
5. Foreground foliage frame left and right (A5), moves fastest and *parts outward* as you scroll, like walking through a gate
6. Floating light particles / dust (A6)

The headline is masked between layers: "dream space" sits *behind* the tower top for a depth illusion. The search bar floats in as a frosted glass panel. Mouse-move gives a subtle 3D tilt on desktop.

**02. Intro: "Real people. Real homes. Real value."**
Maroon section. Words reveal line by line. The ghost "S" monogram rotates very slightly with scroll. Stats count up (animated numbers) with champagne hairlines drawing across.

**03. Pinned chapter: "From Street to Sky" (signature moment)**
The section pins for ~250vh of scroll:
- Stage 1: an architectural line drawing of a tower (A7) draws itself (SVG stroke)
- Stage 2: it cross-fades into the full rendered tower (A8), floors filling bottom to top with light
- Stage 3: sky shifts dusk → blue hour (A9) and windows light up
- Side copy changes per stage: *Location → Lifestyle → Legacy* (existing values, re-framed)

**04. Curated collection (properties)**
Horizontal scroll gallery on desktop (pinned, vertical scroll moves cards sideways); grid on mobile. Each card opens through an arch-shaped mask reveal; on hover the image zooms and a "View" cursor appears. A small locality chip and a champagne price line.

**05. Neighbourhoods of Gandhinagar**
Stylised illustrated map (A10) with pins for Sargasan, Kudasan, Raysan, PDEU / Palm Road. On scroll, the pins drop in and a route line draws. Hovering a pin shows its count of homes.

**06. Developer partners**
Calm two-row marquee in opposite directions, logos monochrome ivory on maroon, colour on hover.

**07. Advisors**
Portraits on consistent backdrops (A13) with a parallax arch frame. The name rises from a mask. Contact buttons are magnetic.

**08. Testimonials**
Large typographic quote with blurred greenery bokeh (A11) behind. Drag carousel with a custom "Drag" cursor.

**09. Closing CTA: "The right space changes everything."**
Night skyline (A12) with lit windows. As you reach the end, the windows light up one by one. The ghost "S" sits behind. Magnetic button.

**Footer**
Oxblood, oversized "SILFIRA" wordmark that reveals as you scroll in, champagne hairlines.

### ABOUT (rebuild)
- Hero: founder quote over the arch-masked "why" images collage, parallax
- "Our Story" told as a vertical timeline with a line that draws as you scroll
- Core values as 4 tall cards with custom line icons (A14)
- 8 "why" photos as a staggered parallax mosaic

### PROPERTY DETAIL
Full-bleed hero render with parallax, sticky fact panel (price, BHK, area, brochure), amenity icon row (A14), gallery with lightbox, locality map, enquiry form.

### VALUATION / CONTACT / AGENTS
Same language: maroon hero band with the foliage frame (A5 reused), ivory form cards, champagne focus states.

### Global motion system
- **Lenis** smooth scroll + **framer-motion** (already installed) for reveals; add **GSAP ScrollTrigger** for pinned chapters
- Page transitions: a maroon curtain with the monogram
- Custom cursor (desktop only), magnetic CTAs
- Full `prefers-reduced-motion` fallback: static layers, fades only
- Performance: all images AVIF/WebP with `srcset`; parallax only with `transform`; hero layers preloaded

---

## 5. Asset list & AI image prompts

### Global rules for EVERY prompt (paste at the top of each generation)

> **Style anchor:** Photorealistic architectural visualisation, premium Indian residential development, contemporary high-rise with beige/taupe stone-finish facades, vertical fins, glass balconies, landscaped greenery. The look and feel should match the attached reference renders (`02-architecture-style`). Warm golden-hour to blue-hour lighting. Colour grade: warm ivory highlights, subtle deep-maroon shadows (#4b0617 tint in the darkest tones), champagne-gold light (#c9a46a). No text, no logos, no watermarks, no people's faces in close-up, no cars in the foreground, no lens flare artefacts. Ultra-clean edges. High dynamic range, soft natural shadows, 8K detail.
>
> **For transparent PNGs:** Output a true alpha channel (no checkerboard baked in, no white halo, no drop shadow unless stated). Isolated subject, clean anti-aliased edges, leaf-level detail preserved. Leave ~5% empty padding around the subject.

---

### A1 · Hero Dusk Sky
- **File:** `hero-sky.jpg`
- **Size / ratio:** 3840 × 2160 (16:9), plus a 1440 × 2560 (9:16) mobile crop
- **Background:** Opaque (this IS the background layer)
- **Prompt:** A wide, empty sky at golden-hour dusk over a city. A smooth gradient from warm apricot and soft rose near the horizon (lower 20%) up through dusty mauve to deep oxblood-plum (#3b0310) at the very top. A few long, thin, softly lit cirrus clouds drift horizontally across the middle third. No buildings, no ground, no birds, no sun disc. Calm, cinematic, luxurious. The top 40% should be dark and clean enough for white serif headline text to sit on it.
- **Mood:** Serene, aspirational, warm
- **Match references:** Sky tones of `02-architecture-style/1.png`, but warmer and more maroon

### A2 · Distant Skyline Silhouette
- **File:** `skyline-far.png`
- **Size / ratio:** 3840 × 1200 (≈3.2:1, panoramic strip)
- **Background:** **Transparent**
- **Prompt:** A panoramic silhouette of a modern Indian city skyline (Gandhinagar / GIFT City feel) seen from far away at dusk. A mix of mid-rise and high-rise residential towers and a few commercial glass towers, all at an atmospheric distance: low contrast, hazy, a single soft muted plum-grey tone (#5a3a45 at ~70% opacity feel) with a faint warm rim light on the right edges. Scattered tiny warm window lights (5–10% of windows). Flat bottom edge, varied rooftop line. No ground, no trees, no sky (transparent above).
- **Style:** Atmospheric-perspective matte painting
- **Use:** Slowest parallax layer behind the hero tower

### A3 · Hero Signature Tower Cluster ⭐ (most important asset)
- **File:** `hero-towers.png`
- **Size / ratio:** 2400 × 3600 (2:3 portrait)
- **Background:** **Transparent**
- **Prompt:** A cluster of three elegant contemporary luxury residential towers (16–22 floors), photographed from a slightly low angle, three-quarter view. Warm beige/taupe stone cladding with slim vertical fins framing each bay, full-height glass balconies with thin dark railings, small planters with greenery on balconies, a crown with a pergola frame on the tallest tower. Lit at blue-hour dusk: warm 2700K amber light glows from about 40% of the windows, the facade catches a soft golden rim light from the left. Towers stand on a clean landscaped podium base (cut off flat at the bottom). Crisp edges, no sky (transparent), no surrounding buildings, no ground beyond the podium.
- **Composition:** Tallest tower centred, the other two staggered behind left and right; the top of the tallest tower sits at 8% from the top of the canvas
- **Mood:** Prestigious, warm, welcoming, aspirational
- **Match references:** **Directly match the architecture of `02-architecture-style/1.png` and `2.png`**

### A4 · Mid-ground Tree Line
- **File:** `trees-mid.png`
- **Size / ratio:** 3840 × 1400
- **Background:** **Transparent**
- **Prompt:** A continuous horizontal band of lush, mature tropical/Indian landscape trees: neem, gulmohar with a few red-orange blossoms, slender palms (Palm Road reference), and rounded ornamental shrubs. Varying heights, natural silhouette along the top edge, dense at the bottom so it can hide the base of buildings. Lit by warm dusk light from the left with soft depth. Bottom edge flat/opaque.
- **Style:** Photoreal landscape cut-out

### A5 · Foreground Foliage Frame (Left + Right) ⭐
- **Files:** `foliage-left.png`, `foliage-right.png`
- **Size / ratio:** 1600 × 3200 each (1:2 portrait)
- **Background:** **Transparent**
- **Prompt:** Close-foreground leafy branches entering the frame from the [LEFT / RIGHT] edge, as if the viewer is standing under a tree looking out at a building. Large, broad tropical leaves and fine neem-style leaflets, slightly out of focus (shallow depth of field, soft bokeh blur on the outermost leaves, sharper inner leaves). Backlit at golden hour: leaf edges glow warm, the inner side is in deep green-black shadow with a subtle maroon tint. The branches occupy the outer 45% of the canvas and leave the inner side fully transparent.
- **Use:** The fastest parallax layer; it parts outward on scroll. Reused on inner-page heroes.

### A6 · Light Particles / Golden Dust
- **File:** `particles.png`
- **Size / ratio:** 2560 × 1440
- **Background:** **Transparent**
- **Prompt:** Sparse floating golden dust motes and soft circular bokeh orbs of different sizes (2px–60px), warm champagne colour (#e6cf9f), varied opacity and blur, scattered more densely toward the upper-left and fading out. Nothing else.

### A7 · Architectural Line Drawing of a Tower
- **File:** `tower-lineart.png` (also ask for **SVG** if the tool supports it)
- **Size / ratio:** 2000 × 3000 (2:3), **must align 1:1 with A8**
- **Background:** **Transparent**
- **Prompt:** A precise architectural elevation/perspective line drawing of the SAME tower as A8: thin, uniform 2px lines in champagne gold (#c9a46a), with a few construction guide lines, floor lines, window grids, balcony rails and dimension ticks. Blueprint elegance, minimal, no shading, no fill, no text labels.
- **Use:** Draws itself on scroll, then cross-fades into A8

### A8 · Single Signature Tower, Day → Dusk (pair)
- **Files:** `tower-day.png`, `tower-dusk.png`
- **Size / ratio:** 2000 × 3000 (2:3), identical framing in both
- **Background:** **Transparent**
- **Prompt:** One contemporary luxury residential tower, 20 floors, straight-on slightly-low three-quarter view, same architecture as A3. **Version 1 (day):** soft late-afternoon sun, windows reflect sky, no interior lights. **Version 2 (dusk):** identical camera and geometry, blue-hour, warm amber light in ~60% of windows, soft uplighting on the podium. Generate both from the same seed so they overlay perfectly.

### A9 · Blue-Hour / Night Sky
- **File:** `sky-bluehour.jpg`
- **Size / ratio:** 3840 × 2160
- **Background:** Opaque
- **Prompt:** A clear sky just after sunset: deep indigo (#1d2a3a) at the top blending to dusty violet, then a thin band of warm rose-amber at the horizon. A few faint stars in the top quarter. No ground, no clouds, no moon.

### A10 · Gandhinagar Locality Map (stylised)
- **File:** `map-gandhinagar.png` (+ SVG if possible)
- **Size / ratio:** 2400 × 1800 (4:3)
- **Background:** Opaque ivory `#f5efe9` (and a second version on oxblood `#3b0310`)
- **Prompt:** An elegant, minimalist illustrated map of the Gandhinagar south area (Sargasan, Kudasan, Raysan, PDEU / Palm Road, Sabarmati river on the west, GIFT City hint). Thin hairline roads in muted rose, the river as a soft blush band, green parks as faint sage blobs, tiny simplified building footprints. Very sparse, like a luxury hotel's printed map. **No text labels** (we'll add them in code). No pins.

### A11 · Greenery Bokeh Backdrop
- **File:** `bokeh-green.jpg`
- **Size / ratio:** 3840 × 2160
- **Background:** Opaque
- **Prompt:** Heavily defocused garden foliage with large circular warm bokeh highlights, deep green with an oxblood-maroon vignette at the edges and a dark centre for text. Very soft, abstract, calming. Must stay readable under white text.

### A12 · Night Skyline Panorama (closing CTA)
- **File:** `skyline-night.jpg` and `skyline-night-windows.png` (transparent window-light layer)
- **Size / ratio:** 3840 × 1800
- **Background:** Base: Opaque. Window layer: **Transparent**
- **Prompt:** A wide, calm night skyline of modern residential towers with landscaped greenery at their bases, seen from a slight elevation. Deep oxblood-to-indigo sky, silhouetted towers in near-black plum. **Layer 2:** ONLY the warm amber window lights from the same image on a transparent background, so we can animate them switching on.

### A13 · Advisor Portrait Backdrops (re-shoot style)
- **File:** `advisor-backdrop.jpg`
- **Size / ratio:** 1600 × 2000 (4:5)
- **Background:** Opaque
- **Prompt:** A blurred luxury interior backdrop for corporate portraits: warm walnut wood panels, a soft arch doorway, a single plant, low-key warm lighting, oxblood and ivory tones. Strong shallow depth of field. No people.
- **Note:** If your tool supports image editing, upload `04-people-style/*.jpg` and ask: *"Keep the person exactly as they are (face, clothing, pose). Replace the background with this backdrop and match the lighting to warm soft key light from the left. Output 1600×2000."*

### A14 · Line Icon Set (values + amenities)
- **File:** `icons/*.svg` (or 512 × 512 PNG each)
- **Background:** **Transparent**
- **Style:** Single-weight 1.5px champagne-gold line icons, rounded caps, an arch motif where natural, consistent 24px grid
- **Set:** Excellence (laurel arch), Integrity (key in arch), Client-centric (two hands + house), Innovation (spark over tower), Clubhouse, Pool, Gym, Garden, Kids' play, Security, Parking, Lift, Power backup, Jogging track, Temple, Amphitheatre

### A15 · Arch-Masked Lifestyle Moments (4)
- **Files:** `life-1.jpg` … `life-4.jpg`
- **Size / ratio:** 1600 × 2000 (4:5)
- **Background:** Opaque
- **Prompts (one each):**
  1. A family's evening on a spacious balcony with planters and city lights beyond; faces not in focus, warm lamp light
  2. A sunlit premium living room: ivory walls, walnut, a maroon velvet accent chair, a large window onto greenery
  3. A rooftop infinity pool at dusk with the skyline, empty loungers, warm uplights
  4. A landscaped podium garden path with palms and soft path lights at blue hour
- **Mood:** Quiet luxury, lived-in, aspirational
- **Match references:** Tone of `05-lifestyle-about/`

### A16 · Brand Monogram Assets
- **Files:** `monogram-foil.png`, `ghost-s.png`
- **Size:** 2000 × 2000
- **Background:** **Transparent**
- **Prompt:** Recreate the SR house-monogram (reference: `01-brand/silfira-spaces-maroon.jpg`) as **embossed champagne-gold foil**, a subtle metallic gradient and a soft inner bevel, perfectly centred. A second file: the large serif "S" alone as a flat ivory shape for the ghost watermark.
- **Note:** Best traced to SVG by hand afterwards; the AI version is for the foil texture reference only.

### A17 · Grain & Paper Textures
- **Files:** `grain.png` (512 × 512 tileable, transparent, monochrome noise), `paper-ivory.jpg` (2048 × 2048 tileable, very subtle warm cotton paper)

### A18 · Upscaled Property Renders
- **Files:** `property-1.jpg` … `property-7.jpg`
- **Size:** 2400 × 3000 (4:5) and 2400 × 1600 (3:2) crops
- **Prompt (image-to-image):** Upscale and enhance this architectural render to 4K clarity. **Keep the building design exactly the same.** Improve sharpness, extend the canvas naturally (more sky above, more landscaped greenery below), unify the grade to warm dusk with subtle maroon-plum shadows. Remove any text/logos/watermarks.
- **Input:** each file in `02-architecture-style/`

### A19 · Social / OG Share Image
- **File:** `og-image.jpg`, 1200 × 630, Opaque
- **Prompt:** A composition of A1 + A3 + A5 with generous empty oxblood space on the left for the logo (added in code).

---

### Priority order (if you generate in batches)
1. **Must have:** A3, A5, A1, A2, A4, A18
2. **Signature moments:** A7 + A8, A9, A12
3. **Polish:** A6, A10, A11, A13, A14, A15, A16, A17, A19

### Delivery format
- PNG-24 with alpha for transparent assets; JPG at quality 90 for opaque ones
- Put them in a folder named `generated/` with the filenames above, and I'll convert to AVIF/WebP and wire them in

---

## 6. Reference pack (attached)

**`silfira-design-references.zip`** (project root, about 7.8 MB):

| Folder | Contents | Feed to the AI for |
|---|---|---|
| `01-brand/` | Maroon brand card, black logo, SVG monogram | A16, palette consistency, OG image |
| `02-architecture-style/` | 7 developer property renders | **A3, A7, A8, A18**: architecture style and dusk lighting |
| `03-hero-photo/` | Current hero (`home.jpg`) | Mood reference for the upward tower perspective |
| `04-people-style/` | Advisor portraits | A13 background replacement |
| `05-lifestyle-about/` | 8 "why choose us" photos | A15 tone |

**Tip:** For every architecture prompt, attach `02-architecture-style/1.png` and `2.png` as style references with a strength of about 0.6.

---

## 7. Build plan once the assets arrive

1. Design tokens: extended palette, fonts, easing curves, spacing scale
2. Motion infrastructure: Lenis, GSAP ScrollTrigger, a reduced-motion hook, shared `Reveal` / `MaskText` / `Parallax` components
3. Home: layered hero → pinned "Street to Sky" → horizontal collection → map → partners → advisors → testimonials → night CTA
4. Rebuild About / PropertyDetail / Agents / Contact / Valuation in the same language
5. Preloader, page transitions, custom cursor, magnetic buttons
6. Image pipeline: AVIF/WebP and `srcset`; Lighthouse ≥ 90 performance target on mobile
7. QA on mobile, tablet and desktop; reduced-motion check
