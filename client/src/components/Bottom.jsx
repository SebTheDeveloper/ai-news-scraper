import ArticlesWrapper from "./ArticlesWrapper";

export default function Bottom() {
  return (
  <div className="bottom">
  <ArticlesWrapper />
  <div className="right-sidebar">
                    <div className="feature-card">
                        <p className="section-title">Features</p>
                        <div className="feature">
                            <p>Daily TLDR</p>
                            <p>Get a quick summary of today's news based on your interests</p>
                        </div>
                        <div className="feature">
                            <p>Ask Questions</p>
                            <p>Inquire for more information from your AI News Buddy</p>
                        </div>
                        <div className="feature">
                            <p>Set Alerts *Coming Soon*</p>
                            <p>This feature will allow you to set up notifications for your favorite topics
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