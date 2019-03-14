import axios from 'axios';

// const formatUrl = (arg) => {
//   const url = arg.toString();
//   if (/\/api\//.test(url.substring(0, 5))) return url;
//   return `/api/${url.charAt(0) === '/' ? '' : url.charAt(0)}${url.substring(1)}`;
// };

const responseHandle = response => new Promise((resolve, reject) => {
  const { data } = response;
  if (response.status === 200) {
    resolve(data);
  } else {
    reject(data);
  }
});

export default {
  async get(url, param) {
    try {
      const response = await axios.get(url, { params: param });
      return responseHandle(response);
    } catch (e) {
      throw (new Error(e));
    }
  },
  async post(url, param) {
    try {
      const response = await axios.post(url, param);
      return responseHandle(response);
    } catch (e) {
      throw (new Error(e));
    }
  },
  async put(url, param) {
    try {
      const response = await axios.put(url, param);
      return responseHandle(response);
    } catch (e) {
      throw (new Error(e));
    }
  },
  async delete(url, param) {
    try {
      const response = await axios.delete(url, { data: param });
      return responseHandle(response);
    } catch (e) {
      throw (new Error(e));
    }
  },
};
