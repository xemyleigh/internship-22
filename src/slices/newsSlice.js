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
        setLoading(state, { payload }) {
            state.isLoading = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchNews.fulfilled, (state, { payload }) => {
                const [ entities, ids ] = payload
                state.news.entities = entities
                state.news.ids = ids
                state.isLoading = false
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false
                if (action.error.name === "AxiosError") {
                    throw Error("network")
                  } else {
                    throw Error('Unknown error')
                  }
            })
    }
})

export const { actions } = newsSlice
export default newsSlice.reducer

