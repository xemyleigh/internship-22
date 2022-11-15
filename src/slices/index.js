import { configureStore } from '@reduxjs/toolkit';
import newsSlice from './newsSlice'
import commentsSlice from './commentsSlice';
import descendantCommentsSlice from './descendantCommentsSlice';

export default configureStore({
    reducer: {
        newsInfo: newsSlice,
        commentsInfo: commentsSlice,
        // descendantCommentsInfo: descendantCommentsSlice,
    }
})