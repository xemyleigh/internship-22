import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../fetchApi";
import { actions as newsActions } from "../slices/newsSlice";
import { Container, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Story from "./Story";

const MainPage = () => {
  const dispatch = useDispatch();
  const { entities, ids } = useSelector((state) => state.newsInfo.news);
  const news = ids.map((id) => entities[id]);
  const isLoading = useSelector((state) => state.newsInfo.isLoading);

  const updateNewsFunc = async () => {
    try {
      console.log("error!!!!!!!!!!!!!!!");
      await dispatch(fetchNews());
    } catch (e) {
      dispatch(newsActions.setLoading(false));
      if (e.message === "network") {
        toast.error("Check your internet connection");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchNews());

    const timer = setInterval(async () => {
      updateNewsFunc();
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
          onClick={updateNewsFunc}
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
