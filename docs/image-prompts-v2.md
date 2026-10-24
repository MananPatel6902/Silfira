# Silfira Realtors: Fresh Asset Prompt Pack (v2, no old photos)

> **This replaces `REAL_ESTATE_IMAGE_GENERATION_PROMPTS.md`.** Decision: none of the old photos (property renders, `home.jpg`, advisor portraits, About "why" photos, testimonial image) will be used, **except the two real photo-booth / site-visit photos** (`About/WhatsApp Image 2025-12-23 at 10.28..jpeg`: an advisor showing a client the scale model, and `About/why1.jpg`: the same scale model), which stay because it is genuine proof of Silfira's work. No other old photo is used on the new site or as a generation reference. Every other visual is generated fresh from the written prompts below, so the whole site shares one consistent art direction.
>
> **What we still keep from the current site:** brand identity only, which is not a photo: the Silfira logo/monogram (official SVG, added in code), the maroon/blush/ivory palette, serif typography, the ghost "S", and all copy and property data (names, prices, BHK, areas, locations). Developer partner logos stay as logos.
>
> **Brand:** Silfira Realtors · "Where Spaces Become Homes" · Gandhinagar (Sargasan, Kudasan, Raysan, PDEU / Palm Road)
> **Concept:** *"Maroon Dusk": a walk from street to sky.* Scrolling moves the visitor from a garden gate at golden hour, up past the towers, into blue hour, and ends on a lit evening skyline.

---

## 0. How to use this file

1. For each asset: paste the **Global Style Anchor** (§1), then the asset's **Prompt**. No old reference images are needed.
2. Paste the **Negative prompt** into the tool's negative field (or append "Avoid: …").
3. **Consistency chain instead of old references:** generate the **master asset S-02** first. Once you're happy with it, attach S-02 as the style/architecture reference for every other architecture asset (H-03, S-01, S-03, P-01…P-07, C-01). Attach H-01 as the sky/colour reference for other sky assets. Where a "Reference" field below names a generated asset ID, attach that output.
4. Save outputs as the **Suggested filename** in `generated/<folder>/`. Send PNG (alpha) or high-quality JPG/PNG; I'll convert to AVIF/WebP and make responsive sizes.
5. For layer sets (marked 🧩), generate **all layers from the same base scene / seed** so perspective and light match.

---

## 1. Global Style Anchor (paste at the top of every architecture/landscape prompt)

> Photorealistic premium architectural visualisation of a contemporary Indian luxury residential development in Gandhinagar, Gujarat. Architecture: elegant high-rise towers with warm taupe/beige stone-finish facades, slender vertical fins, full-height glass balconies with thin dark railings, balcony planters, crown pergola frames, landscaped podiums with palms and neem trees. Believable, restrained, not glossy or CGI-plastic: real material texture, soft natural shadows, subtle atmospheric haze, accurate scale. Colour grade: ivory highlights, warm champagne light (#c9a46a / #e6cf9f), deep shadows gently tinted toward oxblood maroon (#3b0310). Natural foliage greens, slightly desaturated. Cinematic, calm, quietly luxurious. Shot on a full-frame camera with a tilt-shift-corrected architectural lens, no converging-verticals distortion unless stated. Extremely clean edges, high detail, no text, no logos, no watermarks.

**Transparent-asset rule (append to every 🔲 transparent asset):**
> Output a true alpha-channel PNG. Subject isolated on a fully transparent background. No checkerboard pattern baked in, no white or dark halo/fringe, no drop shadow, no ground plane unless specified. Clean anti-aliased edges, fine leaf and railing detail preserved. Keep ~4% empty padding on edges that are not meant to bleed off-canvas.

**Global negative prompt (append to every asset):**
> text, letters, signage, logos, watermark, signature, UI elements, frame, border, cartoon, illustration (unless requested), oversaturated, HDR halos, plastic CGI look, overly glossy, fisheye distortion, warped or melting geometry, inconsistent floor counts, floating objects, duplicated windows pattern errors, lens flare, chromatic aberration, noise, jpeg artefacts, cars in foreground, power lines, clutter, construction cranes, people's faces in close-up, deformed hands

### Palette reference
| Token | Hex | Role in images |
|---|---|---|
| Oxblood | `#3b0310` / `#4b0617` | Deepest sky top, shadow tint, vignettes |
| Wine | `#8d2942` | Rare accent (a velvet chair, bougainvillea) |
| Blush | `#f6dce1` | Horizon glow, soft highlights |
| Ivory | `#fbf7f8` / `#f5efe9` | Light backgrounds, walls |
| Champagne | `#c9a46a` → `#e6cf9f` | Window light, rim light, line art |
| Dusk indigo | `#1d2a3a` | Blue-hour/night skies only |

### Folder layout for deliveries
```
generated/
  hero/          H-01 … H-08
  story/         S-01 … S-06
  collection/    P-01 … P-07 (+ crops)
  location/      L-01 … L-03
  lifestyle/     LS-01 … LS-06
  people/        T-01, T-02
  closing/       C-01 … C-03
  inner-pages/   I-01 … I-04
  ui/            U-01 … U-05
```
Final web paths after optimisation: `frontend/public/images/v2/<folder>/`.

---

## 2. Priority summary

| Priority | Assets | Why |
|---|---|---|
| **P0 – must have** | H-01 … H-06, P-01 … P-07 | Hero world + the properties themselves |
| **P1 – signature moments** | S-01 … S-04, C-01 … C-03, L-01 | Pinned "Street to Sky" chapter, closing skyline, map |
| **P2 – richness** | LS-01 … LS-06, I-01 … I-04, T-01/T-02, S-05/S-06, H-07/H-08 | About, inner pages, advisors, lifestyle |
| **P3 – polish** | U-01 … U-05 | Textures, icons, OG image |

---

## 3. HERO: "Discover your dream space" 🧩 layered parallax scene

The hero becomes a 6-layer depth scene. On load the towers rise ~6% while foliage drifts in; on scroll the layers separate (foliage fastest and parting outward like walking through a garden gate, sky slowest), the headline sits *between* layers (behind tower crown, in front of skyline), and the scene scales into the next section. Mobile: 3 layers (H-01 mobile, H-03 mobile, H-05 single), shorter travel.

**Shared scene description for all hero layers (generate H-01 → H-05 from this one composition):**
> Camera at human eye level standing inside a landscaped garden, looking slightly upward toward a cluster of three luxury towers 120 m away. Golden-hour-to-dusk transition: sun just set behind the viewer's left, sky warm at horizon, deep plum at the top. Warm amber light in about 35% of windows.

### H-01 · Hero Sky (background layer)
| Field | Spec |
|---|---|
| Purpose | Base atmosphere and text-safe area for the headline |
| Placement | Home hero, layer 1 (furthest back); fills viewport |
| Priority | P0 |
| Size | Desktop 3840 × 2160 (16:9); Mobile 1440 × 3120 (≈9:19.5) |
| Background | Opaque · JPG → AVIF/WebP |
| Desktop / mobile use | Full-bleed `object-cover`; mobile uses portrait version |
| Style / palette | Painterly-photoreal sky; apricot `#f2b48a` and blush at horizon → mauve → oxblood `#3b0310` at top |
| Composition | Horizon at bottom 18%; thin long cirrus clouds in middle third, drifting right; clean darker upper 45% |
| Camera / perspective | Eye level, slight upward tilt; no ground visible |
| Light / time | 10 minutes after sunset, sun below horizon left |
| Mood | Serene, aspirational, warm |
| Depth | Atmospheric only; clouds slightly softer at top |
| Safe space | Upper-left 55% × 45% must be calm and dark for white serif headline |
| People / text | None / none |
| Layering | Sits under H-02. Clouds could be split later if needed |
| Animation | Slowest parallax (0.1×); very slow 40 s horizontal cloud drift via background-position; colour shift toward rose as scroll progresses |
| Filename / folder | `hero-sky-desktop.jpg`, `hero-sky-mobile.jpg` → `generated/hero/` |
| Reference | None (this becomes the sky/colour reference for other sky assets) |

**Prompt:**
> A wide, empty cinematic sky ten minutes after sunset, seen from ground level looking slightly upward. Smooth gradient: soft apricot and blush rose glowing at the very bottom (lowest 18%), rising through dusty mauve and muted lavender to deep oxblood-plum (#3b0310) at the top. A few long, thin, wind-stretched cirrus clouds float horizontally across the middle third, their undersides lightly lit warm peach. The upper half is clean, dark and calm with no detail. No sun disc, no buildings, no trees, no ground, no birds, no stars. Photographic, fine gradient with no banding, subtle film grain.

**Negative:** global + "sun, moon, birds, aircraft, buildings, ground, banding, rainbow, dramatic storm clouds, neon colours"

### H-02 · Distant Skyline Silhouette 🔲
| Field | Spec |
|---|---|
| Purpose | Establish city context (Gandhinagar / GIFT City) and depth |
| Placement | Hero layer 2, bottom 35% of viewport |
| Priority | P0 |
| Size | 3840 × 1100 (≈3.5:1); mobile reuses a 1600 px centre crop |
| Background | Transparent · PNG → WebP alpha |
| Style | Atmospheric-perspective matte painting, low contrast |
| Architecture | Mixed mid/high-rise residential + a few slender glass commercial towers, flat roofs, no iconic landmarks |
| Palette | Single hazy plum-grey `#6a4a55`, faint warm rim light on right edges, tiny amber windows (5–8%) |
| Composition | Varied roofline, tallest buildings off-centre right; flat bottom edge; the centre third lower (where hero towers will stand) |
| Camera | Eye level, ~2 km distance, compressed telephoto feel |
| Light | Backlit dusk, haze |
| Depth | Two subtle density bands: farthest row lighter/hazier |
| People / text | None |
| Animation | 0.2× parallax; window lights can twinkle on later via CSS mask |
| Filename | `hero-skyline-far.png` → `generated/hero/` |
| Reference | H-01 output (colour) |

**Prompt:**
> Panoramic silhouette strip of a modern Indian city skyline seen from about two kilometres away at dusk, isolated on a transparent background. Mid-rise and high-rise residential towers mixed with a few slim glass office towers, all rendered in a soft hazy plum-grey with low contrast, as if seen through warm evening haze. A faint warm rim light catches the right-hand edges. Very small scattered warm amber window lights on roughly 6% of windows. Roofline varies in height, slightly lower in the centre third. Perfectly flat, clean bottom edge. No sky, no ground, no trees, no landmarks.

**Negative:** global + "sky, ground, trees, sharp detail, high contrast, landmark towers, Burj, Eiffel, temples, domes"

### H-03 · Hero Signature Tower Cluster 🔲 ⭐
| Field | Spec |
|---|---|
| Purpose | The hero subject: immediately says "premium residential developer" |
| Placement | Hero layer 3, right 60% on desktop; centred and cropped on mobile |
| Priority | P0 (most important asset) |
| Size | Desktop 2400 × 3600 (2:3); Mobile variant 1600 × 2800 (4:7) with tighter crop of main tower |
| Background | Transparent · PNG → WebP alpha (≈ 350 KB target) |
| Architecture | Three contemporary towers, 18–22 floors; taupe stone cladding, slim full-height vertical fins framing bays, glass balconies with thin dark railings and planters, double-height lobby, crown pergola on tallest tower, warm wood soffits on balcony undersides |
| Materials | Honed beige stone, bronze-tinted glass, warm teak soffits, dark metal railings |
| Composition | Tallest tower centre, top at 6% from canvas top; two towers staggered behind left and right; podium base cut flat at bottom 6% |
| Camera | Low eye level, three-quarter view from left, 35 mm, verticals corrected |
| Light / time | Dusk: golden rim light on left edges, amber 2700K light in ~35% of windows, soft uplights on podium |
| Mood | Prestigious, welcoming, warm |
| Depth | Rear towers slightly hazier/cooler than front tower |
| Safe space | Left 40% of the hero stays clear for headline (composition handled in code) |
| People / text | None / none |
| Layering | Base hidden behind H-04 trees; "dream space." headline can sit behind the crown |
| Animation | Rise-in on load (y 6% → 0), 0.45× parallax, slow scale 1 → 1.08 on scroll; optional window-light layer (H-03b) |
| Filename | `hero-towers.png`, `hero-towers-mobile.png` → `generated/hero/` |
| Reference | **S-02 output** (architecture, strength ~0.6) + H-01 (colour) |

**Prompt:**
> A cluster of three elegant contemporary luxury residential towers, 18 to 22 floors, isolated on a transparent background. Three-quarter view from the lower left at eye level, verticals perfectly straight. The tallest tower stands in the centre with a refined crown pergola frame on its roof; two slightly shorter towers stand staggered behind it on the left and right, a little hazier from distance. Facades of warm taupe honed stone with slim full-height vertical fins framing each bay, generous full-height glass balconies with thin dark metal railings, small green planters on balconies, warm teak-wood soffits under each balcony. Dusk lighting: a soft golden rim light on the left edges, warm 2700K amber interior light glowing in about a third of the windows at random, gentle architectural uplighting on the base. The towers rest on a clean landscaped podium that is cut perfectly flat at the bottom. No sky, no surrounding buildings, no road, no cars.

**Negative:** global + "sky, ground plane, cars, road, other buildings, cranes, scaffolding, glass curtain-wall office look, blue-tinted glass, curved futuristic shapes, more than three towers"

**H-03b (optional) · Window-light layer** `hero-towers-windows.png`: same canvas and camera, transparent, *only* the glowing amber window panes from H-03. Used to fade windows on as the visitor scrolls. Prompt: "Using the attached tower image, output only the warm lit window panes as glowing amber shapes on a transparent background, exact same position and scale; everything else fully transparent."

### H-04 · Mid-ground Tree Line 🔲
| Field | Spec |
|---|---|
| Purpose | Hides tower bases, adds landscape richness, separates planes |
| Placement | Hero layer 4, bottom 30% |
| Priority | P0 |
| Size | 3840 × 1300; mobile 1600 × 900 crop |
| Background | Transparent · WebP alpha |
| Style | Photoreal landscape cut-out |
| Content | Neem, gulmohar with a few orange-red blooms, slender royal palms (nod to Palm Road), clipped round shrubs, a low stone boundary wall with soft warm path lights |
| Composition | Natural irregular top silhouette, taller palms off-centre left and right; dense and opaque in lower 50% |
| Camera / light | Eye level; warm dusk side light from left, cooler shadows |
| Depth | Slight softness on the farthest trees |
| Animation | 0.65× parallax; subtle sway via CSS skew on palms not needed (keep still) |
| Filename | `hero-trees-mid.png` → `generated/hero/` |
| Reference | H-03 output (light direction) |

**Prompt:**
> A continuous horizontal band of lush mature Indian landscape trees isolated on a transparent background: rounded neem trees, a gulmohar tree with a few orange-red blossoms, two tall slender royal palms, clipped ornamental shrubs, and a low warm-stone boundary wall with small glowing path lights along its top. Natural irregular treetop silhouette, dense and fully opaque in the lower half so it can hide building bases. Lit by warm dusk light from the left, cooler shadows on the right sides of the canopies. Bottom edge flat.

**Negative:** global + "sky, buildings, ground lawn extending out, people, benches, cars, sparse dead trees, autumn colours"

### H-05 · Foreground Foliage Frame (left + right) 🔲 ⭐
| Field | Spec |
|---|---|
| Purpose | Foreground depth; the "garden gate" that parts as you scroll |
| Placement | Hero layer 5, overlapping left and right edges; reused on inner-page heroes |
| Priority | P0 |
| Size | 1600 × 3200 each (1:2); mobile uses only the right frame at 900 × 1800 |
| Background | Transparent · WebP alpha |
| Content | Branches with large broad leaves + fine neem leaflets, a few bougainvillea bracts in wine `#8d2942` (subtle brand echo) |
| Composition | Foliage occupies outer 40% of the canvas, entering from the edge; inner side fully transparent; heavier mass in the top corner |
| Camera | Very close (1–2 m), shallow depth of field: outermost leaves soft-blurred, inner leaves sharper |
| Light | Backlit golden hour, glowing translucent leaf edges, deep green-black shadows tinted maroon |
| Animation | 1.3× parallax, translateX outward (−12% / +12%) and slight scale on scroll; subtle 6 s breeze rotation (±0.6°) on desktop only |
| Filename | `foliage-left.png`, `foliage-right.png` → `generated/hero/` |
| Reference | H-04 output (light direction) |

**Prompt:**
> Close foreground leafy branches entering the frame from the [LEFT / RIGHT] edge, isolated on a transparent background, as if the viewer stands under a garden tree looking out at a building. Large broad tropical leaves mixed with fine feathery neem leaflets and a few deep wine-red bougainvillea bracts. Shallow depth of field: the outermost leaves are softly blurred, inner leaves crisp. Strong golden-hour backlight makes the leaf edges glow warm and translucent; inner leaves fall into rich deep green shadow with a slight maroon tint. Foliage fills the outer 40% of the canvas and is heaviest in the upper corner; the inner 60% is completely transparent.

**Negative:** global + "trunk in centre, flowers dominating, fruit, insects, birds, hard cut edges, flat lighting, solid background"

### H-06 · Atmospheric Light Layer 🔲
| Field | Spec |
|---|---|
| Purpose | Warm haze + floating dust motes for air between layers |
| Placement | Hero layer 6 (top), `mix-blend-mode: screen` |
| Priority | P0 (cheap, large impact) |
| Size | 2560 × 1440; reused at 1280 on mobile |
| Background | Pure black (for screen blending) **or** transparent; black preferred · JPG |
| Content | Soft volumetric light shafts from upper-left + sparse golden dust motes 2–40 px, varied blur |
| Animation | Slow drift (translate 2% over 20 s), opacity tied to scroll (fades out by 50% scroll) |
| Filename | `hero-light-haze.jpg` → `generated/hero/` |

**Prompt:**
> On a pure black background: very soft volumetric warm light rays slanting down from the upper-left corner, extremely subtle, plus sparse floating golden dust motes and soft circular bokeh orbs of varied sizes and blur in warm champagne (#e6cf9f), denser near the upper-left and fading toward the lower-right. Nothing else.

**Negative:** global + "objects, stars, hard edges, rainbow, lens flare hexagons, bright white"

### H-07 · Static Hero Fallback (single composed image)
| Field | Spec |
|---|---|
| Purpose | Reduced-motion users, slow connections, OG base, poster before layers load |
| Placement | Hero (fallback/LCP poster) |
| Priority | P2 |
| Size | 2560 × 1440 desktop; 1170 × 2532 mobile |
| Background | Opaque · AVIF/WebP |
| Filename | `hero-composite-desktop.jpg`, `hero-composite-mobile.jpg` → `generated/hero/` |
| Reference | H-01 to H-05 outputs (attach them) |

**Prompt:**
> Compose the attached hero layers into one photograph: dusk plum sky, hazy distant skyline, three taupe luxury towers right of centre, a garden tree line hiding their base, glowing foliage framing the left and right edges. Keep the upper-left 50% calm and dark for headline text. Same lighting and palette as the layers.

### H-08 · Hero "Ken Burns" cinemagraph source (optional)
If your tool does video: a 6-second seamless loop of H-07 with leaves gently moving and two or three windows switching on. 1920 × 1080, H.264/WebM < 2.5 MB, no audio. Filename `hero-loop.mp4`. Used only on desktop with fast connections; layers remain the primary approach.

---

## 4. STORY CHAPTER: "From Street to Sky" 🧩 pinned scroll sequence

Pins for ~250 vh. Stage 1: line drawing draws itself. Stage 2: cross-fades to the rendered tower in daylight. Stage 3: sky and tower shift to blue hour and windows light up floor by floor. Side copy: **Location → Lifestyle → Legacy**. Mobile: no pin; three stacked frames with short cross-fades.

**All S-assets must share one identical camera and tower geometry.** Generate S-02 first, then use it as the image reference for S-01, S-03, S-04.

### S-01 · Tower Line Drawing 🔲
| Field | Spec |
|---|---|
| Purpose | Shows design intent and craftsmanship; draws itself on scroll |
| Placement | Story chapter, centre-right, stage 1 |
| Priority | P1 |
| Size | 2000 × 3000 (2:3), pixel-aligned with S-02/S-03 |
| Background | Transparent · PNG (I'll vectorise to SVG for stroke animation) |
| Style | Architectural perspective line drawing, uniform 2 px champagne `#c9a46a` lines |
| Content | Outline, floor lines, fins, window grids, balcony rails, a few construction guide lines and dimension ticks; no fill, no shading |
| Animation | SVG `stroke-dashoffset` draw, bottom to top |
| Filename | `story-tower-lineart.png` → `generated/story/` |
| Reference | S-02 output (strength 0.9 for geometry) |

**Prompt:**
> Precise architectural perspective line drawing of exactly the same tower as the attached image, identical camera and outline, on a transparent background. Thin uniform champagne-gold lines (#c9a46a) only: building outline, floor slab lines, vertical fins, window grid, balcony railings, rooftop pergola, plus a few faint construction guide lines extending past the edges and small dimension tick marks. No shading, no fill, no hatching, no text, no numbers.

**Negative:** global + "shading, colour fill, sketchy wobbly lines, pencil texture, text labels, numbers, people, trees"

### S-02 · Signature Tower – Day 🔲 (master)
| Field | Spec |
|---|---|
| Purpose | Stage 2: the building as it looks in life |
| Size | 2000 × 3000 (2:3) |
| Background | Transparent · WebP alpha |
| Architecture | Single 20-floor tower in the H-03 language: taupe stone, fins, glass balconies with planters, teak soffits, crown pergola, two-storey glazed lobby on a landscaped plinth |
| Camera | Straight-on slight three-quarter from right, eye level 80 m away, 50 mm, verticals corrected; tower top at 5% from canvas top, plinth cut flat at bottom |
| Light | Late afternoon, soft warm sun from right, gentle shadows, windows reflect a pale sky, no interior lights |
| Filename | `story-tower-day.png` → `generated/story/` |
| Reference | None. **This is the master asset; generate it first** |

**Prompt:**
> One contemporary luxury residential tower of 20 floors, isolated on a transparent background, slight three-quarter view from the right at eye level, verticals perfectly corrected, the whole building visible with the roof near the top edge and its landscaped plinth cut flat at the bottom. Warm taupe honed stone facade, slim full-height vertical fins, full-height glass balconies with thin dark railings and green planters, warm teak soffits, a refined crown pergola, a two-storey glazed lobby at the base surrounded by low shrubs. Late-afternoon soft sunlight from the right, gentle realistic shadows, windows reflecting a pale warm sky, no interior lights on.

### S-03 · Signature Tower – Blue Hour 🔲
Same table as S-02 except: **Light** blue hour, warm 2700K amber light in ~65% of windows, soft facade uplights, pergola lit. Filename `story-tower-dusk.png`. **Must overlay S-02 exactly** (use S-02 as image input, strength ~0.85).

**Prompt:**
> Exactly the same tower, camera, framing and geometry as the attached image, unchanged, but at blue hour: windows glow with warm 2700K amber interior light in about two thirds of the apartments at random, soft warm uplights wash the stone fins, the rooftop pergola glows, the lobby is bright and inviting. Transparent background.

**Negative (S-02/S-03):** global + "different floor count, changed geometry, sky, other buildings, people, cars"

### S-04 · Sky Transition Pair
| Field | Spec |
|---|---|
| Purpose | Background behind the story tower; cross-fade day → blue hour |
| Size | 3840 × 2160 each; mobile 1440 × 2560 |
| Background | Opaque · JPG |
| Files | `story-sky-day.jpg` (soft warm late-afternoon sky, pale ivory-blue to blush, a few soft clouds) · `story-sky-bluehour.jpg` (indigo `#1d2a3a` top → dusty violet → thin rose-amber horizon band, faint stars in top 20%) |
| Animation | Opacity cross-fade tied to scroll; stars fade in last |

**Prompt (bluehour):**
> A clear sky just after sunset: deep indigo (#1d2a3a) at the top blending smoothly into dusty violet and then a thin glowing band of warm rose-amber at the horizon. A few faint small stars in the top fifth only. No ground, no clouds, no moon. Smooth gradient, no banding.

**Prompt (day):**
> A calm late-afternoon sky: soft pale ivory-blue at the top warming to light blush and peach near the horizon, two or three soft, low-contrast cumulus clouds in the lower third. No sun disc, no ground, no birds. Smooth gradient.

### S-05 · Floor-Plan Line Art (3 plans) 🔲
| Field | Spec |
|---|---|
| Purpose | Explains space; animates in on Property Detail and the "Lifestyle" stage |
| Size | 2400 × 2400 (1:1) each |
| Background | Transparent · PNG (vectorised later) |
| Content | Elegant top-down apartment plans: 2 BHK, 3 BHK, 4 BHK; walls in maroon `#4b0617` 3 px, furniture in thin champagne lines, balconies with planter dots, no text |
| Filename | `plan-2bhk.png`, `plan-3bhk.png`, `plan-4bhk.png` → `generated/story/` |
| Note | Illustrative only; on property pages we'll show real developer plans from brochures |

**Prompt:**
> Minimal elegant architectural floor plan of a luxury [3]-bedroom Indian apartment, top-down, on a transparent background. Walls drawn as clean solid deep maroon (#4b0617) lines, doors as thin arcs, furniture (beds, sofa, dining table, kitchen counter) in very thin champagne-gold outlines, a wide balcony with small round planter symbols. Living room opening to the balcony, three bedrooms with attached baths, separate kitchen and utility. No text, no dimensions, no room labels, no shading.

### S-06 · Material Detail Close-ups (set of 4)
| Field | Spec |
|---|---|
| Purpose | Tactile quality shots in the "Legacy" stage and property detail |
| Size | 1600 × 2000 (4:5) each |
| Background | Opaque · JPG |
| Shots | (1) Stone fin and bronze glass junction raking light · (2) Teak balcony soffit with planter and warm lamp · (3) Lobby: travertine floor, brass reveal, arch niche · (4) Glass balcony railing with city bokeh at dusk |
| Animation | Clip-path arch reveal, slow 1.08 → 1 scale |
| Filename | `detail-stone.jpg`, `detail-teak.jpg`, `detail-lobby.jpg`, `detail-balcony.jpg` → `generated/story/` |

**Prompt (template):**
> Architectural detail photograph, macro-to-medium close-up of [SUBJECT] in a contemporary luxury residence. Raking warm evening light, rich real material texture, shallow depth of field, calm minimal composition with generous negative space on one side. Palette ivory, warm taupe, champagne brass, deep shadow tinted maroon. No people, no text.

---

## 5. PROPERTY COLLECTION (the most important content)

All 7 listing images are newly generated. **Honesty rule:** these are real projects with real prices, so AI images are *artist's impressions*, not photos of the actual buildings. On the site every property image will carry a small "Representative image" label, and any developer-supplied official render can be swapped in later without layout changes. Do not name the projects or add any developer branding in the images.

**Shared spec for P-01 … P-07**
| Field | Spec |
|---|---|
| Placement | Home "Curated collection" cards, Properties grid, Property Detail hero + gallery |
| Priority | **P0** |
| Size | Portrait 2400 × 3000 (4:5) **and** landscape 3000 × 2000 (3:2), same building, same light |
| Background | Opaque · JPG → AVIF/WebP |
| Style | Global Style Anchor; each building distinct but clearly one family |
| Composition | Building fills 60–70% of height; calm sky in top 20% (price/title overlay space on cards); landscaped base with paving and greenery; no cars or road clutter |
| Camera | Eye-level three-quarter view, 35–50 mm, verticals corrected |
| Light | Dusk: rose-to-plum sky, warm amber windows in ~40%, soft uplights |
| People / text | Optional tiny distant figures near the entrance; no text |
| Mobile | Portrait version used on phones |
| Animation | Arch-mask reveal, hover zoom 1.05, inner-image parallax 8%, cross-fade to detail shot (P-xb) on hover |
| Reference | S-02 output (style family only) |
| Folder | `generated/collection/` |

| ID | Listing (data in `mock.js`) | Building brief for the prompt | Filenames |
|---|---|---|---|
| P-01 | Only ONE · 3 BHK · Palm Road, Sargasan | Single slender 22-floor tower, one apartment per floor, deep wraparound balconies, a palm-lined drive-in entrance | `property-1-portrait.jpg`, `property-1-landscape.jpg` |
| P-02 | Atmos By Solaire · 3–4 BHK · Sargasan | Two tall towers joined by a sky-bridge amenity deck at the upper third, generous glass, rooftop garden | `property-2-*` |
| P-03 | Dev Auram · 2–3 BHK · Palm Road | Three mid-rise 14-floor towers around a central garden court, warm stone and timber screens | `property-3-*` |
| P-04 | Listing 4 | Compact 16-floor tower with bold vertical stone fins and a double-height lit lobby | `property-4-*` |
| P-05 | Listing 5 | Twin towers with stepped terraces cascading greenery down the facade | `property-5-*` |
| P-06 | Listing 6 | Low-density 10-floor boutique block with large corner balconies and a reflecting pool at the entrance | `property-6-*` |
| P-07 | Listing 7 | Tall 24-floor tower with horizontal balcony bands and timber soffits, clubhouse pavilion in front | `property-7-*` |

*(Once you confirm BHK/type for listings 4–7 I'll tune those briefs; the IDs and filenames won't change.)*

**Prompt template:**
> [GLOBAL STYLE ANCHOR] A newly built contemporary luxury residential development in Gandhinagar: [BUILDING BRIEF]. Warm taupe honed stone, slim vertical fins, glass balconies with planters and teak soffits. Eye-level three-quarter view, verticals corrected, building filling about two thirds of the frame height, calm empty sky in the top fifth. Dusk: soft rose-to-plum sky, warm amber light in about 40% of windows, gentle uplights on the facade, landscaped entrance with palms, neem trees, stone paving and low path lights. [PORTRAIT 4:5 / LANDSCAPE 3:2]. No text, no logos, no cars.

**Negative:** global + "cars, road, signage, cranes, unfinished construction, glass office tower look, futuristic curves, identical building to other listings"

### P-01b … P-07b · Property Detail Shots (3 per property)
For each listing: (a) entrance/lobby at dusk, (b) a typical living room opening to the balcony, (c) the amenity deck or garden. 2400 × 1600 (3:2), opaque, same light family. Filenames `property-N-entrance.jpg`, `property-N-living.jpg`, `property-N-amenity.jpg`. Use LS-01 interior prompts with the building brief added. Also labelled "Representative image".

---

## 6. LOCATION: "Neighbourhoods of Gandhinagar"

### L-01 · Stylised Locality Map
| Field | Spec |
|---|---|
| Purpose | Show where the homes are; pins and route animate on scroll |
| Placement | Home section after collection; Property Detail location block |
| Priority | P1 |
| Size | 2400 × 1800 (4:3); mobile 1200 × 1600 portrait crop around Sargasan–Kudasan |
| Background | Two versions: ivory `#f5efe9` and oxblood `#3b0310` · PNG (vector preferred) |
| Content | Gandhinagar south: Sabarmati river (west), Sargasan, Kudasan, Raysan, PDEU, Palm Road, GIFT City hint (south-west), SG Highway corridor. Hairline roads in muted rose, river as blush band, parks as faint sage shapes, tiny building footprints |
| Rules | **No labels, no pins**: added in code for accuracy. Geography should be *plausible and simplified*; I will align positions with real coordinates when integrating |
| Animation | Roads draw in, pins drop with stagger, active locality glows |
| Filename | `map-gandhinagar-ivory.png`, `map-gandhinagar-oxblood.png` → `generated/location/` |

**Prompt:**
> An elegant minimalist illustrated city map of south Gandhinagar, Gujarat, in the style of a luxury hotel's printed map. Background flat ivory (#f5efe9). A broad soft blush-pink river curving down the west side, a fine grid of hairline roads in muted rose, a few wider arterial roads slightly bolder, green parks as very faint sage shapes, tiny simplified building footprints clustered in neighbourhoods. Lots of empty space. No text, no labels, no pins, no compass, no legend.

### L-02 · Aerial Context View
| Field | Spec |
|---|---|
| Purpose | "Live at the centre of it all": aerial establishing shot behind the map intro |
| Size | 3840 × 2160 · Opaque |
| Content | High aerial oblique over a green, planned Indian city at golden hour: wide tree-lined avenues, mid-rise residential clusters, a river on the horizon, haze |
| Camera | Drone at 300 m, 30° down, looking west toward the sunset |
| Animation | Slow zoom (scale 1.15 → 1) as the map fades over it |
| Filename | `aerial-gandhinagar.jpg` → `generated/location/` |

**Prompt:**
> High aerial oblique photograph from 300 metres over a green, well-planned Indian city at golden hour, looking west toward a low sun hidden by haze. Wide tree-lined avenues, clusters of modern beige residential towers rising from dense greenery, a river glinting on the horizon, warm atmospheric haze, long soft shadows. Calm, prosperous, believable. No text, no landmarks.

### L-03 · Locality Vignettes (4)
Square 1600 × 1600 opaque images, one per neighbourhood, shown on pin hover: tree-lined boulevard (Sargasan), café street at dusk (Kudasan), green open space with joggers far away (Raysan), campus-style avenue with palms (PDEU / Palm Road). Filenames `locality-sargasan.jpg` etc. Prompt template: "Quiet evening street scene in a modern Indian residential neighbourhood: [DETAIL]. Warm golden light, greenery, clean pavements, no readable signs, people only small and distant." Label as representative imagery on site.

---

## 7. LIFESTYLE & ABOUT

### LS-01 … LS-04 · Arch-masked Lifestyle Moments
| Field | Spec |
|---|---|
| Purpose | Make the visitor feel the life inside the homes; About page mosaic + Home intro |
| Priority | P2 |
| Size | 1600 × 2000 (4:5) · Opaque |
| Masking | Shown inside an arch (from the logo's roofline): keep the subject in the centre 70%, top corners unimportant |
| People | Allowed but **small, partial, or from behind; no close-up faces**; Indian family context; modest contemporary clothing |
| Animation | Arch clip-path grows; inner image counter-parallax |
| Files | `life-balcony.jpg`, `life-living.jpg`, `life-pool.jpg`, `life-garden.jpg` → `generated/lifestyle/` |
| Reference | LS-02 output once approved (tone), else none |

**Prompts:**
1. **Balcony:** "A spacious high-floor balcony at dusk with teak decking, two cane lounge chairs, a brass lamp, potted olive tree; a couple seen from behind enjoying tea, city lights and plum sky beyond. Warm, intimate."
2. **Living:** "Sunlit premium living room in a contemporary Indian apartment: ivory walls, walnut joinery, a deep wine-red velvet accent chair, linen sofa, brass floor lamp, large window onto green treetops. Late-morning soft light, no people."
3. **Pool:** "Rooftop infinity pool at dusk with the city skyline beyond, empty loungers, warm underwater and path uplights, palms in planters, still water reflecting the plum-rose sky. No people."
4. **Garden:** "Landscaped podium garden path at blue hour, travertine stepping stones, palms and frangipani, low warm bollard lights, a child and parent walking far away from behind. Calm."

Prefix each with the Global Style Anchor (interior variant: replace the architecture sentence with "interior of a contemporary luxury Indian apartment").

### LS-05 · About Hero Composite
3840 × 2160 opaque. A wide, quiet shot of a sunlit residential entrance court: stone arch canopy, water channel, palms, the tower base rising out of frame. Left 45% calm for the founder quote. Filename `about-hero.jpg`.

### LS-06 · Water Feature Detail (transition asset)
2400 × 1600 opaque + a short loop if video available. Top-down shallow water channel over dark stone with reflected palm leaves and ripples. Used as a section divider band with slow horizontal drift. Filename `water-channel.jpg`.

---

## 8. PEOPLE: Advisors (AI, no faces)

Advisor images are AI-generated but **never show a face**: the head is cropped out of frame, turned away, or in soft silhouette. This keeps the section warm and human without inventing fake faces for Amit Desai and Rohan Darji. Names, roles and contact buttons are added in code.

**Shared spec for T-01 / T-02**
| Field | Spec |
|---|---|
| Purpose | Simple, elegant advisor cards: professional presence, no identity |
| Placement | Home "Meet your advisors" cards, Agents page |
| Priority | P2 |
| Size | 1600 × 2000 (4:5) desktop; same file cropped 4:5 on mobile (subject centred) |
| Background | Opaque · JPG → AVIF/WebP |
| Style | Simple, editorial, calm studio-interior photo; not busy |
| Palette | Background: softly blurred walnut + ivory with a gentle oxblood tone; clothing: charcoal/navy suit or smart shirt; small champagne accent (watch, pen) |
| Composition | Subject in centre or slightly right; **frame cut at the chin or upper lip** (or figure seen from behind); lower 35% calm and slightly darker for name/role text |
| Camera | Eye level, 85 mm, f/2.8, shallow depth of field |
| Light | Soft warm key from left, gentle fill, subtle rim light |
| People | One man per image, Indian, professional; **no face visible, no eyes, no mouth** |
| Text | None |
| Animation | Arch-mask reveal, slow 1.06 → 1 scale; name rises from mask; contact buttons fade up on hover |
| Folder | `generated/people/` |

| ID | Advisor | Pose / detail (keep the two different but matching) | Filename |
|---|---|---|---|
| T-01 | Amit Desai | Standing, cropped at the chin, charcoal suit, white shirt, no tie, holding a slim leather folio at waist; hand relaxed; walnut panelling behind | `advisor-amit.jpg` |
| T-02 | Rohan Darji | Seen from behind and slightly to the side, navy blazer, standing at a tall window looking out at a dusk residential skyline; head in soft silhouette with no facial features | `advisor-rohan.jpg` |

**Prompt template:**
> Simple, elegant editorial portrait of a professional Indian real estate advisor in a warm luxury office, [POSE / DETAIL]. The face is NOT visible: [the frame is cropped just below the chin / he is seen from behind with his head in soft silhouette]. Softly blurred background of walnut wood panelling and ivory walls with a gentle oxblood tone, one tall green plant at the edge. Soft warm key light from the left, gentle fill, subtle rim light, 85 mm lens, shallow depth of field. Calm, trustworthy, premium, minimal. Lower third of the frame calm and slightly darker. Vertical 4:5. No text, no logos.

**Negative:** global + "visible face, eyes, mouth, facial features, profile showing face, smiling face, multiple people, name tags, business cards with text, cluttered desk, stock-photo handshake"

### T-03 · Advisor Section Backdrop (optional)
1600 × 2000, opaque. Same blurred walnut-and-arch interior with no person, for an extra "Join our team / Talk to us" card. Filename `advisor-backdrop.jpg`.

**Prompt:**
> A softly out-of-focus warm luxury interior: walnut wood panelling, a gentle arched doorway glowing with warm light, one tall green plant on the side, oxblood and ivory tones, low-key warm lighting, shallow depth of field. No people, no text.

---

## 9. CLOSING CTA: "The right space changes everything." 🧩

Windows switch on one by one as the visitor reaches the bottom; the ghost "S" sits behind; layers lift slightly. Mobile: C-01 + C-02 only.

### C-01 · Night Skyline Base
| Field | Spec |
|---|---|
| Size | 3840 × 1800 desktop; 1440 × 2200 mobile · Opaque JPG |
| Content | Calm night skyline of modern residential towers with greenery at their bases, slight elevated view; sky oxblood-to-indigo; towers near-black plum; **windows mostly dark** |
| Safe space | Centre-top 60% calm for headline and button |
| Filename | `closing-skyline-base.jpg` → `generated/closing/` |

**Prompt:**
> A wide, calm night view of a modern residential skyline seen from a slight elevation: a row of elegant towers of varied heights in the lower 40% of the frame, silhouetted in near-black plum with faint taupe facade detail, dense dark trees at their bases. Sky a smooth gradient from deep indigo at the top to oxblood-maroon near the horizon. Almost all windows dark. Centre-top area clean and empty. No moon, no text.

### C-02 · Window-light Layer 🔲
Same canvas and camera as C-01, transparent: only warm amber window rectangles (about 50% of windows) on transparent background, so they can switch on in sequence. Filename `closing-skyline-windows.png`. Prompt: "Using the attached skyline, output only warm glowing amber window lights in about half of the windows, exact positions, everything else transparent."

### C-03 · Foreground Tree Silhouettes 🔲
3840 × 900 transparent. Dark backlit tree canopy silhouettes along the bottom edge with a few warm garden lights, rising slightly at both ends. Moves 1.2× on scroll. Filename `closing-trees-front.png`.

---

## 10. INNER PAGES (Properties, Property Detail, Valuation, Contact, Agents)

| ID | Asset | Size / type | Placement | Prompt summary | Filename |
|---|---|---|---|---|---|
| I-01 | Properties page header | 3840 × 1400 opaque | Properties hero band behind title, with H-05 foliage reused in front | Low-angle panorama of three tower crowns against plum dusk sky, lots of empty sky on the left | `header-properties.jpg` |
| I-02 | Valuation header | 3840 × 1400 opaque | Valuation hero | Top-down architectural desk scene: rolled floor plans, brass scale ruler, a stone sample, keys, warm lamp light on walnut; no text visible on papers | `header-valuation.jpg` |
| I-03 | Contact header | 3840 × 1400 opaque | Contact hero | Warm luxury reception lobby at evening, travertine, brass, arched niche with plant, empty | `header-contact.jpg` |
| I-04 | Agents / team header | 3840 × 1400 opaque | Agents hero | Bright consultation lounge with two armchairs, coffee table, big window to greenery, no people | `header-agents.jpg` |

All: Global Style Anchor (interior variant), left 50% calm for title, mobile crop 1440 × 1600 from the right-centre. Folder `generated/inner-pages/`.

---

## 11. UI, TEXTURE & BRAND

| ID | Asset | Spec | Notes |
|---|---|---|---|
| U-01 | Film grain | 512 × 512 tileable, transparent, monochrome fine noise | 3–4% opacity overlay sitewide · `grain.png` |
| U-02 | Ivory paper | 2048 × 2048 tileable, opaque, extremely subtle warm cotton fibre | Light section backgrounds · `paper-ivory.jpg` |
| U-03 | Monogram foil | 2000 × 2000 transparent | Describe from the logo: the SR monogram inside a house-roof outline, as embossed champagne-gold foil. Reference only; final logo stays the official SVG · `monogram-foil.png` |
| U-04 | Line icon set | 512 × 512 each, transparent, 1.5 px champagne lines, rounded caps, arch motif | Excellence, Integrity, Client-centric, Innovation, Clubhouse, Pool, Gym, Garden, Kids' play, Security, Parking, Lift, Power backup, Jogging track, Temple, Amphitheatre. **I'd rather hand-draw these in SVG** for crispness; generate only if you want a visual direction · `icons/*.png` |
| U-05 | OG / social image | 1200 × 630 opaque | H-07 crop with empty oxblood space left for the logo (added in code) · `og-image.jpg` |

---

## 12. Existing assets: what stays

| Asset | Decision |
|---|---|
| `Silfira_logo.svg`, brand card, ghost "S" | **Keep** (identity, added in code; not a photo) |
| Maroon / blush / ivory palette, Playfair serif | **Keep**, add champagne accent |
| `partners_svg/*.png` (18 developer logos) | **Keep**, shown monochrome ivory on maroon |
| `property_images/1–7.png` | **Retired** → P-01…P-07 |
| `home.jpg` | **Retired** → hero layers H-01…H-07 |
| `AmitDesai.jpg`, `RohanDarji.jpg` | **Retired** → T-01 / T-02 (AI, no faces) |
| `About/WhatsApp Image 2025-12-23 at 10.28..jpeg` (photo booth, real site visit) | **Keep.** Real photo; used as-is (no AI edits). Rename to `about-site-visit.jpg`. Placement: About page "Our story" block and Home intro, inside the arch mask, with a small caption such as "On a site visit with a client". Portrait 720 × 1280, so show it at max ~420 px wide and pair it with an AI lifestyle image (LS-02) so its lower resolution isn't exposed. Grade gently warm in CSS only |
| `About/why1.jpg` (photo booth, scale model) | **Keep.** Real photo, used as-is. Rename to `about-scale-model.jpg`. Placement: next to the site-visit photo as a pair (About "Our story") and as the "On the ground" image on Property Detail, caption e.g. "Project model at the sales gallery". 1280 × 1280, so fine up to ~640 px wide |
| `About/why2–8.jpg` | **Retired** → LS-01…LS-06 + S-06 |
| `Testimonials/basic.png` | **Retired** (typographic testimonials) |
| `design-references/`, `silfira-design-references.zip` | No longer needed for generation |

---

## 13. Delivery and performance budget

- **Formats you send:** PNG with alpha for 🔲 assets, max-quality JPG/PNG for opaque. I convert to AVIF (primary) + WebP (fallback), 3 widths each (640 / 1280 / 2560).
- **Weight targets after optimisation:** hero total ≤ 450 KB desktop / ≤ 220 KB mobile for first paint; each card image ≤ 120 KB; transparent layers ≤ 250 KB each.
- **Loading:** H-07 composite (or H-01 + H-03) preloaded as LCP; other hero layers fetched right after; everything below the fold lazy.
- **Motion:** transforms and opacity only; reduced-motion users get H-07 static + fades.
- **Batch order:** (1) S-02 master → then H-03 using the same architecture; (2) H-01, H-02, H-04, H-05, H-06; (3) P-01…P-07; (4) S-01, S-03, S-04, C-01…C-03, L-01; (5) everything else.

**Checklist before sending each asset back:** correct size/ratio · true transparency where marked · no text or logos · architecture consistent with S-02 · palette matches §1 · safe space respected.
