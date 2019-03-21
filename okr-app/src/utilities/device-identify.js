export const isMobile = function () {
  const deviceRegx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return deviceRegx.test(navigator.userAgent)
}
