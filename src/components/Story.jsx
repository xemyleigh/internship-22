import { Card, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import convertDate from "../convertDate";
import { actions as openedStoryActions } from "../slices/openedStorySlice";

const Story = (storyData) => {
  const dispatch = useDispatch();
  const { id, author, score, kids, time, title, url, descendants } = storyData;
  const date = convertDate(time);

  const visitHandler = () => {
    dispatch(openedStoryActions.setOpenedStory(storyData));
  };

  return (
    <Card className="mb-3 shadow">
      <Card.Header className="d-flex justify-content-start gap-1">
        Author: <b>{author}</b>
        <p className="text-muted m-0 ms-auto">
          Rating <Badge bg="primary">{score}</Badge>
        </p>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </Card.Title>
        <Link
          to={{ pathname: `/${id}`, state: storyData }}
          className="btn btn-primary mb-3 mt-2"
          onClick={visitHandler}
        >
          Open comments
        </Link>
        <p>{date}</p>
      </Card.Body>
    </Card>
  );
};

export default Story;
