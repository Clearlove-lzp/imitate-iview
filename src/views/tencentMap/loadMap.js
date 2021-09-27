export default function loadqqMap(ak) {
  return new Promise((resolve, reject) => {
    if (typeof qq !== "undefined") {
      // eslint-disable-next-line no-undef
      resolve(qq);
      return true;
    }
    window.onqqCallback = () => {
      // eslint-disable-next-line no-undef
      resolve(qq);
    };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://map.qq.com/api/js?v=2.exp&key=${ak}&callback=onqqCallback`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
