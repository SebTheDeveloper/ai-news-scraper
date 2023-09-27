import ArticlesWrapper from "./ArticlesWrapper";
import Tldr from "./Tldr";
import Favorites from "./Favorites";
import { useUserContext } from "../context/UserContext";

export default function Bottom({ categoryFilter }) {
    const { selectedTab } = useUserContext();

    if (selectedTab === "tldr") {
        return <Tldr />
    } else if (selectedTab === "favorites") {
        return <Favorites />
    }
    
  return (
  <div className="bottom">
  <ArticlesWrapper categoryFilter={categoryFilter} />
  <div className="right-sidebar">
                    <div className="feature-card">
                        <p className="section-title">Features</p>
                        <div className="feature">
                            <p>Daily TLDR</p>
                            <p>Get a quick summary of today's news based on your interests</p>
                        </div>
                        <div className="feature">
                            <p>Ask Questions</p>
                            <p>Ask News Buddy a question about any article to have a conversation</p>
                        </div>
                        <div className="feature">
                            <p>Manage Favorites</p>
                            <p>Save any article to your favorites list. When you ask a question, that article will be added to favorites automatically in order to preserve chat history.
                            </p>
                        </div>
                    </div>
                    <div className="metrics-card">
                        <p className="section-title">Metrics</p>
                    </div>
                </div>
  </div>
  )
}