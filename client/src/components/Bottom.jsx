import Articles from "./Articles";

export default function Bottom() {
  return (
  <div className="bottom">
  <Articles />
  <div className="right-sidebar">
                    <p>Features</p>
                    <div className="feature-card">
                        <div className="feature">
                            <p>Site Maintenance</p>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis obcaecati animi aut consequatur quasi doloremque aliquid explicabo ad, provident exercitationem.</p>
                        </div>
                        <div className="feature">
                            <p>Community Share Day</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo modi, delectus vitae nihil provident sunt magnam. Nobis, quo.</p>
                        </div>
                        <div className="feature">
                            <p>Updated Privacy Policy</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quod, iure vel autem ipsam fugit adipisci cumque omnis obcaecati.</p>
                        </div>
                    </div>
                    <p id="trending">Trending</p>
                    <div className="trending-card">
                        <div className="trending-topic">
                            <img src="./images/javascript.jpg" alt="trending topic" />
                            <p>Javascript</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/CSS3.png" alt="trending topic" />
                            <p>CSS</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/html5.png" alt="trending topic" />
                            <p>HTML</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/react.webp" alt="trending topic" />
                            <p>React</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/nodejs.jpg" alt="trending topic" />
                            <p>Node JS</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/nextjs.png" alt="trending topic" />
                            <p>Next JS</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/threejs.png" alt="trending topic" />
                            <p>Three JS</p>
                        </div>
                        <div className="trending-topic">
                            <img src="./images/express.png" alt="trending topic" />
                            <p>Express</p>
                        </div>
                    </div>
                </div>
  </div>
  )
}