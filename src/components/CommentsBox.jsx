import { actions as commentsActions } from "../slices/commentsSlice";
import { actions as descendantCommentActions } from "../slices/descendantCommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Spinner, ListGroup, Button } from "react-bootstrap";
import { decode } from "html-entities";
import { fetchDescendantComments } from "../fetchApi";
import { fetchComments } from "../fetchApi";
import { toast } from "react-toastify";
import convertDate from "../convertDate";

const Comment = ({ parentId, author, text, time, kids, depth }) => {
  const dispatch = useDispatch();
  const [isButtonShown, setButtonShownStatus] = useState(true);

  const openNestedCommentsHandler = (parentId) => async () => {
    try {
      await dispatch(fetchDescendantComments({ parentId, depth: depth + 1 }));
      setButtonShownStatus(false);
    } catch (e) {
      toast.error("Check your internet connection");
    }
  };

  const date = convertDate(time);

  return (
    <ListGroup.Item className="py-3" style={{ paddingLeft: depth * 50 }}>
      <div className="">
        <h5>{author}:</h5>
        <p className="">{decode(text)}</p>
        <p className="text-muted ">{date}</p>

        {kids && isButtonShown && (
          <>
            <Button onClick={openNestedCommentsHandler(parentId)}>
              Open nested comments
            </Button>
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};

const CommentsBox = ({ commentsIds, parentId }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commentsInfo.isLoading);
  const { entities, ids } = useSelector((state) => state.commentsInfo.comments);
  const comments = ids.map((id) => entities[id]);

  const contentWhileLoading = (
    <div className="display-block text-center">
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
        className="me-2 p-3"
        variant="primary"
      />
    </div>
  );

  const contentWhenLoaded = (
    <ListGroup variant="flush" className="">
      {commentsIds ? (
        <>
          <p className="text-muted">Count: {comments.length}</p>
          {comments.map(({ by, id, text, time, kids, depth }) => (
            <Comment
              key={id}
              parentId={id}
              author={by}
              text={text}
              time={time}
              kids={kids}
              depth={depth}
            />
          ))}
        </>
      ) : (
        <p className="text-muted">No comments yet</p>
      )}
    </ListGroup>
  );

  useEffect(() => {
    dispatch(fetchComments(parentId));
    return () => {
      dispatch(commentsActions.cleanComments());
      dispatch(descendantCommentActions.cleanComments());
    };
  }, []);

  return (
    <>
      <h2>Comments</h2>
      {isLoading ? contentWhileLoading : contentWhenLoaded}
    </>
  );
};

export default CommentsBox;
