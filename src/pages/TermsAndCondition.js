import React, { useState } from "react";
import * as patientService from "../services/patient";
import TermsAndConditionPDF from "./TermAndConditionPDF";
import { Link } from "react-router-dom";
import "../App.css";
import "./home.css";
import patient_profile from "../assets/images/icon_userprofile.svg";

const TermsAndCondition = ({
  setIsAgreed,
  name,
  phone,
  patientId,
  hashKey,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnClick = async () => {
    setIsAgreed(true);

    await patientService.createPatientAgreement({
      patientId,
      isAgreed: isChecked ? 1 : 0,
    });
  };

  return (
    <div className="initial-page-wrapper page-hero">
      <div className="name-container">
        <span className="main-text">Hello {name}!</span>
        <span className="dull-text">{phone}</span>
      </div>
      <div className="thanks-message">
        <span className="thanks-text">
          Thank you for giving us the opportunity to serve you.
        </span>
      </div>
      <div className="initial-page-content">
        <div className="page-alert">
          <input
            className="page-checkbox"
            type="checkbox"
            onChange={handleOnChange}
          />
          <label>
            I agree to the<span> </span>
            <Link
              to={{
                pathname: "/pdfPage",
                hashKey: hashKey,
              }}
              className="link-text"
            >
              Terms and Conditions
            </Link>
            <span> </span>
            of the usage this system
          </label>
          <span className="checkmark"></span>
        </div>
      </div>
      <button
        className="initial-page-content submit-btn"
        onClick={handleOnClick}
        disabled={!isChecked}
      >
        I AGREE
      </button>
    </div>
  );
};

export default TermsAndCondition;
