import summarize from "../utils/summarize.js";
import parseCategoriesFromSummary from "../utils/parseCategoriesFromSummary.js";

export default async function scrapeAndProcessArticles(db, articles) {
  const collection = db.db.collection("dashboard");
  const matchingDocuments = await collection.find().toArray();
  let newArticlesCount = 0;

  const articlePromises = articles.map(async (article) => {
    // Check for duplicate titles
    const isDuplicate = matchingDocuments.some(
      (doc) => doc.title === article.title
    );
    if (isDuplicate) {
      console.log(`ERROR - DUPLICATE TITLE: ${article.title}`);
      return;
    }

    const articleText = await scrapeArticleText(article.link);
    const summarizedOutput = await summarize(articleText, 4);
    const { summary, categories } =
      parseCategoriesFromSummary(summarizedOutput);

    if (summary !== undefined && summary !== "") {
      const now = new Date();
      const currentTimeAndDate = {
        date: `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()}`,
        time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
        timezoneOffset: now.getTimezoneOffset(),
      };
      article.createdOn = currentTimeAndDate;
      article.summary = summary;
      article.categories = categories;
      article.fullText = articleText;

      await collection.insertOne(article);

      newArticlesCount++;

      console.log(article);
      console.log(
        "-----------------------------------------------------------"
      );
    }
  });

  await Promise.all(articlePromises)
    .then(() => {
      console.log("All articles processed successfully");
    })
    .catch((error) => {
      console.error("Error processing articles:", error);
    });

  return newArticlesCount;
}

async function scrapeArticleText(url) {
  try {
    if (url != undefined) {
      const html = await fetchHTML(url);
      const $ = load(html);

      const paragraphs = $(".article-content").find("p");
      const text = paragraphs
        .map((i, element) => $(element).text())
        .get()
        .join("\n");

      return text;
    }
  } catch (error) {
    console.error(`Error scraping article text: ${error}`);
    return "";
  }
}
