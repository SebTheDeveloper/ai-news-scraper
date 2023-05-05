import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const generateSummary = async (messages) => {
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

const selectionOfCategories = '[Finance, Crypto, Venture Capital, Economy, Technology, Stocks, Real Estate, World News, Healthcare, Taxes, Politics, Social Media, Cybersecurity, Business, Science, Entertainment, AI, Space, Sports, Military, Crime, Regulation, Advertisement]';

const summarize = async (articleText, maxAttempts = 3, retryAttempts = 0) => { 
   const summary = await generateSummary([
   {"role": "system", "content": `You are a helpful AI assistant that summarizes news articles in short and easy to understand explanations. After the summary, you also provide an array of categories that apply to the article. You must select 1 or more out of the following Categories: ${selectionOfCategories}`},
   {"role": "user", "content": `${articleText}

   Can you provide a brief, simple summary of this article in 1 paragraph?  Also, please provide an array of applicable categories after the summary. Pick 1 or more of the following Categories: ${selectionOfCategories} and you must, with no exception, format it like the following example-

   Categories: [Economy, AI, Venture Capital, Finance]`}
   ]);
   console.log((maxAttempts - retryAttempts) + ' retry attempts remaining')

   if (summary !== 'try again') {
   return summary;
   } else {
      if (retryAttempts >= maxAttempts) return undefined;
   }

   // Exponential backoff
   const delay = (2 ** retryAttempts) * 5000;
   await new Promise(resolve => setTimeout(resolve, delay));
   return summarize(articleText, maxAttempts, ++retryAttempts);
}

export default summarize;