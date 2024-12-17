import React, { useEffect } from "react";
import { useState } from "react";
import Description from "./description";
import AdditionalInformation from "./AdditionalInformation";

export default function SingleProductTabs({ product }) {
  const [active, SetActive] = useState(1);
  const renderContent = () => {
    switch (active) {
      case 1:
        return <AdditionalInformation product={product} />;
      case 2:
        return <Description product={product} />;
      default:
        return null;
    }
  };

  return (
    <div className="tabs">
      <div className="tabsBtn">
        <input
          type="button"
          className={active == 1 ? "active" : ""}
          onClick={() => SetActive(1)}
          value="Additional Information"
        />
        <input
          type="button"
          className={active == 2 ? "active" : ""}
          onClick={() => SetActive(2)}
          value="Description"
        />
      </div>

      <div className="contentContainer">{renderContent()}</div>
    </div>
  );
}
