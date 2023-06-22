export function addPathPrefixToImgSrc(jsonData, prefix) {
    return jsonData.map(item => {
        item.imgSrc = "../" + prefix + item.imgSrc.substring(3);
        return item;
    });
}
