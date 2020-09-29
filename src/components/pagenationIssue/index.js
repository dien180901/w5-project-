import React from "react";
import { Pagination } from "react-bootstrap";

const PagenationIssue = ({ totalPageNum, setPageNum, pageNum,setIsFirst,isFirst }) => {
    const handleClickOnNext=()=>{
        if (pageNum<totalPageNum){
            setPageNum(pageNum+1);
        }
       
            setIsFirst(false)

    }

    const handleClickOnPrev=()=>{
        if (pageNum>1){
            setPageNum(pageNum-1);
        }
    }
    const handleClickOnLast=()=>{
        setPageNum(totalPageNum)
       
            setIsFirst(false)

    }
    const handleClickOnFirst=()=>{
        setPageNum(1)
    }


  return (
    <Pagination>
        <Pagination.First disbled={pageNum==1} onClick={handleClickOnFirst}/>
        <Pagination.Prev disabled={pageNum==1} onClick={handleClickOnPrev}/>
        <Pagination.Item active={isFirst==true} hidden={pageNum>1}>{1}</Pagination.Item>
        <Pagination.Ellipsis hidden={totalPageNum==1} />
        <Pagination.Item hidden={pageNum==1||pageNum==totalPageNum} active>
            {pageNum}
        </Pagination.Item>
        <Pagination.Ellipsis hidden={pageNum==1|| pageNum==30}/>
        <Pagination.Item hidden={totalPageNum==1} active={pageNum==totalPageNum}>
            {totalPageNum}
        </Pagination.Item>
        <Pagination.Next
            disabled={pageNum==totalPageNum}
            onClick={handleClickOnNext}
        />
        <Pagination.Last
            disabled={pageNum==totalPageNum}
            onClick={handleClickOnLast}
        />
    </Pagination>
  );
};

export default PagenationIssue;