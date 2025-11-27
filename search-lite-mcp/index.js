import axios from "axios";
import cheerio from "cheerio";

export default async function handler(input) {
  const q = encodeURIComponent(input.query);
  const url = `https://duckduckgo.com/html/?q=${q}`;

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const results = [];

  $(".result").each((i, el) => {
    if (i >= 3) return;

    const title = $(el).find("a.result__a").text().trim();
    const snippet = $(el).find(".result__snippet").text().trim();
    const href = $(el).find("a.result__a").attr("href");

    results.push({
      title,
      snippet,
      url: href
    });
  });

  return { results };
}
