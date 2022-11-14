import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import urls from "../urls";


export const fetchDescendantComments = createAsyncThunk(
    'fetchDescendantComments',
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

const descendantCommentsSlice = createSlice({
    name: 'descendantComments',
    initialState: {
        descendantComments: {
            entities: {},
            ids: []
        },
        isLoading: true
    },
    reducers: {
        cleanComments(state, action) {
            state.comments = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDescendantComments.pending, (state) => {
                console.log('PENDING COMMENTS')
                state.isLoading = true
            })
            .addCase(fetchDescendantComments.fulfilled, (state, { payload }) => {
                console.log('COMMENTS DOWNLOADED')
                const [ entities, ids ] = payload
                console.log(ids)
                state.descendantComments.entities = { ...state.descendantComments.entities, ...entities }
                state.descendantComments.ids = [ ...state.descendantComments.ids, ...ids ]
                state.isLoading = false
            })
            .addCase(fetchDescendantComments.rejected, (state, action) => {
                state.isLoading = false
                console.log(action.error)
            })
    }
})


export const { actions } = descendantCommentsSlice
export default descendantCommentsSlice.reducer