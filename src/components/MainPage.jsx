import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";
import { fetchNews } from "../fetchApi";
import { Link } from "react-router-dom";
import convertDate from "../convertDate";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Story = (storyData) => {
  const { id, author, score, comments, time, title, url } = storyData;
  const date = convertDate(time);

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
          <a href={url}>{title}</a>
        </Card.Title>
        <Link
          to={{ pathname: `/${id}`, state: storyData, id: id }}
          className="btn btn-primary mb-3 mt-2"
        >
          Visit topic
        </Link>
        {comments && <p>{`Count: ${comments.length}`}</p>}
        <p>{date}</p>
      </Card.Body>
    </Card>
  );
};

const MainPage = () => {
  const dispatch = useDispatch();
  const { entities, ids } = useSelector((state) => state.newsInfo.news);
  const news = ids.map((id) => entities[id]);
  const isLoading = useSelector((state) => state.newsInfo.isLoading);

  const updateButtonHandler = () => {
    dispatch(fetchNews());
  };

  useEffect(() => {
    dispatch(fetchNews());
    const timer = setInterval(() => {
      dispatch(fetchNews());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <div className="text-center mb-5 mt-5">
        <h1 className="mb-4">Hacker News Interface</h1>
        <Button
          variant="primary text-white"
          className="p-2 px-3"
          disabled={isLoading}
          onClick={updateButtonHandler}
        >
          {isLoading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          )}
          Refresh news
        </Button>
      </div>
      <ul>
        {news.map(({ id, by, score, kids, time, title, url }) => (
          <Story
            key={id}
            id={id}
            author={by}
            score={score}
            comments={kids}
            time={time}
            title={title}
            url={url}
          />
        ))}
      </ul>
    </Container>
  );
};

export default MainPage;
