import { chromium } from "playwright";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const PAGES = [
  { slug: "about-us", url: "https://jansenvorster.co.za/about-us/" },
  { slug: "brands", url: "https://jansenvorster.co.za/brands/" },
  { slug: "why-choose-us", url: "https://jansenvorster.co.za/why-choose-us/" },
  { slug: "services", url: "https://jansenvorster.co.za/services/" },
  { slug: "contact-us", url: "https://jansenvorster.co.za/contact-us/" },
];

const STYLE_PROPS = [
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "letterSpacing",
  "color",
  "textTransform",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "padding",
  "paddingTop",
  "paddingBottom",
  "margin",
  "width",
  "height",
  "maxWidth",
  "display",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "gap",
  "gridTemplateColumns",
  "textAlign",
  "borderRadius",
  "border",
  "boxShadow",
  "position",
  "opacity",
];

async function dismissCookies(page) {
  try {
    await page
      .locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll")
      .click({ timeout: 2500 });
    await page.waitForTimeout(400);
  } catch {
    try {
      await page.getByRole("button", { name: /Allow all/i }).click({ timeout: 1500 });
      await page.waitForTimeout(400);
    } catch {
      /* ignore */
    }
  }
}

async function extractPage(page, { slug, url }) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(1500);
  await dismissCookies(page);

  const refDir = path.join("docs/design-references", slug);
  await mkdir(refDir, { recursive: true });
  await mkdir(path.join("docs/research", slug), { recursive: true });

  await page.screenshot({
    path: path.join(refDir, "desktop-1440-full.png"),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(refDir, "desktop-1440-viewport.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(refDir, "mobile-390-full.png"),
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(300);

  const data = await page.evaluate((props) => {
    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) {
        const v = cs[p];
        if (
          v &&
          v !== "none" &&
          v !== "normal" &&
          v !== "auto" &&
          v !== "0px" &&
          v !== "rgba(0, 0, 0, 0)"
        )
          out[p] = v;
      }
      return out;
    }

    function text(el) {
      return el?.textContent?.replace(/\s+/g, " ").trim() || null;
    }

    const main =
      document.querySelector(".elementor") ||
      document.querySelector("main") ||
      document.querySelector("#content") ||
      document.body;

    const sections = [
      ...document.querySelectorAll(
        ".elementor-top-section, .banner_area, .breadcrumb_area, .page_banner, header, footer, form"
      ),
    ].map((el, i) => {
      const r = el.getBoundingClientRect();
      return {
        i,
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString?.().split(" ").slice(0, 8).join(" "),
        rect: {
          top: Math.round(r.top + scrollY),
          height: Math.round(r.height),
          width: Math.round(r.width),
        },
        styles: styles(el),
        textPreview: text(el)?.slice(0, 300),
        html: el.innerHTML?.slice(0, 1500),
      };
    });

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5")].map((h) => ({
      tag: h.tagName,
      text: text(h),
      styles: styles(h),
    }));

    const paragraphs = [...document.querySelectorAll(".elementor-widget-text-editor p, .elementor-widget-text-editor, article p")]
      .map((p) => ({ text: text(p), styles: styles(p), html: p.innerHTML?.slice(0, 800) }))
      .filter((p) => p.text && p.text.length > 10);

    const images = [...document.querySelectorAll("img")]
      .filter((img) => img.naturalWidth > 20)
      .map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
        styles: styles(img),
      }));

    const backgroundImages = [...document.querySelectorAll("*")]
      .filter((el) => {
        const bg = getComputedStyle(el).backgroundImage;
        return bg && bg !== "none" && bg.includes("url(");
      })
      .slice(0, 40)
      .map((el) => ({
        url: getComputedStyle(el).backgroundImage,
        classes: el.className?.toString?.().split(" ").slice(0, 5).join(" "),
        tag: el.tagName,
      }));

    const iconBoxes = [...document.querySelectorAll(".elementor-icon-box-wrapper")].map((box) => ({
      title: text(box.querySelector(".elementor-icon-box-title")),
      description: text(box.querySelector(".elementor-icon-box-description")),
      iconClass: box.querySelector("i")?.className,
      iconStyles: styles(box.querySelector(".elementor-icon")),
      titleStyles: styles(box.querySelector(".elementor-icon-box-title")),
      descStyles: styles(box.querySelector(".elementor-icon-box-description")),
    }));

    const forms = [...document.querySelectorAll("form")].map((form) => ({
      action: form.action,
      method: form.method,
      id: form.id,
      classes: form.className,
      fields: [...form.querySelectorAll("input, textarea, select, button")].map((f) => ({
        tag: f.tagName.toLowerCase(),
        type: f.getAttribute("type"),
        name: f.getAttribute("name"),
        id: f.id,
        placeholder: f.getAttribute("placeholder"),
        required: f.required,
        label:
          (f.id && document.querySelector(`label[for="${f.id}"]`)?.textContent?.trim()) ||
          f.closest("p, .form-group, .wpcf7-form-control-wrap")?.previousElementSibling?.textContent?.trim() ||
          null,
        styles: styles(f),
      })),
      html: form.outerHTML.slice(0, 4000),
    }));

    const lists = [...document.querySelectorAll(".elementor-widget-text-editor ul, .elementor-widget-text-editor ol")]
      .map((ul) => ({
        items: [...ul.querySelectorAll("li")].map((li) => text(li)),
        styles: styles(ul),
      }))
      .filter((l) => l.items.length);

    // Breadcrumb / page title banners
    const banner =
      document.querySelector(".banner_area, .breadcrumb_area, .page_banner, .elementor-location-header") ||
      document.querySelector(".elementor-top-section");

    const mainHtml = main?.innerHTML?.slice(0, 20000) || null;

    return {
      title: document.title,
      headings,
      paragraphs: paragraphs.slice(0, 40),
      sections,
      images,
      backgroundImages,
      iconBoxes,
      forms,
      lists,
      banner: banner
        ? {
            classes: banner.className?.toString?.().slice(0, 120),
            styles: styles(banner),
            text: text(banner)?.slice(0, 200),
            html: banner.innerHTML?.slice(0, 2000),
          }
        : null,
      bodyText: text(document.querySelector(".elementor"))?.slice(0, 4000),
      mainHtml,
    };
  }, STYLE_PROPS);

  await writeFile(
    path.join("docs/research", slug, "extract.json"),
    JSON.stringify(data, null, 2)
  );

  console.log(slug, {
    sections: data.sections.length,
    headings: data.headings.map((h) => h.text).slice(0, 8),
    images: data.images.length,
    iconBoxes: data.iconBoxes.length,
    forms: data.forms.length,
  });

  return data;
}

async function main() {
  await mkdir("docs/research", { recursive: true });
  await mkdir("docs/design-references", { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  const summary = {};
  for (const p of PAGES) {
    summary[p.slug] = await extractPage(page, p);
  }

  // Collect new asset URLs
  const assets = new Set();
  for (const d of Object.values(summary)) {
    for (const img of d.images || []) if (img.src?.startsWith("http")) assets.add(img.src);
    for (const bg of d.backgroundImages || []) {
      for (const m of bg.url.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        if (m[1].startsWith("http")) assets.add(m[1]);
      }
    }
  }
  await writeFile("docs/research/pages-asset-urls.json", JSON.stringify([...assets], null, 2));
  await writeFile(
    "docs/research/pages-summary.json",
    JSON.stringify(
      Object.fromEntries(
        Object.entries(summary).map(([k, v]) => [
          k,
          {
            title: v.title,
            headings: v.headings.map((h) => h.text),
            sectionCount: v.sections.length,
            iconBoxes: v.iconBoxes.map((b) => b.title),
            formCount: v.forms.length,
            imageCount: v.images.length,
          },
        ])
      ),
      null,
      2
    )
  );

  await browser.close();
  console.log("Done. Assets:", assets.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
