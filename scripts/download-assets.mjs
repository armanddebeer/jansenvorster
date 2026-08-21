import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const ASSETS = [
  {
    url: "https://jansenvorster.co.za/wp-content/uploads/2023/07/jv.logo_.png",
    out: "public/images/logo.png",
  },
  {
    url: "https://jansenvorster.co.za/wp-content/uploads/2023/07/jv.logo_-1.png",
    out: "public/images/logo-alt.png",
  },
  {
    url: "https://jansenvorster.co.za/wp-content/uploads/2023/07/new-img-GLASSES.webp",
    out: "public/images/hero-glasses.webp",
  },
  {
    url: "https://media.jansenvorster.co.za/wp-content/uploads/2021/03/24132554/cropped-new-fav-32x32.png",
    out: "public/seo/favicon-32.png",
  },
  {
    url: "https://media.jansenvorster.co.za/wp-content/uploads/2021/03/24132554/cropped-new-fav-192x192.png",
    out: "public/seo/favicon-192.png",
  },
  {
    url: "https://media.jansenvorster.co.za/wp-content/uploads/2021/03/24132554/cropped-new-fav-180x180.png",
    out: "public/seo/apple-touch-icon.png",
  },
];

const BRANDS = [
  ["arnette", "https://jansenvorster.co.za/wp-content/uploads/2023/07/arnette-1.png"],
  ["cat", "https://jansenvorster.co.za/wp-content/uploads/2023/07/cat-1.png"],
  ["cube", "https://jansenvorster.co.za/wp-content/uploads/2023/07/cube-1.png"],
  ["etnia", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184825/7.png"],
  ["ea", "https://jansenvorster.co.za/wp-content/uploads/2023/07/ea-1.png"],
  ["eco", "https://jansenvorster.co.za/wp-content/uploads/2023/07/eco-1.png"],
  ["guess", "https://jansenvorster.co.za/wp-content/uploads/2023/07/guess-1.png"],
  ["jeep", "https://jansenvorster.co.za/wp-content/uploads/2023/07/Jeep-01-1.png"],
  ["moonstone", "https://jansenvorster.co.za/wp-content/uploads/2023/07/moonstone-1.png"],
  ["knex", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184821/6.png"],
  ["oakley", "https://jansenvorster.co.za/wp-content/uploads/2023/07/Oakley-01-1.png"],
  ["polo", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184818/5.png"],
  ["woow", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184814/4.png"],
  ["rayban", "https://jansenvorster.co.za/wp-content/uploads/2023/07/rb-1.png"],
  ["silhouette", "https://jansenvorster.co.za/wp-content/uploads/2023/07/s-1.png"],
  ["sightique", "https://jansenvorster.co.za/wp-content/uploads/2023/07/sight-1.png"],
  ["vogue", "https://jansenvorster.co.za/wp-content/uploads/2023/07/v-1.png"],
  ["moleskine", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184810/3.png"],
  ["william-morris", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184806/2.png"],
  ["ted-baker", "https://media.jansenvorster.co.za/wp-content/uploads/2023/11/28184801/1.png"],
];

async function download(url, outPath) {
  await mkdir(path.dirname(outPath), { recursive: true });
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Referer: "https://jansenvorster.co.za/",
    },
  });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(outPath));
  console.log("OK", outPath);
}

async function main() {
  const all = [
    ...ASSETS,
    ...BRANDS.map(([name, url]) => ({
      url,
      out: `public/images/brands/${name}.png`,
    })),
  ];

  // batch of 4
  for (let i = 0; i < all.length; i += 4) {
    const batch = all.slice(i, i + 4);
    await Promise.all(batch.map((a) => download(a.url, a.out)));
  }

  // brand manifest
  await writeFile(
    "public/images/brands/manifest.json",
    JSON.stringify(
      BRANDS.map(([name]) => ({ name, src: `/images/brands/${name}.png` })),
      null,
      2
    )
  );
  console.log("Downloaded", all.length, "assets");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
