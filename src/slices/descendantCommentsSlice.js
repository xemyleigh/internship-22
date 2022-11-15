import { createSlice } from "@reduxjs/toolkit";
import { fetchDescendantComments } from '../fetchApi'




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
            state.descendantComments.entities = {}
            state.descendantComments.ids = []
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