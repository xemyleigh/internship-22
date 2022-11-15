import { createSlice } from "@reduxjs/toolkit";
import { fetchComments } from "../fetchApi";
import { fetchDescendantComments } from "../fetchApi";


const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {
            entities: {},
            ids: []
        },
        isLoading: true,
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
                state.isLoading = false
                if (payload !== undefined) {
                    const [ entities, ids ] = payload
                    console.log(ids)
                    state.comments.entities = entities
                    state.comments.ids = ids
                }
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false
                console.log(action.error)
                if (action.error.name === 'AxiosError') throw Error('network')
            })


            .addCase(fetchDescendantComments.pending, (state) => {
                console.log('PENDING COMMENTS')
            })
            .addCase(fetchDescendantComments.fulfilled, (state, { payload }) => {
                console.log('COMMENTS DOWNLOADED')
                const [ entities, ids ] = payload
                state.comments.entities = { ...state.comments.entities, ...entities }
                const bothIds = [ ...state.comments.ids, ...ids ]
                state.comments.ids = [...new Set(bothIds)]
            })
            .addCase(fetchDescendantComments.rejected, (state, action) => {
                console.log(action.error)
            })

    }
})


export const { actions } = commentsSlice
export default commentsSlice.reducer