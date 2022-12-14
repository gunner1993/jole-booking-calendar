const useMobileView = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (userAgent.includes("Mobile")) {
    return true;
  } else {
    return false;
  }
};

export default useMobileView;
