import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import urls from '../urls'
import axios from 'axios'

export const fetchNews = createAsyncThunk(
    'fetchNews',
    async () => {
        const response = await axios.get(urls.getNewStories())
        const lastHundredStories = response.data.slice(0, 100)
        const data = await Promise.all(lastHundredStories.map(async storyId => {
            const response = await axios.get(urls.getItemData(storyId))
            return response.data
        }))
        const formattedData = data.map(d => [ d.id, d ])
        const ids = data.map(d => d.id)
        return [ Object.fromEntries(formattedData), ids ]
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState: { news: {
        entities: {},
        ids: []
    }, isLoading: true },
    reducers: {
        setLoadingButtonStatus(state, { payload }) {
            console.log(payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchNews.fulfilled, (state, { payload }) => {
                const [ entities, ids ] = payload
                console.log(payload)
                state.news.entities = entities
                state.news.ids = ids
                state.isLoading = false
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false
                console.log(action.error)
            })
    }
})

export const { actions } = newsSlice
export default newsSlice.reducer

