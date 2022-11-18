import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
import { fetchComments } from "../fetchApi";
import Comment from "./Comment";
import { actions as commentsActions } from "../slices/commentsSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const CommentsBox = ({ commentsIds, parentId, descendants }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commentsInfo.isLoading);
  const { entities, ids } = useSelector((state) => state.commentsInfo.comments);
  const comments = ids.map((id) => entities[id]);
  const { t } = useTranslation();

  useEffect(() => {
    const downloadComments = async () => {
      try {
        await dispatch(fetchComments(parentId));
      } catch (e) {
        dispatch(commentsActions.setLoading(false));
        if (e.message === "network") {
          toast.error("Check your internet connection");
        } else {
          toast.error("Unknown error");
        }
      }
    };
    downloadComments();
  }, [commentsIds]);

  const contentWhileLoading = (
    <div className="display-block text-center my-4">
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
          <p className="text-muted">
            {t("commentsBox.commentsCount")}
            {descendants}
          </p>
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
        <p className="text-muted">{t("commentsBox.noComments")}</p>
      )}
    </ListGroup>
  );

  return (
    <div className="p-4 mt-3 border-top border-2 bg-light">
      <h2>{t("commentsBox.heading")}</h2>
      {isLoading ? contentWhileLoading : contentWhenLoaded}
    </div>
  );
};

export default CommentsBox;
