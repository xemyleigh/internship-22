import { useHistory, useLocation } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap";
import CommentsBox from "./CommentsBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../fetchApi";
import convertDate from "../convertDate";
import { toast } from "react-toastify";
import axios from "axios";
import urls from "../urls";

const StoryPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const id = useLocation().pathname.slice(1);
  const data = useLocation().state;
  const { author, score, comments, time, title, url } = data;

  const isLoading = useSelector((state) => state.commentsInfo.isLoading);
  const date = convertDate(time);

  const moveBackHandler = () => {
    history.goBack();
  };

  const refreshCommentsHandler = async () => {
    try {
      await dispatch(fetchComments(id));
    } catch (e) {
      if (e.message === "network") {
        toast.error("Check your internet connection");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <Container>
      <div className="my-5">
        <p>Author: {author}</p>

        <h1>Title: {title}</h1>
        <p className="text-muted">{date}</p>

        <div className="d-flex gap-3 mt-4">
          <Button onClick={moveBackHandler} className="p-4 py-2">
            Go back
          </Button>
          <a href={url} className="btn btn-primary p-4 py-2" target="_blank">
            Visit website
          </a>
          <Button
            variant="info text-white"
            disabled={isLoading && comments}
            onClick={refreshCommentsHandler}
          >
            Refresh comments
          </Button>
        </div>
      </div>

      <CommentsBox commentsIds={comments} parentId={id} />
    </Container>
  );
};

export default StoryPage;
