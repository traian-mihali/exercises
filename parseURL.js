let url = "http://www.exercises.com/search?sortBy=newest";

function parseURL(url) {
  let obj = {};
  obj.protocol = url.match(/https?:\/\//)[0];
  url = url.replace(obj.protocol, "");

  obj.host = url.match(/^.+\//)[0];
  url = url.replace(obj.host, "");

  obj.path = url.match(/.[^?]+/)[0];
  url = url.replace(obj.path, "");
  obj.queryString = url.match(/[^?].+/)[0];

  return obj;
}

parseURL(url);
