import { createSlice } from '@reduxjs/toolkit'
import { fetchNews } from '../fetchApi'


const newsSlice = createSlice({
    name: 'news',
    initialState: { 
        news: {
            entities: {},
            ids: []
        },
        isLoading: true,
 },
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
                console.log(payload)
                const [ entities, ids ] = payload
                console.log(payload)
                state.news.entities = entities
                state.news.ids = ids
                state.isLoading = false
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})

export const { actions } = newsSlice
export default newsSlice.reducer

