import React from "react";
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Moment from 'react-moment';
const List = ({ issueList, showDetail }) => {
  return (
    <div className="dien-list">
      {issueList.map((item) => (
        <Item item={item} showDetail={showDetail} />
      ))}
    </div>
  );
};

const Item = ({ item, showDetail }) => {
  return (
      <Card className="dien-card" onClick={() => showDetail(item.number)}>
        <Container className="dien-container">
        <Row className="dien-row">
          <Col sm={3} className="dien-col">
            <div className="dien-parent-img">
            <img src={item.user.avatar_url} className="dien-card-img"></img>
            </div>
          </Col>
          <Col sm={9} className="dien-card-body">
            <Card.Body sm={8}>
              <Card.Text>
                <h5><b>#{item.number} {item.title}</b></h5>
                <h5 className="dien-h5">
                  <i>@{item.user.login} Last update:<Moment fromNow>{new Date(item.updated_at).toString()}</Moment> comments:{item.comments}
                  </i>
                </h5>
                <h5 className="dien-h5-p2">
                  {item.body.length>50?item.body.slice(0,50)+"...":item.body}
                </h5>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
  
      </Container>
        
        
      
  </Card>
 

  );
};

export default List;