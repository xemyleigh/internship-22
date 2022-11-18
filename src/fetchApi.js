import axios from "axios";
import urls from "./urls";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = async (identificators, depth) => {
  const data = await Promise.all(
    identificators.map(async (id) => {
      const response = await axios.get(urls.getItemData(id));
      return response.data;
    })
  );
  const normalizedData = data.map((element) => [
    element.id,
    { ...element, depth },
  ]);
  const ids = data.map((element) => element.id);
  const result = [Object.fromEntries(normalizedData), ids];
  return result;
};

const fetchNestedCommentsData = async (identificators, parentId, depth) => {
  const data = await Promise.all(
    identificators.map(async (id) => {
      const response = await axios.get(urls.getItemData(id));
      return response.data;
    })
  );
  const normalizedData = data.map((element) => [
    element.id,
    { ...element, depth },
  ]);
  const ids = data.map((element) => element.id);
  const result = [Object.fromEntries(normalizedData), ids, parentId, depth];
  return result;
};

export const fetchNews = createAsyncThunk("fetchNews", async () => {
  const response = await axios.get(urls.getNewStories());
  const lastHundredStories = response.data.slice(0, 100);
  return fetchData(lastHundredStories);
});

export const fetchComments = createAsyncThunk("fetchComments", async (id) => {
  const { data } = await axios.get(urls.getItemData(id));
  if (!data || !data.kids) return
  return fetchData(data.kids, 0);
});

export const fetchDescendantComments = createAsyncThunk(
  "fetchDescendantComments",
  async ({ parentId, depth }) => {
    const { data } = await axios.get(urls.getItemData(parentId));
    return fetchNestedCommentsData(data.kids, parentId, depth);
  }
);

export const fetchStory = createAsyncThunk(
  'fetchStory',
  async (id) => {
    const { data } = await axios.get(urls.getItemData(id));
    return data
  }
)
