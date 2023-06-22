export function addPathPrefixToImgSrc(jsonData, prefix) {
    return jsonData.forEach(item => {
        item.imgSrc = prefix + item.imgSrc;
        
    });
}
