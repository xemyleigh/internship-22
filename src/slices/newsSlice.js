import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urls from '../urls'
import axios from 'axios'

export const fetchNews = createAsyncThunk(
    'fetchNews',
    async () => {
        console.log('dfdsfsdf')
        const response = await axios.get(urls.getNewStories())
        console.log(response)
        const lastHundredStories = response.data.slice(0, 100)
        const data = await Promise.all(lastHundredStories.map(async storyId => {
            const response = await axios.get(urls.getStoryData(storyId))
            return response.data
        }))
        
        return data
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState: { news: [], isLoading: true },
    reducers: {
        setLoadingButtonStatus(state, { payload }) {
            console.log(payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state, action) => {
                console.log(action)
                console.log('PENDINGGGGGGGG')
                state.isLoading = true
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                const { payload } = action
                console.log(action)
                console.log(payload)
                console.log('DOWNLOADEDDDDDDDDDDDDDDDD')
                state.news = payload
                state.isLoading = false
            })
            .addCase(fetchNews.rejected, (state, action) => {
                console.log('ERRORRRRRRR')
                console.log(action.error)
                state.isLoading = false

            })
    }
})

export const { actions } = newsSlice
export default newsSlice.reducer

