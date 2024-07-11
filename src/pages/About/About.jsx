import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>At BroKoder's, our mission is to revolutionize the way businesses handle paperwork. We aim to reduce the burden of manual documentation and streamline operations through innovative digital solutions. Our goal is to create a more efficient, eco-friendly, and productive work environment by eliminating the need for excessive paperwork.</p>
        <p>We believe that by leveraging cutting-edge technology, we can help organizations save time, reduce costs, and focus more on their core activities. Our solutions are designed to automate processes, enhance data security, and improve accessibility, making paperwork a thing of the past.</p>
      </section>
      
      <section className="about-vision">
        <h2>Our Vision</h2>
        <p>We envision a world where businesses operate seamlessly without the constraints of traditional paperwork. Our vision is to lead the transformation towards fully digital workplaces, fostering innovation, sustainability, and efficiency. By promoting a paperless culture, we aim to contribute to a greener planet and a smarter future.</p>
      </section>
      
      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li>Integrity: We uphold the highest standards of integrity in all of our actions.</li>
          <li>Innovation: We constantly seek new ways to enhance our solutions and services.</li>
          <li>Customer Focus: Our customers are at the heart of everything we do.</li>
          <li>Excellence: We strive for excellence in every aspect of our business.</li>
        </ul>
      </section>
      
      <section className="about-team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            {/* <img src="[Team Member Image URL]" alt="Team Member Name" /> */}
            <h3>Sumit Kandpal</h3>
            {/* <p>Role: [Role]</p>
            <p>Bio: [Brief Bio]</p> */}
          </div>
          <div className="team-member">
            {/* <img src="[Team Member Image URL]" alt="Team Member Name" /> */}
            <h3>Abhay Rana</h3>
            {/* <p>Role: [Role]</p>
            <p>Bio: [Brief Bio]</p> */}
          </div>
          <div className="team-member">
            {/* <img src="[Team Member Image URL]" alt="Team Member Name" /> */}
            <h3>Mukesh Pandey</h3>
            {/* <p>Role: [Role]</p>
            <p>Bio: [Brief Bio]</p> */}
          </div>
          
        </div>
      </section>
      
      <footer className="about-footer">
        <p>Contact us at brokoders@gmail.com</p>
      </footer>
    </div>
  );
}

export default About;
