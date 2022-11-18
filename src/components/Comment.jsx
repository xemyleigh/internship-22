import { useDispatch } from "react-redux";
import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { decode } from "html-entities";
import { fetchDescendantComments } from "../fetchApi";
import { toast } from "react-toastify";
import convertDate from "../convertDate";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";

const Comment = ({ parentId, author, text, time, kids, depth }) => {
  const dispatch = useDispatch();
  const [isButtonShown, setButtonShownStatus] = useState(true);
  const commentDate = convertDate(time);
  const commentText = parse(decode(text));
  const { t } = useTranslation();

  const openNestedCommentsHandler = (parentId) => async () => {
    try {
      await dispatch(fetchDescendantComments({ parentId, depth: depth + 1 }));
      setButtonShownStatus(false);
    } catch (e) {
      if (e.message === "network") {
        toast.error("Check your internet connection");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <ListGroup.Item
      className="py-3 bg-light"
      style={{ paddingLeft: depth * 50 }}
    >
      <div className="d-flex flex-column gap-2">
        <h5>{author}:</h5>
        <div>{commentText}</div>
        <p className="text-muted m-0">{commentDate}</p>

        {kids && isButtonShown && (
          <>
            <Button
              onClick={openNestedCommentsHandler(parentId)}
              variant="outline-primary"
            >
              {t("comment.openNestedCommentsButton")}
            </Button>
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};

export default Comment;
