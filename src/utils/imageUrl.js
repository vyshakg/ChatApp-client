const imageURL = data => {
  const arrayBufferView = new Uint8Array(data);
  const blob = new Blob([arrayBufferView], { type: "image/jpg" });
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
};
export default imageURL;
