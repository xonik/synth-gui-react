function floatPrecision(floatValue: number, precision: number): string {
    const power = Math.pow(10, precision)
    return '' + (Math.round(floatValue * power) / power).toFixed(precision)
}

function fileSize(size: number) {
  if (size > 1024) {
    const kbSize = size / 1024
    if (kbSize > 1024) {
      const mbSize = kbSize / 1024
      return `${floatPrecision(mbSize, 2)} MB`
    }
    return `${Math.round(kbSize)} kB`
  }
  return `${size} B`
}

export { fileSize }
