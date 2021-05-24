import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { withRouter } from "react-router";
import term_and_condition from "../assets/docs/Curizmo_Terms_and_Conditions.pdf";

const TermsAndConditionPDF = (props) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <div>
        <Document
          file={term_and_condition}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default TermsAndConditionPDF;
