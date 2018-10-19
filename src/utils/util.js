export function xyChangedat(xyarr, canvas, pic) {
  const { width: dw, height: dh } = pic
  const { width: w, height: h } = canvas
  /*  var dw = c_width,
    dh = c_height,
    w = $('#curve').width(),
    h = $('#curve').height() */

  return [
    parseFloat(parseFloat((dw / w) * xyarr[0]).toFixed(3)),
    parseFloat(parseFloat((dh / h) * xyarr[1]).toFixed(3))
  ]
}

export function xyChangecan(xyarr, canvas, pic) {
  const { width: dw, height: dh } = pic
  const { width: w, height: h } = canvas
  /*  var dw = c_width,
    dh = c_height,
    w = $('#curve').width(),
    h = $('#curve').height() */
  return [
    parseFloat(parseFloat((w / dw) * xyarr[0]).toFixed(3)),
    parseFloat(parseFloat((h / dh) * xyarr[1]).toFixed(3))
  ]
}
