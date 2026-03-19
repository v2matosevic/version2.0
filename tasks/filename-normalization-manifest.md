# Asset Filename Normalization Manifest

Generated: 2026-02-23

**Convention:** lowercase kebab-case, no underscores, no WordPress artifact suffixes, no generic/numeric names, no typos.

**Rule:** Only files in directories that will be used in the new site need renaming. Dropped service page assets are excluded (drustvene-mreze, placeno-oglasavanje, video-foto-produkcija, fotografiranje-nekretnina, snimanje-nekretnina).

**Important:** Every rename requires updating all markdown references to that file.

---

## 1. Product Assets (content/products/assets/)

All 21 product images use PascalCase. These are product design names — the names match `products.json` entries.

| Current | Proposed | Notes |
|---|---|---|
| AmberSwirl.webp | amber-swirl.webp | |
| ColorStream.webp | color-stream.webp | |
| CrystalNet.webp | crystal-net.webp | |
| DarkPrism.webp | dark-prism.webp | |
| EmeraldF.webp | emerald-f.webp | |
| GeoChroma.webp | geo-chroma.webp | |
| GeoPurple.webp | geo-purple.webp | |
| GoldenBliss.webp | golden-bliss.webp | |
| GoldMarble.webp | gold-marble.webp | |
| MarbleFlow.webp | marble-flow.webp | |
| OrangeCraft.webp | orange-craft.webp | |
| PurpleMosaic.webp | purple-mosaic.webp | |
| ScarletRed.webp | scarlet-red.webp | |
| SilkWave.webp | silk-wave.webp | |
| SunArc.webp | sun-arc.webp | |
| SunSatin.webp | sun-satin.webp | |
| SwirlHarmony.webp | swirl-harmony.webp | |
| SwirlSync.webp | swirl-sync.webp | |
| TwilightFade.webp | twilight-fade.webp | |
| VelocityS.webp | velocity-s.webp | |
| vas-dizajn-vizitka.webp | custom-design.webp | Croatian name → English |

**References to update:** `products.json` (image field for each product)

---

## 2. Shared Client Logos (content/assets/clients/)

| Current | Proposed | Notes |
|---|---|---|
| BRKLJACA-LOGO.png | brkljaca-logo.png | uppercase |
| DUBROVNIK_200X150.webp | dubrovnik-republic-gin.webp | uppercase + underscore + dimensions in name |
| GRANA-HR-LOGO.png | grana-logo.png | uppercase |
| KAMP-KARGITA-LOGO.png | kamp-kargita-logo.png | uppercase |
| Modul-Intderijeri.png | modul-interijeri.png | mixed case + typo (Intderijeri → interijeri) |
| NDM-LOGO.png | ndm-logo.png | uppercase |
| ROTTEX-LOGO.png | rottex-logo.png | uppercase |
| Untitled-design5.webp | version2-media.webp | generic name — needs descriptive rename |
| eskimo_logo_homepage.png | eskimo-logo.png | underscore + unnecessary suffix |
| homeinterijeri_200X150.webp | home-interijeri.webp | underscore + dimensions in name |
| riva_logo.webp | riva-consulting-logo.webp | underscore |
| zyx_bowloing_200x150.webp | zyx-bowling.webp | underscore + typo (bowloing) + dimensions |
| Crni_logo_sa_slovima.png | — | This is in logos/ not clients/ (see below) |

**Already correct:** adria-escape.webp, apartmani-zadar-e1691193482526.webp (WP artifact but recognizable), aqua-art.png, cardo.webp, crni-logo.png, favicon.png, kodfrane-logo.png, lcl-optika-ds.webp, modul-interijeri.png (duplicate of Modul-Intderijeri.png!), monster-kebab.png, nk-abeceda.webp, optika-visus-1.png, tamaris.webp, tmshop.webp, trazivuk.png, trstika-1.png, vrata-lopar-1.png, zadar-tehnika.webp

**Note:** `Modul-Intderijeri.png` and `modul-interijeri.png` are BOTH in clients/ — one is likely a duplicate with different casing. Verify and keep one.

**WordPress artifact:** `apartmani-zadar-e1691193482526.webp` → `apartmani-zadar.webp` (strip WP edit timestamp)

---

## 3. Shared Logos (content/assets/logos/)

| Current | Proposed | Notes |
|---|---|---|
| Crni_logo_sa_slovima.png | black-logo-text.png | Croatian name + underscores → English kebab-case |

**Already correct:** black-logo-name.webp, white-logo-name.png, white-logo-name-160x47.webp

---

## 4. Shared Flags (content/assets/flags/)

| Current | Proposed | Notes |
|---|---|---|
| de_DE.png | de.png | underscore + redundant locale suffix |
| en_GB.png | en.png | underscore + redundant locale suffix |
| hr.png | hr.png | already correct |

---

## 5. Page Assets — KEEP directories

### home (content/pages/home/assets/)

| Current | Proposed | Notes |
|---|---|---|
| DUBROVNIK_200X150.webp | — | Client logo duplicate — remove, use shared |
| Modul-Intderijeri.png | — | Client logo duplicate — remove, use shared |
| homeinterijeri_200X150.webp | — | Client logo duplicate — remove, use shared |
| PurpleMosaic.webp | — | Product image duplicate — remove, use shared |
| PurpleMosaic-2.webp | purple-mosaic-back.webp | Product showcase image |
| TwilightFade.webp | — | Product image duplicate — remove, use shared |
| TwilightFade-2.webp | twilight-fade-back.webp | Product showcase image |
| Untitled-design5.webp | — | Client logo duplicate — remove, use shared |
| dsdsdsds-2.png | version2-showcase.png | Gibberish name — needs descriptive rename |
| zyx_bowloing_200x150.webp | — | Client logo duplicate — remove, use shared |
| version2-smar-web-background-image-main.webp | smart-web-hero.webp | Typo (smar → smart) + verbose |
| vas-dizajn-vizitka.webp | custom-design-card.webp | Croatian → English |

**Already correct or acceptable:** apartmani-zadar-e1691193482526.webp, aqua-art.png, monster-kebab.png, nk-abeceda.webp, optika-visus-1.png, riva-consulting-vizitka.webp, trazivuk.png, trstika-1.png, vrata-lopar-1.png

### o-nama (content/pages/o-nama/assets/)

| Current | Proposed | Notes |
|---|---|---|
| 20230719_184554326_iOS.jpg | team-photo.jpg | Phone metadata name |
| 7.webp | office-image.webp | Generic numeric name |
| DUBROVNIK_200X150.webp | — | Client logo duplicate — remove |
| Modul-Intderijeri.png | — | Client logo duplicate — remove |
| homeinterijeri_200X150.webp | — | Client logo duplicate — remove |
| Untitled-design5.webp | — | Client logo duplicate — remove |
| zyx_bowloing_200x150.webp | — | Client logo duplicate — remove |

**Note:** Many files here are client logos duplicated from shared directory — will be resolved by client logo consolidation task.

### web-dizajn (content/pages/web-dizajn/assets/)

| Current | Proposed | Notes |
|---|---|---|
| Rottex-mockup-stranica-version2-1.webp | rottex-mockup.webp | Mixed case + verbose |
| riva-consutling-mockup-stranica-version2.webp | riva-consulting-mockup.webp | Typo (consutling → consulting) |
| premium-paket-versiojn2.webp | premium-package.webp | Typo (versiojn2 → version2) + Croatian |
| ecommerce-paket-version2.webp | ecommerce-package.webp | Croatian → English |
| profesionalni-paket-version2.webp | professional-package.webp | Croatian → English |
| simple-paket-version2.webp | simple-package.webp | Croatian → English |

**Note:** Package images may not be needed (packages are being replaced by interactive pricing tool). Consider dropping.

### usluge (content/pages/usluge/assets/)

| Current | Proposed | Notes |
|---|---|---|
| 666.webp | services-360-tours.webp | Generic numeric name |
| DUBROVNIK_200X150.webp | — | Client logo duplicate — remove |
| Modul-Intderijeri.png | — | Client logo duplicate — remove |
| homeinterijeri_200X150.webp | — | Client logo duplicate — remove |
| Does-SEO-Really-Help-Your-Website-To-Rank-Higher-On-Google-e1693467011186.webp | seo-service-hero.webp | Mixed case + excessive length + WP artifact |
| ilya-pavlov-OqtafYT5kTw-unsplash-scaled-e1689886441593.webp | web-dev-hero.webp | Unsplash ID + WP artifact |
| social_media_hero_image-scaled-e1689886376697.webp | — | Dropped service image — may not be needed |
| zyx_bowloing_200x150.webp | — | Client logo duplicate — remove |
| version2-digitalne-vizitke-1-e1707421654955.webp | digital-cards-hero.webp | Croatian + WP artifact |

### reference (content/pages/reference/assets/)

| Current | Proposed | Notes |
|---|---|---|
| 2-1.webp | reference-image.webp | Generic numeric name |
| DUBROVNIK_200X150.webp | — | Client logo duplicate — remove |
| homeinterijeri_200X150.webp | — | Client logo duplicate — remove |
| Untitled-design.png | version2-media-reference.png | Generic name |
| zyx_bowloing_200x150.webp | — | Client logo duplicate — remove |

### dig-vizitka (content/pages/dig-vizitka/assets/)

| Current | Proposed | Notes |
|---|---|---|
| 65.png | nfc-icon-1.png | Generic numeric name |
| 66.png | nfc-icon-2.png | Generic numeric name |
| 67.png | nfc-icon-3.png | Generic numeric name |
| GeoChroma.webp | geo-chroma-front.webp | PascalCase |
| GeoChroma-2.webp | geo-chroma-back.webp | PascalCase |
| MarbleFlow.webp | marble-flow-front.webp | PascalCase |
| MarbleFlow-2.webp | marble-flow-back.webp | PascalCase |
| OrangeCraft.webp | orange-craft-front.webp | PascalCase |
| OrangeCraft-2.webp | orange-craft-back.webp | PascalCase |
| PurpleMosaic.webp | purple-mosaic-front.webp | PascalCase |
| PurpleMosaic-2.webp | purple-mosaic-back.webp | PascalCase |
| TwilightFade.webp | twilight-fade-front.webp | PascalCase |
| TwilightFade-2.webp | twilight-fade-back.webp | PascalCase |
| version2-digitalne-vizitke-1-e1707421654955.webp | digital-cards-hero.webp | WP artifact |
| version2-digitalne-vizitke-BP.webp | digital-cards-business-preview.webp | Abbreviation |
| version2-digitalne-vizitke-mockup-e1707082569370.webp | digital-cards-mockup.webp | WP artifact |

### smart-web-plan (content/pages/smart-web-plan/assets/)

| Current | Proposed | Notes |
|---|---|---|
| Rottex-mockup-stranica-version2-1.webp | rottex-mockup.webp | Mixed case + verbose |

**Note:** This page is for obsolete packages — may be dropped entirely (redirected).

### seo-optimizacija-trazilice (content/pages/seo-optimizacija-trazilice/assets/)

No issues — only `hero.webp` (correct).

### 360-virtualna-setnja (content/pages/360-virtualna-setnja/assets/)

No issues — `digital-marketing-agency-reviewer-img-2.jpg` is acceptable (though name is misleading for a 360 tours page).

---

## 6. Page Assets — DROPPED directories (no action needed)

These directories belong to dropped services and won't be in the new site:

- `drustvene-mreze/assets/` — 12 files (Untitled-design5.webp, afeter.png, etc.)
- `placeno-oglasavanje/assets/` — 1 file (Untitled-design5.webp)
- `video-foto-produkcija/assets/` — 5 files (Cinematic-Footage.webp, Optika-visus-collage-slike.webp, etc.)
- `fotografiranje-nekretnina/assets/` — 7 files (307749209.jpg, etc.)
- `snimanje-nekretnina/assets/` — 9 files (DJI_0321-scaled.webp, Untitled-design3.webp, etc.)

**No renaming needed** — these won't be migrated.

---

## 7. Gallery Assets — DECISION PENDING

`galerija/assets/` has 46 photography images. Naming issues:
- Camera metadata: 343100930.webp, 343101111.webp, 610_6904.webp, etc.
- Mixed case: Version2-pacific-bullets-26-of-33.webp

**Action:** Wait for Gallery Page decision. If dropped, no renaming needed.

---

## 8. Blog Assets

All 190 blog featured images follow the pattern `./assets/featured.{ext}`. No naming issues — each is in its own directory with a consistent name.

---

## Summary

| Category | Files to Rename | Files to Remove (duplicates) |
|---|---|---|
| Product assets | 21 | 0 |
| Shared clients | 12 | 1 (Modul-Intderijeri.png duplicate) |
| Shared logos | 1 | 0 |
| Shared flags | 2 | 0 |
| home page | 4 rename, rest are dupes | ~8 (client logo dupes) |
| o-nama page | 2 rename, rest are dupes | ~7 (client logo dupes) |
| web-dizajn page | 6 | 0 |
| usluge page | 3 rename, rest are dupes | ~6 (client logo dupes) |
| reference page | 2 rename, rest are dupes | ~5 (client logo dupes) |
| dig-vizitka page | 15 | 0 |
| Dropped pages | 0 (skip) | 0 |
| Gallery | Pending decision | Pending decision |
| Blog assets | 0 | 0 |
| **Total** | **~68** | **~27** |

## Execution Strategy

1. **Phase A:** Consolidate client logo duplicates first (separate task — depends on logo catalog agent)
2. **Phase B:** Rename shared assets (clients/, logos/, flags/) and update all references
3. **Phase C:** Rename product assets and update products.json
4. **Phase D:** Rename page-specific assets and update markdown files
5. **Phase E:** Verify no broken references remain

**Critical:** Each rename must be paired with a reference update. Use grep to find all references before renaming.
