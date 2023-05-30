import React from "react";
import "./HomePage.scss";
import SimpleForm from "../../components/SimpleForm/SimpleForm";
import netflixBcg from "../../../../assets/images/netflix-bcg.jpg";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-page__img-container">
        <img src={netflixBcg} alt="netflix background image" />
      </div>
      <section className="home-page__payment-form">
        <h1>Add your informations</h1>
        <SimpleForm />
      </section>
    </div>
  );
};
