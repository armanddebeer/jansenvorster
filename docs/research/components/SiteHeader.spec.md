# SiteHeader Specification

## Overview
- **Target file:** `src/components/SiteHeader.tsx`
- **Screenshot:** `docs/design-references/desktop-1440-viewport.png`
- **Interaction model:** scroll-driven

## Computed Styles
### Nav (top)
- padding: 30px 0; height ~130px; bg white; z-index 999; transition 0.2s linear
### Nav (scrolled `.shrink`)
- padding: 15px 0; height ~100px; box-shadow rgba(0,0,0,0.2) 0 1px 3px; bg white
### Links
- font: Poppins 14px/15px weight 400; color #000; uppercase; hover → #EB5037
### Logo
- ~300×70px; `/images/logo.png`

## Responsive
- Desktop: horizontal links
- Mobile (<1024): hamburger + stacked drawer
