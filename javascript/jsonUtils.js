export function addPathPrefixToImgSrc(jsonData, prefix) {
    return jsonData.map(item => {
        item.image = "../" + prefix + item.image.substring(3);
        return item;
    });
}

export function addPathPrefix(jsonData, prefix){
    return jsonData.map(item => {
        item.image = "../" + prefix + item.image.substring(3);
        item.link = "../" + prefix + item.link.substring(3);
        return item;
    });
}
