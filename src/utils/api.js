import axios from 'axios';

// const BASEURL = `http://35.154.161.226:80/`;

// const BASEURL = `http://d90c6a4c.ngrok.io/`;

// const BASEURL = `http://b91dd6f2.ngrok.io/`

// const BASEURL = 'http://192.168.1.112:9005/';

const BASEURL = 'http://999ed418.ngrok.io/';

const makeAPIUrl = (url) => `${BASEURL}${url}`;

const helpers = {};
const methods = ['get', 'post', 'put', 'destroy', 'patch'];

//Send param named external, if current BASEURL is not needed or some external API needs to be called.

methods.forEach((method) => {
  const fn = (url, options = {}) => {
    // const { external, ...rest } = options;

    const playerID = localStorage.getItem('playerID');
    const playerToken = localStorage.getItem('playerToken');
    const headers = {};

    if (playerID) headers['PLAYER-ID'] = playerID;
    if (playerToken) headers['PLAYER-TOKEN'] = playerToken;

    const verb = method === 'destroy' ? 'delete' : method;

    if (verb === 'get') {
      let formData = {
        params: options,
        headers,
      };
      if (Object.keys(headers).length) {
        formData = { ...formData, headers };
      }
      return axios[verb](makeAPIUrl(url), formData)
        .then(response => response);
    }
    if (verb === 'put') {
      var query = "";
      for (const key in options) {
        if (query !== "") {
          query += "&";
        }
        query += key + "=" + encodeURIComponent(options[key]);
      }
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", makeAPIUrl(url));
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        if (playerID) xhr.setRequestHeader("PLAYER-ID", playerID);
        if (playerToken) xhr.setRequestHeader("PLAYER-TOKEN", playerToken);
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.statusText);
          }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(query);
      });
    }
    else {
      const { fileData, ...rest } = options;
      let formData;
      if (fileData) {
        formData = rest.data;
      } else {
        formData = new FormData();
        for (const key in options) {
          formData.append(key, options[key]);
        }
      }
      return axios[verb](makeAPIUrl(url), formData, !!playerID && { headers })
        .then(response => response);
    }
  };

  helpers[method] = fn;
});

const {
  get,
  post,
  put,
  destroy, //delete is a reserved word in JS. Hence, using destroy.
  patch,
} = helpers;

export { get, post, put, destroy, patch };
