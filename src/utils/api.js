import axios from 'axios';

const BASEURL = `http://35.154.161.226:80/`;

const makeAPIUrl = (url) => `${BASEURL}${url}`;

const helpers = {};
const methods = ['get', 'post', 'put', 'destroy', 'patch'];

//Send param named external, if current BASEURL is not needed or some external API needs to be called.

methods.forEach((method) => {
  const fn = (url, options = {}) => {
    const { external, ...rest } = options;

    const playerID = localStorage.getItem('playerID');
    const headers = {
      'PLAYER-ID': playerID 
    }

    const formData = new FormData();
    for (const key in rest) {
      formData.append(key, rest[key]);
    }
  
    const verb = method === 'destroy' ? 'delete' : method;

    if(!!Object.keys(rest).length) {
      return axios[verb](makeAPIUrl(url), formData, !!playerID && { headers })
      .then(response => response);
    }

    return axios[verb](makeAPIUrl(url), !!playerID && { headers })
      .then(response => response);
  };

  helpers[method] = fn;
});

const {
  get,
  post,
  put,
  destroy, //delete is giving some error right now. have to fix this.
  patch,
} = helpers;

export { get, post, put, destroy, patch };
