import React, { useState, useEffect } from "react";
import PatientVitals from "./PatientVitals";
import TermsAndCondition from "./TermsAndCondition";
import { useParams } from "react-router-dom";
import * as patientService from "../services/patient";

const PatientIntakeForm = () => {
  const { hashKey } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const [patientDetails, setPatientDatails] = useState();

  useEffect(() => {
    getPatientDetails(hashKey);
  }, [hashKey]);

  const getPatientDetails = async (hashKey) => {
    try {
      const response = await patientService.getPatientDetails(hashKey);
      setPatientDatails(response.patientInfo);
    } catch (err) {}
  };
  return (
    <div>
      {patientDetails.messageStatus === "SENT" ? (
        <>
          {patientDetails.messageType === "newPatient" ? (
            <>
              {!isAgreed && (
                <TermsAndCondition
                  setIsAgreed={setIsAgreed}
                  name={patientDetails.givenName}
                  phone={patientDetails.phone}
                />
              )}
              {isAgreed && (
                <PatientVitals
                  name={`${patientDetails.givenName} ${patientDetails.familyName}`}
                  phone={patientDetails.phone}
                />
              )}
            </>
          ) : (
            <PatientVitals />
          )}
        </>
      ) : null}
    </div>
  );
};

export default PatientIntakeForm;
