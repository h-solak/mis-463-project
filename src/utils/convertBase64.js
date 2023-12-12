async function convertBase64(img) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);

      const base64String = canvas.toDataURL("image/png").split(",")[1];
      resolve(base64String);
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = img;
  });
}
export default convertBase64;
