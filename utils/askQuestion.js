import { load } from 'cheerio';
import { connectToDb, getDb } from '../models/db.js';
import { Configuration, OpenAIApi } from 'openai';
import { ObjectId } from 'mongodb';
import fetchHTML from './fetchHTML.js';

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

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

async function processQuestion(question, articleID, db) {
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
      Date: ${article.createdOn}
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
      Date: ${article.createdOn}
      Summary: ${article.summary}
      `;

    answer = await getAnswer([
      {"role": "system", "content": `You are a helpful AI assistant that answers questions from the user based on a news article provided to you. The user will first give you the Title, Source, Date and Summary of each article. Then the user will ask a question or multiple questions like the following example- Question: What are the major arguments from each article on this topic? How long after the first article was published was the second article published?`},
      {"role": "user", "content": `${prompt}
      
      Question: ${question}`}
      ]);
  }

  return answer;
}

let db;

export default async function askQuestion({ question, articleID }) {
  try {
    await connectToDb();
    db = getDb();
    const answer = await processQuestion(question, articleID, db);
    console.log(answer);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    db.client.close();
    console.log('Disconnected from database');
  }
}