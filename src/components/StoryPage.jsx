import { useHistory, useLocation } from "react-router-dom";
import { Button, Container, Spinner } from "react-bootstrap"
import CommentsBox from "./CommentsBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../slices/commentsSlice";
import axios from "axios";
import urls from "../urls";



const StoryPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { id, author, score, comments, time, title, url } = useLocation().state
    const isLoading = useSelector(state => state.commentsInfo.isLoading)

    const moveBackHandler = () => {
        history.goBack()
    }

    const refreshCommentsHandler = async () => {
        const { data } = await axios.get(urls.getItemData(id))
        console.log(data)
        if (data.hasOwnProperty('kids')) dispatch(fetchComments(data.kids))
    }

    console.log(comments)
    
    return (
        <Container>
            <div className="my-5">
                <p>Author: {author}</p>

                <h1>Title: {title}</h1>
                <div className="d-flex gap-3 mt-4"> 
                    <Button onClick={moveBackHandler} className='p-4 py-2'>Go back</Button>
                    <a href={url} className='btn btn-primary p-4 py-2' target='_blank'>Visit website</a>
                    <Button variant="info text-white" disabled={isLoading && comments} onClick={refreshCommentsHandler} >
                    {/* {(isLoading) && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className='me-2'
                            />
                        )} */}
                        Refresh comments
                    </Button>
                </div>
            </div>

                <CommentsBox commentsIds={comments} />
           
        </Container>
    )
}

export default StoryPage