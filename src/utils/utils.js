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

export const joinQS = (obj) => {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  return str.join("&");
};

export const transferQuerystrings = (url, utmSession) => {
  const index = url.indexOf("?");
  let params = {}
  let origin = url;
  if (index !== -1) {
    origin = url.slice(0, index);
    const queryStryng = url.slice(index + 1);
    params = parseQueryString(queryStryng)
  }
  return `${origin}?${joinQS({ ...params, ...utmSession })}`;
};
