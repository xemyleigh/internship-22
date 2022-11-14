import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../urls";


export const fetchComments = createAsyncThunk(
    'fetchComments',
    async (commentsIds) => {
        const data = await Promise.all(commentsIds.map( async id => {
            const response = await axios.get(urls.getItemData(id))
            return response.data
        }))
        console.log(data)
        const normalizedComments = data.map(comment => [ comment.id, comment ] )
        const ids = data.map(comment => comment.id)
        return [ Object.fromEntries(normalizedComments), ids ]        
    }
)


const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {
            entities: {},
            ids: []
        },
        isLoading: true
    },
    reducers: {
        cleanComments(state, action) {
            state.comments.entities = {}
            state.comments.ids = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                console.log('PENDING COMMENTS')
                state.isLoading = true
            })
            .addCase(fetchComments.fulfilled, (state, { payload }) => {
                console.log('COMMENTS DOWNLOADED')
                const [ entities, ids ] = payload
                console.log(ids)
                state.comments.entities = { ...state.comments.entities, ...entities }
                state.comments.ids = [ ...state.comments.ids, ...ids ]
                state.isLoading = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false
                console.log(action.error)
            })
    }
})


export const { actions } = commentsSlice
export default commentsSlice.reducer