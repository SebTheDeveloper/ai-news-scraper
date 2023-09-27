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
                <Favorites />
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
  <div className="right-sidebar">
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
                            <p>Save any article to your favorites list. When you ask a question, that article will be added to favorites automatically to preserve chat history.
                            </p>
                        </div>
                    </div>
                    {/* <MetricsBox /> */}
                </div>
  </div>
  )
}