import React from "react";
import ImgBanner from "../../components/imgBanner/ImgBanner";
import AboutAccordion from "../../components/aboutAccordion/AboutAccordion";
export default function About() {
  return (
    <section className="about">
      <ImgBanner
        name={"About Us"}
        src={
          "https://depot.qodeinteractive.com/wp-content/uploads/2017/01/faq-title-img.jpg"
        }
      />
      <AboutAccordion></AboutAccordion>
    </section>
  );
}
