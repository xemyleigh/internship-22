import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './newsSlice'
import commentsSlice from './commentsSlice';
import storySlice from './openedStorySlice';

export default configureStore({
    reducer: {
        newsInfo: newsSlice,
        commentsInfo: commentsSlice,
        storyInfo: storySlice,
    }
})