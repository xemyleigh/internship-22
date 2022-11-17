import { useDispatch } from "react-redux";
import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { decode } from "html-entities";
import { fetchDescendantComments } from "../fetchApi";
import { toast } from "react-toastify";
import convertDate from "../convertDate";
import parse from "html-react-parser";

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
        <p className="">{parse(decode(text))}</p>
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

export default Comment;
