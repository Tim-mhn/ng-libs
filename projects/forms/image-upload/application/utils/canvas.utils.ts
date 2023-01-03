/* eslint-disable no-param-reassign */
function setCanvasSide(canvas: HTMLCanvasElement, sideSize: number) {
  canvas.height = sideSize;
  canvas.width = sideSize;
}

function fillCanvasWithWhiteWhite(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
}

function drawImageInCenterOfCanvas(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext('2d');

  const left = (canvas.width - img.width) / 2;
  const top = (canvas.height - img.height) / 2;
  ctx.drawImage(img, left, top);
}

export { setCanvasSide, fillCanvasWithWhiteWhite, drawImageInCenterOfCanvas };
