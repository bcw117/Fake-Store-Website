import React from "react";
import logo from "../assets/logo.png";
import { SocialIcon } from "react-social-icons";

const sendMessage = async (e) => {
  e.preventDefault();
  alert("Your email has been added to mailing list");
};

export const Footer = () => {
  return (
    <div className="footer">
      <hr />
      <div className="footer-top">
        <div className="footer-mailinglist">
          <p>Join Our Mailing List</p>
          <p>Get updates on the latest sales, new arrivals and more!</p>
          <form onSubmit={sendMessage}>
            <input
              className="bg-inherit outline-none border-b border-b-gray-400 justify-start"
              type="text"
              placeholder="Email Address"
            />
          </form>
        </div>
        <img src={logo} alt="FakeStore" />
        <ul className="footer-links">
          <li>Company</li>
          <li>Products</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-icons-container">
        <SocialIcon network="instagram"></SocialIcon>
        <SocialIcon network="whatsapp"></SocialIcon>
        <SocialIcon
          network="github"
          url="https://github.com/bcw117"
        ></SocialIcon>
      </div>
      <div className="footer-copyright">
        <p>@ 2024 FakeStore, Inc. All Rights Reserved</p>
      </div>
    </div>
  );
};
