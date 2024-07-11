import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="p-10">
      <div className="contact-container">
        <h1 className="font-bold text-2xl py-2">Contact Us</h1>
        <p>
          We would love to hear from you! Please fill out this form and we will
          get in touch with you shortly.
        </p>
        <div className="contact-details">
          <div className="contact-item">
            <i className="fas fa-phone-alt"></i>
            <span>+919058044318</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>brokoders@gmail.com</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Almora, Uttarakhand, India.</span>
          </div>
        </div>
        <form className="contact-form">
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Message:
            <textarea name="message" required></textarea>
          </label>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
