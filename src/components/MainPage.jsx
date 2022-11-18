import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNews } from "../fetchApi";
import { actions as newsActions } from "../slices/newsSlice";
import { Container, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Story from "./Story";

const MainPage = () => {
  const dispatch = useDispatch();
  const { entities, ids } = useSelector((state) => state.newsInfo.news);
  const news = ids.map((id) => entities[id]);
  const isLoading = useSelector((state) => state.newsInfo.isLoading);
  const { t } = useTranslation();

  const updateNewsFunc = async () => {
    try {
      await dispatch(fetchNews());
    } catch (e) {
      dispatch(newsActions.setLoading(false));
      if (e.message === "network") {
        toast.error(t("errors.network"));
      } else {
        toast.error(t("errors.unknown"));
      }
    }
  };

  useEffect(() => {
    updateNewsFunc();
    const timer = setTimeout(async function update() {
      await updateNewsFunc();
      setTimeout(update, 60000);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="py-5">
      <div className="text-center my-5">
        <h1 className="mb-3">{t("mainPage.heading")}</h1>
        <Button
          variant="info text-white"
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
          {t("mainPage.refreshButton")}
        </Button>
      </div>
      <ul className="p-0">
        {news.map(({ id, by, score, kids, time, title, url, descendants }) => (
          <Story
            key={id}
            id={id}
            author={by}
            score={score}
            kids={kids}
            time={time}
            title={title}
            url={url}
            descendants={descendants}
          />
        ))}
      </ul>
    </Container>
  );
};

export default MainPage;
