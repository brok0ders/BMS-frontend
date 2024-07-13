import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./Contact.css";

const Contact = () => {
  const [state, handleSubmit] = useForm("xzzpzezl");

  const handleFormSubmit = async (event) => {
    await handleSubmit(event);
    event.target.reset(); // Reset the form fields after submission
  };

  return (
    <div className="contact-container">
      <h1 className="font-bold text-2xl py-2">Contact Us</h1>
      <p>
        We would love to hear from you! Please fill out this form and we will
        get in touch with you shortly.
      </p>
      <div className="contact-details flex flex-col sm:flex-row ">
        <div className="contact-item">
          <i className="fas fa-phone-alt"></i>
          <a href="tel:+919058044318">
            <span>+91 90580 44318</span>
          </a>
        </div>
        <div className="contact-item">
          <i className="fas fa-envelope"></i>
          <a href="mailto:brokoders@gmail.com">
            <span>brokoders@gmail.com</span>
          </a>
        </div>
        <div className="contact-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Almora, Uttarakhand, India.</span>
        </div>
      </div>
      <form onSubmit={handleFormSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
      {state.succeeded && <p>Thanks for joining!</p>}
    </div>
  );
};

export default Contact;
