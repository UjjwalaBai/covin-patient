import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./home.css";
import term_and_condition from "../assets/docs/Curizmo_Terms_and_Conditions.pdf";
import { useHistory } from "react-router";

const TermsAndConditionPDF = (props) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const history = useHistory();
  console.log({ props });

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const goBack = () => {
    history.push(`/${props.location.hashKey}/`);
  };

  return (
    <div>
      <div className="pdf-wrap">
        <Document
          file={term_and_condition}
          options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="pdf-buttons">
        <div className="prev-next-button">
          <button
            className="prev-button pdf-button"
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous Page
          </button>
          <button
            type="button"
            className="next-button pdf-button"
            disabled={pageNumber >= numPages || pageNumber === 10}
            onClick={nextPage}
          >
            Next page
          </button>
        </div>
        <div>
          <button
            type="button"
            className="back-button pdf-button"
            onClick={goBack}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionPDF;
