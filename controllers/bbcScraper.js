import { load } from 'cheerio';
import { connectToDb, getDb } from '../models/db.js';
import fetchHTML from '../utils/fetchHTML.js';
import scrapeAndProcessArticles from '../utils/scrapeAndProcessArticles.js';

const bbcNewsUrl = "https://www.bbc.com/news";
const source = 'bbc.com';

async function scrapeBBCNews(url) {
  const html = await fetchHTML(url);
  const $ = load(html);

  const articles = [];

  $(".media__content").each((i, element) => {
    const title = $(element).find(".media__content").text().trim();
    const link = $(element).find(".media__content a").attr("href");

    if (title && link) {
      articles.push({
        title,
        link,
        source
      });
    }
  });

  return articles;
}
scrapeBBCNews(bbcNewsUrl)

async function scrapeArticleText(url) {
  try {
    if (url != undefined) {
      if (url[0] === '/') {
        url = 'https://www.bbc.com' + url;
      }

      const html = await fetchHTML(url);
      const $ = load(html);
    
      const paragraphs = $("article").find("p");
      const text = paragraphs
        .map((i, element) => $(element).text())
        .get()
        .join("\n");
    
      return text;
    } 
  } catch (error) {
    console.error(`Error scraping article text: ${error}`);
    return '';
  }
}

const articles = await scrapeBBCNews(bbcNewsUrl);

let db;

async function main() {
  try {
    await connectToDb();
    db = getDb();
    const newArticlesCount= await scrapeAndProcessArticles(articles, scrapeArticleText, db);
    console.log(`Added ${newArticlesCount} ${source} articles to the database`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    db.client.close();
    console.log('Disconnected from database');
  }
}

main();