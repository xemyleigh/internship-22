export default {
    getNewStories: () => 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
    getItemData: (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`,
}