const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
};

export default (time, optoins = defaultOptions) => {
    const date = new Date(time * 1000)
    return date.toLocaleDateString('en-US', optoins)
}