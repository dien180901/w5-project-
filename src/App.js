import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/search";
import List from "./components/List";
import PagenationIssue from "./components/pagenationIssue";
import IssueModal from "./components/IssueModal";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [issueList, setIssueList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [errMsg, setErrMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [issue, setIssue] = useState(null);
  const [urlFetchComments, setUrlFetchComments] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [commentTotalPageNum, setCommentTotalPageNum] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentPageNum, setCommentPageNum] = useState(1);

  const fetchIssueData = async () => {
    if (!owner || !repo) {
      return;
    }
    setLoading(true);
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}&per_page=20`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.status == 200) {
        const link = response.headers.get("link");

        if (link) {
          const getTotalPage = link.match(
            /page=(\d+)&per_page=(\d+)>; rel="last"/ // 이거 설명좀
          ); // \d represent number + mean one to many
          if (getTotalPage) {
            console.log("getTotalpage", getTotalPage);
            setTotalPageNum(parseInt(getTotalPage[1]));
          
          }
        }
        setIssueList(data);
        setErrMsg(null);
        setIsFirst(true)
      } else {
        setErrMsg(`FETCH COMMENTS ERROR: ${data.message}`);
      }
    } catch (err) {
      setErrMsg(`fetch error ${err.message}`);
    }
    setLoading(false);
  };

  const fetchCommentData = async () => {
    if (!urlFetchComments && !showModal) {
      return;
    }
    setLoadingComment(true);
    try {
      let url = urlFetchComments;
      let response = await fetch(url);
      let data = await response.json();
      if (response.status == 200) {
        const link = response.headers.get("link");
      
        if (link) {
          const getTotalPage = link.match(
            /page=(\d+)&per_page=\d+>; rel="last"/
          );
          if (getTotalPage) {
            console.log("DAS",link)
            console.log("getTotalcommentpage", getTotalPage);
            setCommentTotalPageNum(parseInt(getTotalPage[1]));
          }
        }
        setErrMsg(null);
        setComments([...comments, ...data]);
      }
    } catch (err) {
      setErrMsg(`Fetch error: ${err.message}`);
    }
    setLoadingComment(false);
  };
  useEffect(() => {
    fetchIssueData();
  }, [owner, repo, pageNum]);

  useEffect(() => {
    fetchCommentData();
  }, [urlFetchComments]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { owner, repo } = getOwnerAndRepo();
    setOwner(owner);
    setRepo(repo);
    setPageNum(1);
    
    setTotalPageNum(1);
  };
  const getOwnerAndRepo = () => {
    let array = searchTerm.split("/");
    let owner = array[0];
    let repo = array[1];
    return { owner, repo };
  };
  const showDetail = async (issueNum) => {
    setShowModal(true);
    setComments([]);
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.status == 200) {
        setIssue(data);
        setUrlFetchComments(
          `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}/comments?page=1&per_page=5`
        );
      }
    } catch (err) {
      setErrMsg(`fetch error ${err.message}`);
    }
  };

  const handleMoreComment = (issueNum) => {
    if (commentPageNum >= commentTotalPageNum) {
      return;
    }
    setUrlFetchComments(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}/comments?page=${
        commentPageNum + 1
      }&per_page=5`
    );
    setCommentPageNum((c) => c + 1);
  };
  return (
    <div className="App">
      <div>
        <h1>Github Issue</h1>
      </div>
      <div>
        <Search
          searchTerm={searchTerm}
          onSearch={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
          loading={loading}
        />
      </div>
      <div className="errMassage-parent">
        <div className="errMassage">
          {errMsg && <div>{errMsg}</div>}
        </div>
      </div>
      <Container>
        <div className="pageNum"> 
        <PagenationIssue
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPageNum}
          setIsFirst={setIsFirst}
          isFirst={isFirst}
        />
        </div>
      </Container>
      <List issueList={issueList} showDetail={showDetail} />
      <IssueModal
        showModal={showModal}
        setShowModal={setShowModal}
        issue={issue}
        comments={comments}
        handleMoreComment={handleMoreComment}
        loadingComment={loadingComment}
        disableShowMore={commentPageNum === commentTotalPageNum}
      />
    </div>
  );
}

export default App;
