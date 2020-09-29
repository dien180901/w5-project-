import React from "react";
import { Modal, Button, Pagination } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const IssueModal = ({
  showModal,
  setShowModal,
  issue,
  comments,
  handleMoreComment,
  loadingComment,
  disableShowMore,
}) => {
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (issue == null) {
    return <div>loading</div>;
  }
  const renderers = {
    //This custom renderer changes how images are rendered
    //we use it to constrain the max width of an image to its container
    image: ({
        alt,
        src,
        title,
    }) => (
        <img 
            alt={alt} 
            src={src} 
            title={title} 
            style={{ maxWidth: 475 }}  />
    ),
};
function P(props){
  return <p {...props} style ={{margin:'100px'}}></p>
}
  return (
    <div>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            #{issue.number}: <div className="dien-issue-title">{issue.title}</div> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMarkdown source={issue.body} renderers={{renderers},{p:P}} />
          <h2>comment Area</h2>
          {comments && comments.map((item) => <Comment comment={item} />)}
          {loadingComment ? (
            <div>loading</div>
          ) : (
            <>
            <hr></hr>
              {!disableShowMore && (
                <Button onClick={() => handleMoreComment(issue.number)} variant="dark">
                  Show more
                </Button>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div style={{ display: "flex"}}>
      <div className="dien-body-comment">
 
      <hr></hr>
        <h5 className="h5-comment">{comment.body}</h5>

      </div>
    </div>
  );
};

export default IssueModal;