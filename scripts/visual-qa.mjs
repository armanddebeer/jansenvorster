import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const ORIGINAL = "https://jansenvorster.co.za/";
const CLONE = "http://localhost:3000/";

async function dismissCookies(page) {
  try {
    await page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click({ timeout: 2500 });
    await page.waitForTimeout(500);
  } catch {
    try {
      await page.getByRole("button", { name: /Allow all/i }).click({ timeout: 1500 });
      await page.waitForTimeout(500);
    } catch {
      /* ignore */
    }
  }
}

async function shoot(page, url, prefix, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(1500);
  if (url.includes("jansenvorster")) await dismissCookies(page);
  await page.screenshot({
    path: `docs/design-references/qa-${prefix}-${width}-full.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `docs/design-references/qa-${prefix}-${width}-viewport.png`,
    fullPage: false,
  });
}

async function main() {
  await mkdir("docs/design-references", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const [w, h] of [
    [1440, 900],
    [390, 844],
  ]) {
    console.log("Original", w);
    await shoot(page, ORIGINAL, "original", w, h);
    console.log("Clone", w);
    await shoot(page, CLONE, "clone", w, h);
  }

  await browser.close();
  console.log("QA screenshots written");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
