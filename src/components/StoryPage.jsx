import { useLocation } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import CommentsBox from "./CommentsBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, fetchStory } from "../fetchApi";
import { actions as commentsActions } from "../slices/commentsSlice";
import { actions as openedStoryActions } from "../slices/openedStorySlice";
import convertDate from "../convertDate";
import { toast } from "react-toastify";
import { actions as commentActions } from "../slices/commentsSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const StoryPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.storyInfo.story);
  const storyId = useLocation().pathname.slice(1);
  const { id, author, kids, time, title, url, descendants } = data;
  const isLoading = useSelector((state) => state.commentsInfo.isLoading);
  const date = convertDate(time);

  if (Object.keys(data).length === 0) {
    dispatch(fetchStory(storyId));
  }

  useEffect(() => {
    return () => {
      dispatch(commentsActions.cleanComments());
      dispatch(openedStoryActions.cleanOpenedStory());
    };
  }, []);

  const refreshCommentsHandler = async () => {
    try {
      await dispatch(fetchComments(id));
    } catch (e) {
      dispatch(commentActions.setLoading(false));
      if (e.message === "network") {
        toast.error("Check your internet connection");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <Container className="my-5 p-4 pb-0 border rounded bg-light bg-gradient shadow">
      <div className="p-4">
        <p>Author: {author}</p>
        <h1>Title: {title}</h1>
        <p className="text-muted">{date}</p>
        <div className="d-flex gap-3 mt-4">
          <Link to="/" className="btn btn-primary p-4 py-2">
            Go to main page
          </Link>
          <a
            href={url}
            className="btn btn-primary p-4 py-2"
            target="_blank"
            rel="noreferrer"
          >
            Visit website
          </a>
          <Button
            variant="info text-white"
            disabled={isLoading && kids}
            onClick={refreshCommentsHandler}
          >
            Refresh comments
          </Button>
        </div>
      </div>

      <CommentsBox commentsIds={kids} parentId={id} descendants={descendants} />
    </Container>
  );
};

export default StoryPage;
