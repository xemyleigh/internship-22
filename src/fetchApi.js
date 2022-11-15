import axios from "axios"
import urls from "./urls"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const fetchData = async (identificators) => {
        const data = await Promise.all(identificators.map( async id => {
            const response = await axios.get(urls.getItemData(id))
            return response.data
        }))
        const normalizedData = data.map(element => [ element.id, element ])
        const ids = data.map(element => element.id)
        const result = [ Object.fromEntries(normalizedData), ids ]
        return result    
}

export const fetchNews = createAsyncThunk(
    'fetchNews',
    async () => {
        const response = await axios.get(urls.getNewStories())
        const lastHundredStories = response.data.slice(0, 100)
        return fetchData(lastHundredStories)
    }
)

export const fetchComments = createAsyncThunk(
    'fetchComments',
    async (id) => {
            const { data } = await axios.get(urls.getItemData(id))
            return fetchData(data.kids)    
    }
)

export const fetchDescendantComments = createAsyncThunk(
    'fetchDescendantComments',
    async (id) => {
        const { data } = await axios.get(urls.getItemData(id))
        return fetchData(data.kids)    
}
)