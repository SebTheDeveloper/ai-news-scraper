import ArticlesWrapper from "./ArticlesWrapper";
import Tldr from "./Tldr";
import Favorites from "./Favorites";
import MetricsBox from "./MetricsBox";
import { useTabsContext } from "../context/TabsContext";
import UserContextProvider from "../context/UserContext";

export default function Bottom({ categoryFilter }) {
    const { selectedTab } = useTabsContext();

    if (selectedTab === "tldr") {
        return <Tldr />
    } else if (selectedTab === "favorites") {
        return (
            <UserContextProvider>
                <Favorites categoryFilter={categoryFilter} />
            </UserContextProvider>
        )
    } else if (selectedTab === "settings") {
        return (
            <div style={{padding: '2rem'}}>
                <p>Settings page has not yet been created</p>
            </div>
        )
    } else if (selectedTab === "privacy") {
        return (
        <div style={{padding: '2rem'}}>
            <p>Privacy page has not yet been created</p>
        </div>
        )
    }
    
  return (
  <div className="bottom">
  <ArticlesWrapper categoryFilter={categoryFilter} />
  <div className="right-sidebar" style={{display: categoryFilter ? "none" : "flex"}}>
                    <div className="feature-card">
                        <p className="section-title">Features</p>
                        <div className="feature">
                            <p>Ask Questions</p>
                            <p>Ask News Buddy a question about any article to start a conversation</p>
                        </div>
                        <div className="feature">
                            <p>Daily TLDR</p>
                            <p>Get a quick summary of today's news in the "Daily TLDR" tab</p>
                        </div>
                        <div className="feature">
                            <p>Manage Favorites</p>
                            <p>Save any article to your favorites list. When you ask a question, that article will be added to favorites automatically in order to preserve chat history.
                            </p>
                            <p>When you remove an article from favorites, it will automatically forget the chat history. To re-save your chat, simply send another message to the chatbot and the history will save.</p>
                        </div>
                        <div className="feature">
                            <p>Filter Articles by Category</p>
                            <p>When the AI assistant summarizes an article, it also provides a list of categories related to the article.</p>
                            <p>To filter articles by category, start typing in the filter input box.</p>
                        </div>
                    </div>
                    {/* <MetricsBox /> */}
                </div>
  </div>
  )
}