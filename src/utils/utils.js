export const getThumbUrl = (thumbnails) => {
    return thumbnails?.standard?.url || thumbnails?.high?.url || thumbnails?.default?.url || './logo512.png'
}