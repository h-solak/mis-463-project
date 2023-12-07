function convertToBase64() {
  // Replace 'path/to/your/image.jpg' with the path to your image
  const imageUrl = "path/to/your/image.jpg";

  // Create an Image element
  const img = new Image();

  // Set up the onload event handler
  img.onload = function () {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions to the image dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0);

    // Get the base64 data from the canvas
    const base64Data = canvas.toDataURL("image/jpeg");
  };

  // Set the source of the Image element to your image URL
}

export { convertToBase64 };
