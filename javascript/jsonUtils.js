export function addPathPrefixtoImgScr(jsonData, prefix) {
    return jsonData.map(item => {
        item.imgSrc = prefix + item.imgSrc;
        return item;
    });
}
