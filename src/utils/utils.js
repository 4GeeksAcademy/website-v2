import { navigate } from "gatsby";

const isWindow = () => (window !== undefined ? true : false);

export const smartRedirecting = (e, path) => {
  e.preventDefault();
  const linkRegex = new RegExp("(http)");

  if (isWindow()) {
    console.log("REDIRECTING");
    if (linkRegex.test(path)) {
      // window.open(path, '_blank').focus();
      window.open(path, "_blank").opener = null;
      return;
    }
    navigate(path);
  }
};

export const parseQueryString = (queryString) => {
  var query = {};
  var pairs = (
    queryString[0] === "?" ? queryString.substr(1) : queryString
  ).split("&");
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};
