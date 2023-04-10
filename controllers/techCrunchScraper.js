import { load } from 'cheerio';
import { connectToDb, getDb } from '../models/db.js';
import fetchHTML from '../utils/fetchHTML.js';
import scrapeAndProcessArticles from '../utils/scrapeAndProcessArticles.js';

const techCrunchUrl = 'https://techcrunch.com/';
const source = 'TechCrunch.com';

async function scrapeTechCrunch(url) {
  const html = await fetchHTML(url);
  const $ = load(html);

  const articles = [];

  $('.post-block').each((i, element) => {
    const title = $(element).find('.post-block__title__link').text().trim();
    const link = $(element).find('.post-block__title__link').attr('href');

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

async function scrapeArticleText(url) {
  try {
    if (url != undefined) {
      const html = await fetchHTML(url);
      const $ = load(html);
  
      const paragraphs = $('.article-content').find('p');
      const text = paragraphs
        .map((i, element) => $(element).text())
        .get()
        .join('\n');
  
      return text;
    }
  } catch (error) {
    console.error(`Error scraping article text: ${error}`);
    return '';
  }
}


const articles = await scrapeTechCrunch(techCrunchUrl);

let db;

async function main() {
  try {
    await connectToDb();
    db = getDb();
    const newArticlesCount= await scrapeAndProcessArticles(db, articles, scrapeArticleText);
    console.log(`Added ${newArticlesCount} ${source} articles to the database`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    db.client.close();
    console.log('Disconnected from database');
  }
}

main();