export function lockBodyScroll() {
  const scrollY = window.scrollY;
  const prevBodyPosition = document.body.style.position;
  const prevBodyTop = document.body.style.top;
  const prevBodyLeft = document.body.style.left;
  const prevBodyRight = document.body.style.right;
  const prevBodyWidth = document.body.style.width;
  const prevPaddingRight = document.body.style.paddingRight;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    document.body.style.position = prevBodyPosition;
    document.body.style.top = prevBodyTop;
    document.body.style.left = prevBodyLeft;
    document.body.style.right = prevBodyRight;
    document.body.style.width = prevBodyWidth;
    document.body.style.paddingRight = prevPaddingRight;
    window.scrollTo(0, scrollY);
  };
}

