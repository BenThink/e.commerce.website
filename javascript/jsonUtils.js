export function addPathPrefixToImgSrc(jsonData, prefix) {
    return jsonData.map(item => {
        item.imgSrc = item.imgSrc.replace(/^\.\.\//, prefix);
        return item;
    });
}
