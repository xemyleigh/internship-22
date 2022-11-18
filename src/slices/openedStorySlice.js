import { createSlice } from '@reduxjs/toolkit'
import { fetchStory } from '../fetchApi'

const openedStorySlice = createSlice({
    name: 'openedStory',
    initialState: { 
        story: {},
 },
    reducers: {
        setOpenedStory(state, { payload }) {
            state.story = payload
        },
        cleanOpenedStory(state) {
            state.story = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStory.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.story = payload   
                }
            })
            .addCase(fetchStory.rejected, (state, action) => {
                if (action.error.name === "AxiosError") {
                    throw Error("network")
                  } else {
                    throw Error('Unknown error')
                  }
            })
    }
})

export const { actions } = openedStorySlice
export default openedStorySlice.reducer

