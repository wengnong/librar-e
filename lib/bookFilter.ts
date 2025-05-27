export const getLatestTrending = (books: Book[], count = 6) =>
    [...books].sort((a, b) => b.year - a.year).slice(0, count);

export const getReadersChoice = (books: Book[], count = 6) =>
    [...books].sort((a, b) => b.rating - a.rating).slice(0, count);
