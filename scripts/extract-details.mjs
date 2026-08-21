import { chromium } from "playwright";
import { writeFile, mkdir } from "fs/promises";

const TARGET = "https://jansenvorster.co.za/";

async function main() {
  await mkdir("docs/research", { recursive: true });
  await mkdir("docs/design-references", { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(TARGET, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(2000);

  // Dismiss Cookiebot
  try {
    await page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click({ timeout: 3000 });
    await page.waitForTimeout(800);
  } catch {
    try {
      await page.getByRole("button", { name: /Allow all/i }).click({ timeout: 2000 });
      await page.waitForTimeout(800);
    } catch {
      /* ignore */
    }
  }

  await page.screenshot({
    path: "docs/design-references/desktop-1440-full-nocookie.png",
    fullPage: true,
  });

  const details = await page.evaluate(() => {
    const props = [
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
      "margin",
      "width",
      "height",
      "maxWidth",
      "display",
      "flexDirection",
      "justifyContent",
      "alignItems",
      "gap",
      "textAlign",
      "borderRadius",
      "border",
      "boxShadow",
      "position",
      "zIndex",
      "transition",
      "opacity",
    ];

    function styles(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      for (const p of props) {
        const v = cs[p];
        if (v && v !== "none" && v !== "normal" && v !== "auto" && v !== "0px" && v !== "rgba(0, 0, 0, 0)")
          out[p] = v;
      }
      return out;
    }

    function text(el) {
      return el?.textContent?.replace(/\s+/g, " ").trim() || null;
    }

    // Hero / rev slider
    const slider = document.querySelector("#rev_slider_1_1_wrapper, .rev_slider_wrapper");
    const heroTitle = document.querySelector(".tp-caption.NotGeneric-Title, #slide-1-layer-1");
    const heroBtn = document.querySelector(".rev-btn, #slide-1-layer-10");
    const tpBg = document.querySelector(".tp-bgimg, .slotholder .tp-bgimg, .rev-slidebg");
    const allBgImgs = [...document.querySelectorAll(".tp-bgimg")].map((el) => ({
      src: el.getAttribute("src"),
      dataLazy: el.getAttribute("data-lazyload"),
      dataBg: el.getAttribute("data-bg"),
      style: el.getAttribute("style"),
      computedBg: getComputedStyle(el).backgroundImage,
    }));

    // Who we are + features + brands live in section d891ed7
    const mainSection = document.querySelector(".elementor-element-d891ed7");
    const headings = [...(mainSection?.querySelectorAll("h1,h2,h3,h4,h5") || [])].map((h) => ({
      tag: h.tagName,
      text: text(h),
      styles: styles(h),
    }));

    const paragraphs = [...(mainSection?.querySelectorAll("p") || [])]
      .map((p) => ({ text: text(p), styles: styles(p) }))
      .filter((p) => p.text && p.text.length > 5);

    const glassesImg = document.querySelector('img[src*="GLASSES"], img[srcset*="GLASSES"]');
    const brandImgs = [...document.querySelectorAll(".elementor-element-d891ed7 img")]
      .filter((img) => !img.src.includes("GLASSES") && !img.src.includes("logo"))
      .map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
        styles: styles(img),
        parent: img.closest(".elementor-widget-image")?.className,
      }));

    const iconBoxes = [...document.querySelectorAll(".elementor-icon-box-wrapper")].map((box) => {
      const icon = box.querySelector(".elementor-icon");
      const title = box.querySelector(".elementor-icon-box-title");
      const desc = box.querySelector(".elementor-icon-box-description");
      return {
        title: text(title),
        description: text(desc),
        iconClass: box.querySelector("i")?.className,
        iconStyles: styles(icon),
        iconIStyles: styles(box.querySelector("i")),
        titleStyles: styles(title),
        descStyles: styles(desc),
        boxStyles: styles(box),
      };
    });

    // Nested sections inside main
    const innerSections = [...(mainSection?.querySelectorAll(":scope .elementor-section") || [])].map(
      (sec, i) => ({
        i,
        classes: sec.className.split(" ").slice(0, 6).join(" "),
        id: sec.dataset?.id || null,
        rect: (() => {
          const r = sec.getBoundingClientRect();
          return {
            top: Math.round(r.top + scrollY),
            height: Math.round(r.height),
            width: Math.round(r.width),
          };
        })(),
        styles: styles(sec),
        textPreview: text(sec)?.slice(0, 180),
      })
    );

    const nav = document.querySelector("nav#fixed-top, nav.navbar");
    const navLinks = [...(nav?.querySelectorAll(".nav-link, .page-scroll, a") || [])]
      .map((a) => ({
        text: text(a),
        href: a.getAttribute("href"),
        styles: styles(a),
      }))
      .filter((a) => a.text && a.text.length < 40);

    const logo = document.querySelector(".navbar-brand img, .navbar-brand");
    const footer = document.querySelector("footer");
    const footerBottom = document.querySelector(".footer-bottom, .copyright, .f_bottom, .footer_bottom");
    const footerParts = footer
      ? [...footer.children].map((c) => ({
          classes: c.className,
          height: Math.round(c.getBoundingClientRect().height),
          bg: getComputedStyle(c).backgroundColor,
          text: text(c)?.slice(0, 200),
          styles: styles(c),
        }))
      : [];

    // Check sticky nav behavior after forcing scroll class
    return {
      hero: {
        sliderStyles: styles(slider),
        sliderHeight: slider?.getBoundingClientRect().height,
        title: text(heroTitle),
        titleStyles: styles(heroTitle),
        btn: text(heroBtn),
        btnStyles: styles(heroBtn),
        tpBg: tpBg
          ? {
              tag: tpBg.tagName,
              src: tpBg.getAttribute("src"),
              style: tpBg.getAttribute("style"),
              computedBg: getComputedStyle(tpBg).backgroundImage,
            }
          : null,
        allBgImgs,
      },
      nav: {
        styles: styles(nav),
        links: navLinks,
        logo: logo
          ? {
              tag: logo.tagName,
              src: logo.src || null,
              alt: logo.alt || null,
              styles: styles(logo),
              html: logo.outerHTML.slice(0, 500),
            }
          : null,
      },
      important: {
        section: styles(document.querySelector(".elementor-element-2969eab")),
        textStyles: styles(document.querySelector(".elementor-element-7b9062e")),
        html: document.querySelector(".elementor-element-7b9062e")?.innerHTML?.slice(0, 800),
      },
      main: {
        headings,
        paragraphs: paragraphs.slice(0, 10),
        glasses: glassesImg
          ? {
              src: glassesImg.currentSrc || glassesImg.src,
              styles: styles(glassesImg),
              naturalWidth: glassesImg.naturalWidth,
              naturalHeight: glassesImg.naturalHeight,
            }
          : null,
        brandImgs,
        iconBoxes,
        innerSections,
      },
      footer: {
        styles: styles(footer),
        parts: footerParts,
        bottom: footerBottom ? { styles: styles(footerBottom), text: text(footerBottom) } : null,
        fullText: text(footer)?.slice(0, 600),
        html: footer?.innerHTML?.slice(0, 2500),
      },
      // Elementor colors from CSS vars if any
      cssVars: (() => {
        const cs = getComputedStyle(document.documentElement);
        return {
          eGlobalColorPrimary: cs.getPropertyValue("--e-global-color-primary"),
          eGlobalColorSecondary: cs.getPropertyValue("--e-global-color-secondary"),
          eGlobalColorText: cs.getPropertyValue("--e-global-color-text"),
          eGlobalColorAccent: cs.getPropertyValue("--e-global-color-accent"),
        };
      })(),
    };
  });

  // Scroll nav test
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  details.navScrolled = await page.evaluate(() => {
    const nav = document.querySelector("nav");
    const cs = getComputedStyle(nav);
    return {
      classes: nav.className,
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      height: cs.height,
      padding: cs.padding,
      position: cs.position,
    };
  });

  // Capture who-we-are area screenshot
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "docs/design-references/desktop-who-we-are.png" });

  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "docs/design-references/desktop-features.png" });

  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "docs/design-references/desktop-brands.png" });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "docs/design-references/desktop-footer.png" });

  await writeFile("docs/research/details.json", JSON.stringify(details, null, 2));
  console.log(
    JSON.stringify(
      {
        heroTitle: details.hero.title,
        heroBg: details.hero.allBgImgs,
        glasses: details.hero.tpBg,
        brandCount: details.main.brandImgs.length,
        headings: details.main.headings.map((h) => h.text),
        iconTitles: details.main.iconBoxes.map((b) => b.title),
        footerParts: details.footer.parts.map((p) => ({
          h: p.height,
          bg: p.bg,
          t: p.text?.slice(0, 80),
        })),
        cssVars: details.cssVars,
        navScrolled: details.navScrolled,
      },
      null,
      2
    )
  );

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
