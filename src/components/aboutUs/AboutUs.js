import React from "react";

const AboutUs = () => {
  return (
    <>
      <div className="about-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
        <h2>Our Story</h2>
        <p>
          Welcome to Recipe App, your go-to source for delicious and easy-to-follow recipes!
          We started with a simple idea: to create a platform where food enthusiasts can
          discover, share, and enjoy new recipes from around the world. Our journey began
          with a passion for cooking and a love for bringing people together through food.
        </p>
        <p>
          At Recipe App, we believe that cooking should be fun and accessible to everyone. 
          Our team is dedicated to curating a diverse collection of recipes that cater to 
          all tastes and dietary needs. Whether you’re a seasoned chef or a beginner in 
          the kitchen, we have something for you!
        </p>
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="/images/team/jane.jpg" alt="Jane Doe" className="team-photo" />
          <h3>Jane Doe</h3>
          <p>Co-Founder & Chef</p>
          <p>Jane is the culinary mastermind behind many of our favorite recipes. With years of experience in the kitchen, she loves creating dishes that are both delicious and approachable.</p>
        </div>
        <div className="team-member">
          <img src="/images/team/john.jpg" alt="John Smith" className="team-photo" />
          <h3>John Smith</h3>
          <p>Co-Founder & Tech Lead</p>
          <p>John is the tech guru who brings our recipe app to life. With a background in software development, he ensures that RecipeApp runs smoothly and is always improving.</p>
        </div>
        <h2>Our Mission</h2>
        <p>
          Our mission is to inspire and empower people to cook more and eat better. We strive to make high-quality recipes accessible to everyone, fostering a community where people can share their culinary adventures and learn from one another.
        </p>
      </section>
      <footer className="about-us-footer">
        <p>Thank you for visiting Recipe App. We hope you enjoy exploring our recipes and become a part of our cooking community!</p>
      </footer>
      </div>
    </>
  );
};

export default AboutUs;
