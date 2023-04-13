import ArticlesWrapper from "./ArticlesWrapper";

export default function Bottom() {
  return (
  <div className="bottom">
  <ArticlesWrapper />
  <div className="right-sidebar">
                    <div className="feature-card">
                        <p className="section-title">Features</p>
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
                    <div className="metrics-card">
                        <p className="section-title">Metrics</p>
                    </div>
                </div>
  </div>
  )
}