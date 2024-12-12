import React, { useRef, useState } from "react";

export default function AboutAccordion() {
  const about = useRef(<input type="button" value="About us" />);
  const service = useRef(<input type="button" value="Service" />);
  const history = useRef(<input type="button" value="history" />);
  const [active, SetActive] = useState(about);
  const onclick = (ref) => {
    SetActive(ref);
  };
  const renderContent = () => {
    switch (active) {
      case about:
        return <p>Depot is your go-to destination for stylish, affordable furniture that elevates any space. From cozy living room pieces to functional office furniture, we offer quality, comfort, and modern designs for every room in your home. Shop our wide selection today and find the perfect pieces to suit your style and needs.</p>;
      case service:
        return <p>At Depot, we pride ourselves on offering exceptional customer service every step of the way. From personalized furniture recommendations to hassle-free delivery, our team is here to ensure your shopping experience is seamless and enjoyable. Whether you're furnishing a new home or updating a single room, we're committed to helping you find the perfect pieces with expert advice and support. Experience the Depot difference — where quality service meets your home design needs.</p>;
      case history:
        return <p>Depot was founded with a simple mission: to make high-quality, stylish furniture accessible to everyone. Over the years, we’ve grown into a trusted name in home furnishings, known for offering a diverse selection of pieces that blend functionality, comfort, and design. Our journey began with a small collection of carefully curated furniture, and today, we offer an extensive range of products to suit every style and budget. Committed to excellence, Depot continues to bring innovative solutions and exceptional value to homes across the country.</p>;
      default:
        return null;
    }
  };
  return (
    <div className="aboutAccordion">
      <div className="img">
        <img
          src="https://depot.qodeinteractive.com/wp-content/uploads/2017/01/about-img-1.jpg"
          loading="lazy"
          alt="depot"
        />
      </div>

      <div className="data">
        <div className="tabs">
          <input type="button" value="About us"  className={`${active === about ? "active" : ""}`} onClick={() => onclick(about)}/>
          <input type="button" value="Service" className={`${active === service ? "active" : ""}`}  onClick={() => onclick(service)}/>
          <input type="button" value="history" className={`${active === history ? "active" : ""}`}  onClick={() => onclick(history)} />
        </div>

        <div className="para">
            {renderContent()}
        </div>
      </div>
    </div>
  );
}
