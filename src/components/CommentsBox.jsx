import { actions as commentsActions, fetchComments } from "../slices/commentsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Spinner, ListGroup, Button } from "react-bootstrap"
import { decode } from 'html-entities'
import { fetchDescendantComments } from "../slices/descendantCommentsSlice"

const Comment = ({ parentId, author, text, time, kids }) => {
    const dispatch = useDispatch()
    const { entities, ids } = useSelector(state => state.descendantCommentsInfo.descendantComments)
    const filteredIds = ids.filter(id => {
        // console.log('parentId', parentId)
        // console.log('commentParentId:', entities[id].parent)
        // console.log('commentId:', id)
        // console.log(entities[id])
        return entities[id].parent === parentId
    })
    if (filteredIds.length > 0) console.log(filteredIds)

    const comments = filteredIds.map(id => entities[id])
    // console.log(comments)

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

      const openNestedCommentsHandler = (comments) => () => {
        dispatch(fetchDescendantComments(comments))
      }
    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions)
    return (
        <ListGroup.Item className="py-3">
            <div className="">
                <h5>{author}:</h5>
                <p className="">{decode(text)}</p>
                <p className="text-muted ">{formattedDate}</p>
                {kids && (
                    <>
                        <Button onClick={openNestedCommentsHandler(kids)}>Open nested comments</Button>
                        {(comments.length > 0) &&
                            <ListGroup variant="flush">

                                <ListGroup.Item>
                                    {/* {comments.map(({ by, id, text, time, kids, parent }) => <Comment key={id} id={id} author={by} text={text} time={time} kids={kids} parentId={parent} />)} */}
                                </ListGroup.Item>
                            </ListGroup>
                        }
                    </>
                )}
            </div>
        </ListGroup.Item>
        
    )
}

const CommentsBox = ({ commentsIds }) => {
    
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.commentsInfo.isLoading)
    const { entities, ids } = useSelector(state => state.commentsInfo.comments)
    const comments = ids.map(id => entities[id])


    useEffect(() => {
        dispatch(fetchComments(commentsIds))
        return () => dispatch(commentsActions.cleanComments())
    }, [])

    return (
        <>
            
            <h2 className="mb-3">Comments</h2>
            {(isLoading && commentsIds) && (
                <div className="display-block text-center">
                    <Spinner
                        as="span"
                        animation="border"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                        className='me-2 p-3'
                        variant="primary"
                    />
                </div>
            )}
            <ListGroup variant="flush" className="">
                {(commentsIds) ? (comments.map(({ by, id, text, time, kids }) => <Comment key={id} parentId={id} author={by} text={text} time={time} kids={kids} />))
                : (<p className="text-muted">No comments yet</p>)}
            </ListGroup>
        </>
    )
} 

export default CommentsBox