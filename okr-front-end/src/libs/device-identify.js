export const isMobile = function () {

  const deviceRegx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

  if (deviceRegx.test(navigator.userAgent)) {
    window.location = ' http://test.okr.onlyou.com/m/Login'
  }
}
