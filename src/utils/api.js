import axios from 'axios';

const BASEURL = `http://192.168.0.105:9005/`;

const makeAPIUrl = (url) => `${BASEURL}${url}`;

const helpers = {};
const methods = ['get', 'post', 'put', 'destroy', 'patch'];

//Send param named external is current BASEURL is not needed or some external API needs to be called.

methods.forEach((method) => {
  const fn = (url, options = {}) => {
    const { external, ...rest } = options;
    const verb = method === 'destroy' ? 'delete' : method;
    const request = axios[verb](options.external ? url : makeAPIUrl(url), rest);
    return request;
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
