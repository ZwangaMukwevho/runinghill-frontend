import ReactPaginate from "react-paginate";
import SentencesContainer from "./sentencesContainer";
import React, { useState } from "react";
import classes from "./sentenceTable.module.css";
import Loader from "./loader";

export default function SentencesTable(props) {
  // Pagination configuration
  const [pageNumber, setPageNumber] = useState(0);
  const sentencesPerPage = 5;
  const pagesVisited = pageNumber * sentencesPerPage;

  const displayRows = props.sentences
    .slice(pagesVisited, pagesVisited + sentencesPerPage)
    .map((sentence, i) => {
      return (
        <SentencesContainer key={i} sentence={sentence}></SentencesContainer>
      );
    });

  const sentenceCount = Math.ceil(props.sentences.length / sentencesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return props.loading ? (
    <Loader bool={props.loading} />
  ) : (
    <div className={classes.tableBackround}>
      <div className={classes.marginBottom}>{displayRows}</div>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"Next"}
        pageCount={sentenceCount}
        onPageChange={changePage}
        containerClassName={classes.paginationBttns}
        previousLinkClassName={classes.previousBttn}
        nextLinkClassName={classes.nextBttn}
        disabledClassName={classes.paginationDisabled}
        activeClassName={classes.paginationActive}
      ></ReactPaginate>
    </div>
  );
}
