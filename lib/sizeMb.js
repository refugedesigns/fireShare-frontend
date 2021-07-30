

export const sizeMb = (bytes) => {
    const size = `${(+bytes / (1024 * 1024)).toFixed(2)} MB`;
    return size
}