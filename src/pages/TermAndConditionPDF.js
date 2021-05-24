import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./home.css";
import term_and_condition from "../assets/docs/Curizmo_Terms_and_Conditions.pdf";
import { useHistory } from "react-router";
import back from "../assets/images/back.svg";

const TermsAndConditionPDF = (props) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const history = useHistory();

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  const goBack = () => {
    history.push(`/${props.location.hashKey}/`);
  };

  return (
    <div>
        <div className="back-wrap">
            <div className="back-button" onClick={goBack}>
              <img className="nav-img-back" src={back} alt="go back"></img>
              <span>Back</span>
            </div>
        </div>
      <div className="pdf-wrap">
        <Document
          file={term_and_condition}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={({ numPages })=>onDocumentLoadSuccess(numPages)}
        >
          {Array.apply(null, Array(numPages))
            .map((x, i)=>i+1)
            .map(page => <Page pageNumber={page}/>)}
        </Document>
      </div>
    </div>
  );
};

export default TermsAndConditionPDF;
