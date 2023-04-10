import { load } from 'cheerio';
import { getDb } from '../models/db.js';
import { Configuration, OpenAIApi } from 'openai';
import { ObjectId } from 'mongodb';
import fetchHTML from './fetchHTML.js';

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Configured for TechCrunch
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

const getAnswer = async (messages) => {
  try {
     const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages
     });
     return result.data.choices[0].message.content;
  } catch (error) {
     console.error(`Error while generating summary: ${error.message}`);
     return 'try again';
  }
}

async function processQuestion(db, question, articleID) {
  const collection = db.db.collection('dashboard');

  let prompt = '';
  let answer = '';

  if (Array.isArray(articleID)) {
    let articles = [];

    for (const id of articleID) {
      const foundArticle = await collection.findOne({ _id: new ObjectId(id) });
      articles.push(foundArticle);
    }

    let articleNum = 1;
    for (const article of articles) {
      prompt += `
      Article #${articleNum++}
      Title: ${article.title}
      Source: ${article.source}
      Date: ${article.createdOn.date}
      Summary: ${article.summary}

      `;
    }

    answer = await getAnswer([
      {"role": "system", "content": `You are a helpful AI assistant that answers questions from the user based on multiple news articles. The user will first provide you with the Title, Source, Date and Summary of each article. Then the user will ask a question or multiple questions like the following example- Question: What are the major arguments from each article on this topic? How long after the first article was published was the second article published?`},
      {"role": "user", "content": `${prompt}
      
      Question: ${question}`}
      ]);

  } else {
    const article = await collection.findOne({ _id: new ObjectId(articleID) });
    prompt += `
      Title: ${article.title}
      Source: ${article.source}
      Date: ${article.createdOn.date}
      Summary: ${article.summary}
      `;

      console.log(prompt);

    answer = await getAnswer([
      {"role": "system", "content": `You are a helpful AI assistant that answers questions from the user based on a news article provided to you. The user will first give you the Title, Source, Date and Summary of each article. Then the user will ask a question or multiple questions like the following example- Question: What are the major arguments from each article on this topic? How long after the first article was published was the second article published?`},
      {"role": "user", "content": `${prompt}
      
      Question: ${question}`}
      ]);
  }

  return answer;
}

async function processDailyQuestion(db, question, date) {

  if (!date) {
    const now = new Date();
    date = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`;
  }

  const collection = db.db.collection('dashboard');
  const articles = await collection.find({ 'createdOn.date': date }).limit(20).toArray();

  let prompt = '';
  let answer = '';
  let articleNum = 1;

  for (const article of articles) {
    prompt += `
    Article #${articleNum++}
    Title: ${article.title}
    Link: ${article.link}
    Date: ${date}
    Summary: ${article.summary}

    `;
  }

  if (!prompt) return;

  answer = await getAnswer([
    {"role": "system", "content": `You are a helpful AI assistant that answers questions from the user based on a list of today's news articles.  You can only respond with information based on the articles that the user provides you. You must follow these instructions, do not reference information that is not in the context of the provided article list. The user will provide you with the Title, Link, Date and Summary of each article. Then the user will ask a question or multiple questions like the following example- Question: Can you break down all of the major news developments today into 3 paragraphs?`},
    {"role": "user", "content": `${prompt}
    
    Question: ${question}`}
    ]);

  return answer;
}

export default async function askQuestion({ question, articleID, date = undefined, dailyNews = false }) {
  try {
    const db = getDb();

    if (dailyNews) {
      const answer = await processDailyQuestion(db, question, date);
      console.log(answer);
    } else {
      const answer = await processQuestion(db, question, articleID);
      console.log(answer);
    }
  } catch (error) {
    console.error("Error processing question:", error);
  }
}