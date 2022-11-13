import axios from 'axios'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Badge, Spinner } from 'react-bootstrap'

import { actions as newsActions, fetchNews } from "../slices/newsSlice";

const Story = ({ author, score, comments, time, title, url }) => {
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
        <Card className='mb-3 shadow'>
            <Card.Header className='d-flex justify-content-start gap-1'>
                Author: <b>{author}</b>
                <p className='text-muted m-0 ms-auto'>Rating <Badge bg="primary">{score}</Badge></p>
            </Card.Header>
            <Card.Body>
                <Card.Title><a href={url}>{title}</a></Card.Title>
                <Button className='mb-3 mt-2'variant="primary" href={url}>Visit topic</Button>
                <p>{formattedDate}</p>
            </Card.Body>
        </Card>

    )
}

const MainPage = () => {
    const dispatch = useDispatch()
    const news = useSelector(state => state.newsInfo.news)
    const isLoading = useSelector(state => state.newsInfo.isLoading)
    console.log(isLoading)
    console.log('dispatching')
    const [ updateTimer, setUpdateTimer ] = useState(0)
    const [ isButtonLoading, setButtonLoadingStatus ] = useState(false)

    setTimeout(function run() {
        setUpdateTimer(updateTimer + 1)
        setTimeout(run, 60000);
    }, 60000);    

    useEffect(() => {
        console.log('324324234234')
        dispatch(fetchNews())
        // setFirstDownloadStatus('done')

    }, [updateTimer])

    const updateButtonHandler = () => {
        dispatch(fetchNews())
    }
    

    return (
        <>
            <div className='text-center mb-5'>
                <h1 className='mb-4'>Hacker News Interface</h1>
                <Button variant='primary text-white' className='p-2 px-3' disabled={isLoading} onClick={updateButtonHandler}>
                    {(isLoading) ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className='me-2'
                        />
                    ) : null}
                    Refresh news
                    </Button>
            </div>
            
            <ul>
                {news.map(({ id, by, score, kids, time, title, url }) => <Story key={id} author={by} score={score} comments={kids} time={time} title={title} url={url} />)}
            </ul>
        </>
    )
}

export default MainPage
