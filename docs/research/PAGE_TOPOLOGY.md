# Page Topology — jansenvorster.co.za

## Target
https://jansenvorster.co.za/ (homepage only)

## Visual Order (top → bottom)

1. **SiteHeader** — sticky/shrink nav, logo left, links right
2. **HeroSection** — Revolution Slider clone, 450px desktop, glasses BG
3. **ImportantMessage** — full-width `#EB5037` banner
4. **WhoWeAre** — centered heading + body copy
5. **FeaturesSection** — `#F6F6F6` band, 4 framed icon boxes
6. **BrandsSection** — heading + copy + 5×4 brand logo grid (20 logos @ 208px)
7. **SiteFooter** — dark copyright bar only (upper footer widget height 0 / hidden)

## Interaction Models
| Section | Model |
|---------|--------|
| SiteHeader | scroll-driven shrink (padding 30→15, height 130→100, bg white + shadow) |
| HeroSection | static (slider timer present but single slide) |
| ImportantMessage | static |
| WhoWeAre | static |
| FeaturesSection | static (icon hover transition 0.3s) |
| BrandsSection | static |
| SiteFooter | static (links) |

## Layout Notes
- Content max-width ~1140px (Bootstrap container)
- Fonts: Poppins (nav/body/hero), Roboto (section headings / icon titles)
- Accent: `#EB5037` / `rgb(237, 69, 36)` CTA
- No Lenis / smooth-scroll library
