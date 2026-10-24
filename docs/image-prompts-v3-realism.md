# Silfira Realtors: Realism Pass Prompt Pack (v3)

> Follow-up to `SILFIRA_FRESH_ASSET_PROMPTS.md`. The buildings are working well. This pass fixes what still feels off: **artificial greenery, colours that are too saturated, and an over-rendered "CGI" look.** The goal is a calm, photographic, believable finish, as if shot by an architectural photographer on a real evening in Gandhinagar.

---

## 0. Workflow (please follow this order)

**What I already changed on the website (no new images needed):**
- Official Silfira logo now used everywhere (header, footer, intro screen, watermarks). The old SVG and the AI "foil" monogram are no longer used.
- Property grid rebuilt: equal-height cards, one aspect ratio, cleaner filters and pricing.
- Hero decluttered: removed the ghost wordmark, light haze, left foliage and scroll hint; calmer motion; text smaller. The right-side branch is back to full size, and the bottom garden is now a compact cluster under the towers instead of a full-width strip.
- "Where spaces become homes" section redesigned as a calm, centred statement.
- Motion toned down across the site; a temporary softer colour grade applied to existing images.

**What needs new images (this file):** realistic greenery, softer skies, re-graded hero and property images, and a few new atmospheric shots. Once you send these back I'll swap them in and do the final colour and motion balance.

### Should you attach the logo?

| Asset group | Attach logo? | Why |
|---|---|---|
| Greenery, skies, buildings, interiors, lifestyle, water (G, K, R, P, L, W) | **No** | These are photographs. Attaching a logo often makes the AI put it on buildings, signage or glass. Colour consistency comes from the written palette instead. |
| Brand pattern and brand textures (B-01, B-02) | **Yes**: attach `brand/silfira-realtors-black.png` (or the light-blue logo you shared) | These assets are built from the logo's shape language (house roofline, thin strokes, high-contrast serif). |
| Everything architectural | **Attach an existing generated image instead** (listed in each asset's "Reference" row) | You liked the buildings, so they're the best reference for keeping the same architecture. |

**Where the references are:** the previously generated files are in your package `SILFIRA_GENERATED_ASSETS/generated/…` (same filenames as below).

---

## 1. Realism anchor (paste at the top of every photographic prompt)

> Real architectural photograph, not a 3D render. Shot on a full-frame camera (Sony A7R V / Canon R5) with a 24–35 mm tilt-shift lens, natural exposure, true-to-life colour, gentle contrast, realistic dynamic range, very fine natural grain. Location: Gandhinagar, Gujarat, India, a planned, green city with wide avenues. Calm early-evening light, 15–25 minutes after sunset, soft and even, with only subtle warmth. Colour grade: muted and refined, lifted blacks, desaturated oranges, soft dusty-rose and mauve sky, warm ivory highlights, neutral greens. Nothing glows, nothing is neon. Looks like a page from a luxury architecture magazine.

### Greenery realism rules (append to every asset containing plants)

> Native and commonly planted Gujarat landscape species only: neem, peepal, banyan, rain tree (samanea), Indian almond, ashoka (tall slim), royal and foxtail palms used sparingly, bougainvillea only as a small accent, clipped hedges, ground-level grasses. Real botany: irregular branch structure, varied leaf sizes, natural gaps where sky shows through the canopy, some leaves in shadow, slight leaf movement blur, a few dry or yellowing leaves, natural variation in green (olive, sage, deep green, a little yellow-green). Leaves are matte, not glossy. No perfectly round "lollipop" trees, no repeated identical trees, no plastic-looking shrubs, no oversaturated emerald green, no glowing backlit leaf edges.

### Global negative prompt (append to every asset)

> 3D render look, CGI, video-game look, plastic foliage, oversaturated greens, neon orange sky, glowing edges, HDR halo, bloom, lens flare, sun rays, heavy vignette, fake bokeh balls, identical repeated trees, lollipop trees, perfectly symmetrical landscaping, cartoon, illustration, text, signage, logos, watermark, people's faces, cars in the foreground, construction cranes, overly glossy glass, chromatic aberration, over-sharpened edges

### Palette (for reference, not as flat colours)

| Role | Hex | Note |
|---|---|---|
| Sky top | `#3a2a3c` → `#5b4458` | dusty plum, **not** saturated purple |
| Sky horizon | `#d9a99a` → `#e8c7b4` | soft peach-rose, **not** orange |
| Brand maroon (UI only) | `#4b0617` | appears only as a subtle shadow tint |
| Champagne light | `#e6cf9f` | window light, warm but low intensity |
| Greens | `#4f5a3f`, `#6b7452`, `#2f3a2a` | olive and sage, never emerald |
| Stone | `#c9b9a6` | warm taupe facade |

---

## 2. GREENERY (highest priority) 🔲 = transparent PNG

### G-01 · Hero garden cluster 🔲 (replaces `hero/hero-trees-mid.png`)
> **Changed after review:** the old strip ran edge to edge and felt spread out. The site now shows the garden as **one composed planting under the towers**, fading out toward the headline. Generate it as a cluster, not a band.

| Field | Spec |
|---|---|
| Placement | Home hero, mid-ground, centred under the towers (right 60% of the screen on desktop, centred on mobile). Fades to nothing on the left via a CSS mask |
| Size | 3200 × 1200 (≈8:3) |
| Format | Transparent PNG, true alpha, no halo |
| Composition | A layered, **compact** garden: back row of 2–3 mature trees (one broad rain tree, one neem, one slim royal palm) rising highest **just right of centre**; middle row of rounded but irregular shrubs and a frangipani; front row of low clipped hedge, ornamental grasses and a short honed-stone planter wall with 3–4 small, soft path lights. Height falls away smoothly to both ends (ends no taller than 25% of the image). Dense and opaque along the bottom 35% |
| Depth | Three clear planes (back trees slightly softer and cooler, front hedge sharpest) so it doesn't read as one flat sticker |
| Light | Evening, soft; a faint warm edge on leaves facing left; real shadow inside the canopy |
| Parallax | 0.65× scroll; scales to 1.1 |
| Reference | `hero/hero-trees-mid.png` (layout and scale only; make it photographic and compact) |
| Filename | `generated/v3/hero-garden-cluster.png` |

**Prompt:**
> [REALISM ANCHOR] A compact, layered landscaped garden photographed at eye level in early evening, isolated on a transparent background: in the back, one broad rain tree, one neem and one slender royal palm grouped just right of centre as the tallest point; in the middle, irregular flowering shrubs and a small frangipani tree; in the front, a low clipped hedge, soft ornamental grasses and a short honed-stone planter wall with three small warm path lights. The planting is tallest near the centre and tapers naturally to low hedges at both ends. Three readable depth planes, real shadow inside the canopy, matte varied greens, natural gaps where light passes between leaves. Bottom edge flat and dense. [GREENERY RULES]

**Negative:** [GLOBAL NEGATIVE], continuous wall of trees, evenly spaced trees, sky, buildings, lawn, people, benches

### G-02 · Foreground branch frame, right 🔲 (refines `hero/foliage-right.png`)
> **Keep what works:** the current right-side branch is a favourite: rich, layered leaves with a few bougainvillea accents, framing the towers. The site has restored it to full size. This prompt keeps that look and only makes it more natural.

| Field | Spec |
|---|---|
| Placement | Hero right edge, top to about 90% of the screen height (also inner-page headers) |
| Size | 1600 × 3200 (1:2) |
| Format | Transparent PNG |
| Composition | Same silhouette as the current asset: a full, layered branch entering from the top-right and cascading down the right edge, heaviest in the top third, thinning toward the bottom. Occupies the outer 40% of width. Mix of broad leaves and fine neem leaflets, with **8–12 small bougainvillea bracts** in a muted, dusty magenta (`#9c3d5c`), clustered in two or three natural groups, not scattered evenly |
| Focus | Outermost leaves softly out of focus, inner leaves sharper (depth of field, not blur everywhere) |
| Light | Gentle evening backlight: a soft, thin warm edge on some leaves, the rest in rich olive shade. No glowing outlines |
| Parallax | Fastest layer; drifts outward and scales up slightly on scroll |
| Reference | **Attach `hero/foliage-right.png`** and say "same silhouette and fullness" |
| Filename | `generated/v3/foliage-right.png` |

**Prompt:**
> [REALISM ANCHOR] Recreate the attached foreground branch with the same silhouette, fullness and placement, but as a real photograph: a lush branch cascading down from the top-right corner, isolated on a transparent background, mixing broad tropical leaves with fine neem leaflets, and two or three natural clusters of small bougainvillea bracts in a muted dusty magenta. Shallow depth of field: outer leaves softly out of focus, inner leaves crisp. Soft evening backlight gives a thin, subtle warm edge to some leaves; most of the foliage sits in rich olive shade. Matte leaves, natural variation, a few slightly yellowed leaves. Heaviest in the top third, thinning downward; the inner 60% of the canvas fully transparent. [GREENERY RULES]

**Negative:** [GLOBAL NEGATIVE], bright pink flowers everywhere, evenly scattered flowers, neon magenta, glowing leaf edges, hard cut-out edges

### G-03 · Foreground branch frame, left 🔲 (optional)
Same as G-02 mirrored, but **lighter and smaller** (outer 25% of width, top 35% of height). Use peepal leaves (heart-shaped) for variety. Filename `generated/v3/foliage-left.png`.

### G-04 · Closing scene foreground trees 🔲 (replaces `closing/closing-trees-front.png`)
| Field | Spec |
|---|---|
| Placement | Bottom of the closing night-skyline section |
| Size | 3840 × 1000 |
| Format | Transparent PNG |
| Composition | Dark tree canopies along the bottom edge, rising slightly at both ends, low in the middle. Night: mostly silhouette with real leaf texture, a few small garden lights glowing softly through the leaves |
| Reference | `closing/closing-trees-front.png` |
| Filename | `generated/v3/closing-trees-front.png` |

**Prompt:**
> [REALISM ANCHOR, night variant: shot at night, 40 minutes after sunset] A wide strip of real garden tree canopies along the bottom of the frame, isolated on a transparent background: neem, rain tree and a few palms, seen almost as silhouettes against the night, with real leaf texture visible at the edges and three or four small warm garden lamps glowing softly between the trunks. Canopy rises gently at the left and right ends and stays low in the centre. [GREENERY RULES]

### G-05 · Podium garden base 🔲 (new, for the "Street to Sky" tower)
| Field | Spec |
|---|---|
| Placement | In front of the base of the single tower in the pinned "Street to Sky" chapter, hiding the hard bottom edge |
| Size | 2400 × 800 |
| Format | Transparent PNG |
| Prompt | > [REALISM ANCHOR] A narrow strip of a real landscaped podium garden at the foot of a residential tower, isolated on a transparent background: clipped hedges, ornamental grasses, a frangipani tree, two short palms, low travertine planters, a few soft path lights. Daylight-neutral so it works for both day and dusk (soft overcast evening light). [GREENERY RULES] |
| Filename | `generated/v3/story-podium-garden.png` |

---

## 3. SKIES (softer and calmer)

### K-01 · Hero sky (replaces `hero/hero-sky-desktop.jpg` and `hero-sky-mobile.jpg`)
| Field | Spec |
|---|---|
| Size | Desktop 3840 × 2160; mobile 1440 × 3120 |
| Format | Opaque JPG |
| Safe space | Upper-left 55% calm and slightly darker for the white headline |
| Reference | `hero/hero-sky-desktop.jpg` (composition only; **much less saturated**) |
| Filename | `generated/v3/hero-sky-desktop.jpg`, `generated/v3/hero-sky-mobile.jpg` |

**Prompt:**
> [REALISM ANCHOR] A real evening sky photographed about 20 minutes after sunset, no ground. Smooth, muted gradient: soft peach-rose low at the horizon (bottom 20%), fading through dusty mauve to a deep, desaturated plum-grey at the top. A few thin, soft, low-contrast stratus clouds in the middle third, faintly lit on their undersides. The upper half quiet and darker. Subtle, natural, calm; like a real photograph, not a painting. No sun, no stars.

**Negative:** [GLOBAL NEGATIVE], vivid orange, fiery sunset, dramatic clouds, saturated purple, banding

### K-02 · Story sky, late afternoon (replaces `story/story-sky-day*.jpg`)
3840 × 2160 and 1440 × 2560, opaque. Prompt: "[REALISM ANCHOR, late afternoon variant] A calm late-afternoon sky with soft haze: pale ivory-blue at the top, warming very gently to a light sand-peach at the horizon, two or three soft, flat, low-contrast clouds. Muted and airy." Filenames `generated/v3/story-sky-day.jpg`, `generated/v3/story-sky-day-mobile.jpg`.

### K-03 · Story sky, blue hour (replaces `story/story-sky-bluehour*.jpg`)
Same sizes. Prompt: "[REALISM ANCHOR] A clear blue-hour sky: deep muted indigo-slate at the top, softening to dusty lavender, with only a narrow, pale rose band at the horizon. Very faint stars in the top fifth. Calm, desaturated, photographic." Filenames `generated/v3/story-sky-bluehour.jpg`, `generated/v3/story-sky-bluehour-mobile.jpg`.

---

## 4. RE-GRADES OF IMAGES YOU ALREADY LIKE (image-to-image)

**Method for all R- and P- assets:** upload the existing image, ask for an edit, and paste the prompt. **Keep the architecture exactly the same.**

> Shared edit instruction: "Keep the building design, floor count, facade, materials, camera angle and composition exactly the same. Make the image look like a real architectural photograph rather than a render: natural, muted colour; softer, less orange sky; reduce window glow by about 40% so it looks like real interior lighting; replace all trees and plants with realistic, matte, varied, irregular Gujarat landscaping (neem, rain tree, a few palms, clipped hedges), with natural gaps and some shadow; remove any glow, bloom and HDR halos; add very fine natural film grain. [GREENERY RULES]"

### R-01 · Hero towers 🔲 (re-grade `hero/hero-towers.png` and `hero-towers-mobile.png`)
Keep transparency. Same size as the input. Only the facade, glass and podium plants change. Filename `generated/v3/hero-towers.png`, `generated/v3/hero-towers-mobile.png`.

### R-02 · Story tower day and dusk 🔲 (re-grade `story/story-tower-day.png` and `story-tower-dusk.png`)
Keep transparency and **identical framing between the two** (do the day one first, then use it as the reference for the dusk one). Filenames `generated/v3/story-tower-day.png`, `generated/v3/story-tower-dusk.png`.

### P-01 … P-07 · Property portraits (re-grade `collection/property-N-portrait.jpg`)
1122 × 1402 or larger, opaque. Also re-grade `property-N-landscape.jpg` the same way. Filenames `generated/v3/property-N-portrait.jpg`, `generated/v3/property-N-landscape.jpg`. Do these in one batch so they look like one photo shoot.

### R-03 · Closing skyline base (re-grade `closing/closing-skyline-base.jpg` and mobile)
Muted night, fewer lit windows (about 25%), softer glow, realistic trees. **Do not** regenerate the window layer; I'll rebuild it from your new base. Filenames `generated/v3/closing-skyline-base.jpg`, `generated/v3/closing-skyline-base-mobile.jpg`.

---

## 5. "WHERE SPACES BECOME HOMES" BACKGROUND

### W-01 · Water court at dusk (replaces `lifestyle/water-channel.jpg`)
| Field | Spec |
|---|---|
| Placement | Full-bleed background behind the centred brand statement |
| Size | 3840 × 2160 desktop; 1440 × 2560 mobile crop |
| Format | Opaque JPG |
| Composition | Symmetrical, calm, one-point perspective down a long, still reflecting pool in a residential entrance court. Travertine edges, a colonnade or arched loggia on both sides, a few palms and frangipani, soft lanterns. **The centre 50% must be calm and darker (still water and soft shadow) for white text.** |
| Light | Blue hour, very soft; reflections clear and still |
| Mood | Quiet, serene, luxurious |
| Parallax | Slow zoom-out on scroll |
| Filename | `generated/v3/water-court.jpg`, `generated/v3/water-court-mobile.jpg` |

**Prompt:**
> [REALISM ANCHOR] A calm, symmetrical, one-point-perspective photograph down a long, still reflecting pool in the entrance court of a luxury residence at blue hour. Honed travertine edges, a simple arched loggia on both sides with soft warm lanterns, two rows of slender palms and a few frangipani trees, mirror-still water reflecting the arches and the muted dusk sky. The middle of the frame is quiet and slightly darker (water and soft shadow), with no bright highlights. Serene, minimal, believable. [GREENERY RULES]

**Negative:** [GLOBAL NEGATIVE], fountains spraying, ripples, people, bright spotlights, colourful lights

---

## 6. NEW ATMOSPHERIC IMAGES (make the site feel lived-in)

| ID | Title | Size / format | Placement | Prompt (after the realism anchor) | Filename |
|---|---|---|---|---|---|
| N-01 | Tree-lined Gandhinagar avenue | 3840 × 2160 JPG | Neighbourhoods section background (replaces the aerial) | "A wide, quiet, tree-lined avenue in Gandhinagar at early evening, mature neem and rain trees forming a canopy over a clean road with a footpath, low-rise and mid-rise beige residential buildings partly visible behind the trees, two or three cyclists far away, soft street lamps just switched on. Muted, natural." | `n01-avenue.jpg` |
| N-02 | Morning light in a living room | 2400 × 3000 JPG | About and property detail galleries | "A real, lived-in contemporary Indian apartment living room in soft morning light: linen sofa, walnut coffee table with a book and a brass bowl, a jute rug, sheer curtains, a large window with a neem tree outside. Calm, natural colour, a little imperfect." | `n02-living-morning.jpg` |
| N-03 | Balcony planters close-up | 2400 × 3000 JPG | Lifestyle section, property detail | "Close-up of a residential balcony at golden hour: terracotta and stone planters with tulsi, money plant and a small frangipani, a cane chair edge, a cup of chai on a ledge, softly blurred city and trees beyond. Natural colour, shallow depth of field." | `n03-balcony-planters.jpg` |
| N-04 | Site-visit walkway | 3000 × 2000 JPG | Home intro (next to your real photo) | "A clean, newly landscaped walkway leading to the glass lobby of a modern residential tower at early evening, stone paving, low hedges, path lights, a family of three seen from behind walking toward the entrance, small in frame. Realistic, quiet." | `n04-walkway.jpg` |
| N-05 | Clubhouse pool, daylight | 3000 × 2000 JPG | Property amenity galleries | "A residential rooftop pool in late-afternoon daylight, light travertine deck, a few teak loungers, potted olive trees, real water with gentle reflections, city and greenery beyond. Natural colour, not glossy." | `n05-pool-day.jpg` |
| N-06 | Neighbourhood vignettes, re-shoot | 1600 × 1600 JPG each | Neighbourhood hover cards | Re-generate the four `location/locality-*.jpg` images with the realism anchor and greenery rules; keep the same subject for each (Sargasan boulevard, Kudasan café street, Raysan green open space, PDEU and Palm Road palm avenue). | `locality-<name>.jpg` |

People in N-01 and N-04: small, distant or seen from behind only; no visible faces.

---

## 7. BRAND ASSETS (attach the logo for these two only)

### B-01 · Roofline line pattern
| Field | Spec |
|---|---|
| Attach | **Yes**: the Silfira logo |
| Size | 2048 × 2048, seamless tile |
| Format | Transparent PNG |
| Placement | Very faint background texture in the maroon sections (about 4% opacity) |
| Prompt | > Using the attached logo only as a shape reference: a seamless, minimal repeating pattern made from the logo's thin house-roofline stroke (the angled roof and single vertical wall line), drawn as single uniform hairlines in ivory on a transparent background, widely spaced in an offset grid, with generous empty space. No letters, no "SR", no text, no shading. Elegant and quiet. |
| Filename | `generated/v3/brand-roofline-pattern.png` |

### B-02 · Embossed paper texture with monogram
| Field | Spec |
|---|---|
| Attach | **Yes**: the Silfira logo |
| Size | 2400 × 1600 |
| Format | Opaque JPG |
| Placement | Background for the contact and enquiry panels |
| Prompt | > Using the attached logo: a photograph of thick, warm ivory cotton paper with the house-and-SR monogram blind-embossed (no ink, just a subtle raised impression), placed small in the lower-right corner, soft raking light from the left showing the paper fibres. Mostly empty paper. No other text. |
| Filename | `generated/v3/brand-emboss-paper.jpg` |

---

## 8. Priority and delivery

| Priority | Assets |
|---|---|
| **1 · Must have** | G-01 (garden cluster), G-02 (right branch), K-01, R-01, P-01…P-07 (portrait + landscape), W-01 |
| **2 · Strongly recommended** | G-04, G-05, K-02, K-03, R-02, R-03, N-01 |
| **3 · Nice to have** | G-03, N-02…N-06, B-01, B-02 |

- Put everything in `generated/v3/` with the filenames above and send the folder or ZIP.
- Transparent assets: PNG with a true alpha channel, no checkerboard, no white or dark fringe.
- If your tool caps resolution, the largest size it offers is fine. I'll optimise everything to WebP.
- Quick self-check before sending: no text or logos in photographic images; greens look olive and natural; skies are soft rose and plum, not orange and purple; nothing glows.

---

## 9. After the v3 delivery: status and one optional retry

**Integrated:** hero sky, hero towers, garden cluster (G-01), story towers, skies and podium garden, all 7 property pairs, water court (W-01), avenue (N-01), locality images, closing skyline and trees. The closing window lights were built in code from your new skyline, so **no window layer needs to be generated.**

**Kept from the previous set on purpose:** the right-side branch (`hero/foliage-right.png`, v2). The v3 branch came out thin and sparse, and the fuller original works better in the composition. The soft sun rays (`hero-light-haze`) are also back, at a gentle strength.

### G-02b · Optional retry: fuller right-side branch 🔲
Only generate this if you want the branch to be more photographic. It **must be at least as full as the original.**

| Field | Spec |
|---|---|
| Attach | `hero/foliage-right.png` (v2, the full one) and say "match this fullness exactly" |
| Size | 1600 × 3200, transparent PNG |
| Coverage | Leaves fill the outer 40% of the width over the top 85% of the height; the top third is dense with almost no gaps |
| Filename | `generated/v3b/foliage-right.png` |

**Prompt:**
> [REALISM ANCHOR] Recreate the attached foreground branch with exactly the same fullness, density and silhouette: a lush, layered cascade of leaves entering from the top-right corner and filling the outer 40% of the frame down to about 85% of its height, densest in the top third. Mix of broad tropical leaves and fine neem leaflets in matte olive and deep green, with two or three natural clusters of muted dusty-magenta bougainvillea. Shallow depth of field: outer leaves softly blurred, inner leaves crisp. Soft evening backlight with a thin warm edge on some leaves. Isolated on a transparent background; the inner 60% of the canvas fully transparent. [GREENERY RULES]

**Negative:** [GLOBAL NEGATIVE], sparse branch, single vine, thin strand, bare twigs, large gaps
