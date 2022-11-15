import { actions as commentsActions } from "../slices/commentsSlice"
import { actions as descendantCommentActions } from '../slices/descendantCommentsSlice'
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Spinner, ListGroup, Button } from "react-bootstrap"
import { decode } from 'html-entities'
import { fetchDescendantComments } from "../fetchApi"
import { fetchComments } from "../fetchApi"
import { toast } from "react-toastify"

const Comment = ({ parentId, author, text, time, kids }) => {
    const dispatch = useDispatch()
    // === logic for nested comments ===
    // const { entities, ids } = useSelector(state => state.descendantCommentsInfo.descendantComments)
    // const filteredIds = ids.filter(id => {
    //     return entities[id].parent === parentId
    // })

    // const comments = filteredIds.map(id => entities[id])

    // const openNestedCommentsHandler = (comments) => () => {
    //     dispatch(fetchDescendantComments(comments))
    // }

    // console.log(comments)
    // 
    // =================================

    const date = new Date(time * 1000)
    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'long',
        timezone: 'GMT',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };

    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions)
    return (
        <ListGroup.Item className="py-3">
            <div className="">
                <h5>{author}:</h5>
                <p className="">{decode(text)}</p>
                <p className="text-muted ">{formattedDate}</p>
                {/* === logic for nested comments ===

                {kids && (
                    <>
                        <Button onClick={openNestedCommentsHandler(kids)}>Open nested comments</Button>
                        {(comments.length > 0) &&
                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    {comments.map(({ by, id, text, time, kids, parent }) => <Comment key={id} id={id} author={by} text={text} time={time} kids={kids} parentId={parent} />)}
                                </ListGroup.Item>
                            </ListGroup>
                        }
                    </>
                )} */}
            </div>
        </ListGroup.Item>
    )
}

const CommentsBox = ({ commentsIds, parentId }) => {
    
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.commentsInfo.isLoading)
    const { entities, ids } = useSelector(state => state.commentsInfo.comments)
    const comments = ids.map(id => entities[id])


    const contentWhileLoading = (
        <div className="display-block text-center">
            <Spinner as="span" animation="border" size="lg" role="status" aria-hidden="true" className='me-2 p-3' variant="primary"/>
        </div>
    )

    const contentWhenLoaded = (
        <ListGroup variant="flush" className="">
            {(commentsIds) ? (
                <>
                    <p className="text-muted">Count: {comments.length}</p>
                    {comments.map(({ by, id, text, time, kids }) => <Comment key={id} parentId={id} author={by} text={text} time={time} kids={kids} />)}
                </>
                )
            : (<p className="text-muted">No comments yet</p>)}
        </ListGroup>
    )

    useEffect(() => {
        dispatch(fetchComments(parentId))
        return () => {
            dispatch(commentsActions.cleanComments())
            dispatch(descendantCommentActions.cleanComments())
        }
    }, [])

    return (
        <>
            <h2>Comments</h2>
            {(isLoading) ? (contentWhileLoading) : (contentWhenLoaded)}
        </>
    )
} 

export default CommentsBox