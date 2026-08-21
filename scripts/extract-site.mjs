import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const TARGET = "https://jansenvorster.co.za/";
const OUT = {
  refs: "docs/design-references",
  research: "docs/research",
};

const STYLE_PROPS = [
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "letterSpacing",
  "color",
  "textTransform",
  "textDecoration",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "width",
  "height",
  "maxWidth",
  "minWidth",
  "maxHeight",
  "minHeight",
  "display",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "gap",
  "gridTemplateColumns",
  "gridTemplateRows",
  "borderRadius",
  "border",
  "borderTop",
  "borderBottom",
  "borderLeft",
  "borderRight",
  "boxShadow",
  "overflow",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "opacity",
  "transform",
  "transition",
  "cursor",
  "objectFit",
  "objectPosition",
  "mixBlendMode",
  "filter",
  "backdropFilter",
  "whiteSpace",
  "textAlign",
  "textOverflow",
];

async function ensureDirs() {
  await mkdir(OUT.refs, { recursive: true });
  await mkdir(OUT.research, { recursive: true });
  await mkdir("docs/research/components", { recursive: true });
  await mkdir("public/images", { recursive: true });
  await mkdir("public/seo", { recursive: true });
}

/**
 * Extract styles tree + assets from a live page via Playwright.
 */
async function extractAtViewport(page, width, height, label) {
  await page.setViewportSize({ width, height });
  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(2500);

  // Dismiss cookie banners if present
  try {
    const cookieBtn = page.locator(
      'button:has-text("Accept"), button:has-text("Agree"), .cookie-accept, #cookie-accept, .cc-allow, .accept-cookies'
    );
    if (await cookieBtn.first().isVisible({ timeout: 1500 })) {
      await cookieBtn.first().click();
      await page.waitForTimeout(500);
    }
  } catch {
    /* ignore */
  }

  await page.screenshot({
    path: path.join(OUT.refs, `${label}-full.png`),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(OUT.refs, `${label}-viewport.png`),
    fullPage: false,
  });

  const data = await page.evaluate((props) => {
    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      for (const p of props) {
        const v = cs[p];
        if (
          v &&
          v !== "none" &&
          v !== "normal" &&
          v !== "auto" &&
          v !== "0px" &&
          v !== "rgba(0, 0, 0, 0)" &&
          v !== "matrix(1, 0, 0, 1, 0, 0)"
        ) {
          styles[p] = v;
        }
      }
      return styles;
    }

    function walk(element, depth) {
      if (depth > 4) return null;
      const children = [...element.children];
      const text =
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeType === 3
          ? element.textContent.trim().slice(0, 300)
          : null;
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id || null,
        classes: element.className?.toString?.().split(" ").slice(0, 8).join(" "),
        text,
        styles: extractStyles(element),
        images:
          element.tagName === "IMG"
            ? {
                src: element.currentSrc || element.src,
                alt: element.alt,
                naturalWidth: element.naturalWidth,
                naturalHeight: element.naturalHeight,
              }
            : null,
        childCount: children.length,
        children: children
          .slice(0, 25)
          .map((c) => walk(c, depth + 1))
          .filter(Boolean),
      };
    }

    const sections = [
      ...document.querySelectorAll(
        "nav, header, footer, .elementor-top-section, #rev_slider_1_1_wrapper"
      ),
    ].map((el, i) => {
      const rect = el.getBoundingClientRect();
      return {
        index: i,
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString?.().split(" ").slice(0, 10).join(" "),
        textPreview: el.textContent?.replace(/\s+/g, " ").trim().slice(0, 250),
        rect: {
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        styles: extractStyles(el),
        tree: walk(el, 0),
      };
    });

    const images = [...document.querySelectorAll("img")].map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
      parentClasses: img.parentElement?.className?.toString?.().slice(0, 120),
      position: getComputedStyle(img).position,
      zIndex: getComputedStyle(img).zIndex,
    }));

    const videos = [...document.querySelectorAll("video")].map((v) => ({
      src: v.src || v.querySelector("source")?.src,
      poster: v.poster,
    }));

    const backgroundImages = [...document.querySelectorAll("*")]
      .filter((el) => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== "none" && bg.includes("url(");
      })
      .slice(0, 80)
      .map((el) => ({
        url: getComputedStyle(el).backgroundImage,
        tag: el.tagName,
        id: el.id || null,
        classes: el.className?.toString?.().split(" ").slice(0, 5).join(" "),
      }));

    // RevSlider slide data
    const revSlides = [...document.querySelectorAll(".tp-bgimg, .slotholder, .rev-slidebg")].map(
      (el) => ({
        src: el.getAttribute("src") || el.dataset?.lazyload || el.dataset?.bg || null,
        styleBg: el.style?.backgroundImage || getComputedStyle(el).backgroundImage,
        classes: el.className?.toString?.(),
      })
    );

    const fonts = [
      ...new Set(
        [...document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button,span,li,body")]
          .slice(0, 300)
          .map((el) => getComputedStyle(el).fontFamily)
      ),
    ];

    const colors = {};
    for (const el of [
      document.body,
      document.querySelector("nav"),
      document.querySelector("h1"),
      document.querySelector(".rev-btn"),
      document.querySelector("footer"),
      ...document.querySelectorAll(".elementor-icon-box-title, .elementor-icon-box-description, a"),
    ].filter(Boolean)) {
      const cs = getComputedStyle(el);
      colors[el.tagName + "." + (el.className?.toString?.().split(" ")[0] || "")] = {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontFamily: cs.fontFamily,
      };
    }

    const nav = document.querySelector("nav");
    const navStylesTop = nav ? extractStyles(nav) : null;

    const favicons = [...document.querySelectorAll('link[rel*="icon"]')].map((l) => ({
      href: l.href,
      sizes: l.sizes?.toString(),
      rel: l.rel,
    }));

    const links = [...document.querySelectorAll("a")].map((a) => ({
      href: a.href,
      text: a.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
    }));

    const svgOuterHTMLs = [...document.querySelectorAll("svg")]
      .slice(0, 40)
      .map((s) => s.outerHTML.slice(0, 500));

    // Icon boxes content
    const iconBoxes = [...document.querySelectorAll(".elementor-icon-box-wrapper")].map((box) => ({
      title: box.querySelector(".elementor-icon-box-title")?.textContent?.trim(),
      description: box
        .querySelector(".elementor-icon-box-description")
        ?.textContent?.trim(),
      iconClass: box.querySelector("i, svg")?.className?.toString?.(),
      iconHTML: box.querySelector(".elementor-icon")?.innerHTML?.slice(0, 400),
      styles: extractStyles(box),
      titleStyles: box.querySelector(".elementor-icon-box-title")
        ? extractStyles(box.querySelector(".elementor-icon-box-title"))
        : null,
      descStyles: box.querySelector(".elementor-icon-box-description")
        ? extractStyles(box.querySelector(".elementor-icon-box-description"))
        : null,
    }));

    return {
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      bodyStyles: extractStyles(document.body),
      sections,
      images,
      videos,
      backgroundImages,
      revSlides,
      fonts,
      colors,
      navStylesTop,
      favicons,
      links: links.filter((l) => l.text).slice(0, 80),
      svgOuterHTMLs,
      iconBoxes,
      hasLenis: !!document.querySelector(".lenis"),
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className,
    };
  }, STYLE_PROPS);

  // Scroll sweep — capture nav after scroll
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);
  const navAfterScroll = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    if (!nav) return null;
    const cs = getComputedStyle(nav);
    return {
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      position: cs.position,
      height: cs.height,
      classes: nav.className,
    };
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  data.navAfterScroll = navAfterScroll;

  // Section screenshots
  const sectionRects = data.sections.map((s) => s.rect);
  for (let i = 0; i < Math.min(sectionRects.length, 12); i++) {
    const r = sectionRects[i];
    if (!r || r.height < 40 || r.height > 4000) continue;
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 20)), r.top);
    await page.waitForTimeout(300);
    const name = (data.sections[i].id || data.sections[i].classes || `section-${i}`)
      .toString()
      .replace(/[^a-z0-9_-]+/gi, "-")
      .slice(0, 60);
    try {
      await page.screenshot({
        path: path.join(OUT.refs, `${label}-section-${i}-${name}.png`),
        clip: {
          x: Math.max(0, r.left),
          y: 0,
          width: Math.min(width, r.width || width),
          height: Math.min(height - 40, Math.max(100, Math.min(r.height, height - 40))),
        },
      });
    } catch {
      /* clip may fail for offscreen */
    }
  }

  await writeFile(
    path.join(OUT.research, `extract-${label}.json`),
    JSON.stringify(data, null, 2)
  );
  return data;
}

async function main() {
  await ensureDirs();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  console.log("Extracting desktop 1440...");
  const desktop = await extractAtViewport(page, 1440, 900, "desktop-1440");

  console.log("Extracting tablet 768...");
  await extractAtViewport(page, 768, 1024, "tablet-768");

  console.log("Extracting mobile 390...");
  await extractAtViewport(page, 390, 844, "mobile-390");

  // Collect unique asset URLs
  const assets = new Set();
  for (const img of desktop.images || []) {
    if (img.src) assets.add(img.src);
  }
  for (const bg of desktop.backgroundImages || []) {
    const matches = [...bg.url.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
    for (const m of matches) assets.add(m[1]);
  }
  for (const slide of desktop.revSlides || []) {
    if (slide.src) assets.add(slide.src);
    if (slide.styleBg) {
      const matches = [...slide.styleBg.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
      for (const m of matches) assets.add(m[1]);
    }
  }
  for (const fav of desktop.favicons || []) {
    if (fav.href) assets.add(fav.href);
  }

  await writeFile(
    path.join(OUT.research, "asset-urls.json"),
    JSON.stringify([...assets], null, 2)
  );

  await writeFile(
    path.join(OUT.research, "summary.json"),
    JSON.stringify(
      {
        title: desktop.title,
        sectionCount: desktop.sections?.length,
        imageCount: desktop.images?.length,
        iconBoxCount: desktop.iconBoxes?.length,
        fonts: desktop.fonts,
        colors: desktop.colors,
        navTop: desktop.navStylesTop,
        navScrolled: desktop.navAfterScroll,
        assetCount: assets.size,
      },
      null,
      2
    )
  );

  console.log("Done.", {
    sections: desktop.sections?.length,
    images: desktop.images?.length,
    assets: assets.size,
    iconBoxes: desktop.iconBoxes?.length,
  });

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
