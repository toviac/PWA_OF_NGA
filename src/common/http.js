import axios from 'axios';

const formatUrl = (arg) => {
  const url = arg.toString();
  if (/\/api\//.test(url.substring(0, 5))) return url;
  return `/api/${url.charAt(0) === '/' ? '' : url.charAt(0)}${url.substring(1)}`;
};

export default {
  async get(url, param) {
    try {
      const response = await axios.get(url, { params: param });
      return response.data;
    } catch (e) {
      throw (new Error(e));
    }
  },
  async post(url, param) {
    try {
      const response = await axios.post(url, param);
      return response.data;
    } catch (e) {
      throw (new Error(e));
    }
  },
  async put(url, param) {
    try {
      const response = await axios.put(url, param);
      return response.data;
    } catch (e) {
      throw (new Error(e));
    }
  },
  async delete(url, param) {
    try {
      const response = await axios.delete(url, { data: param });
      return response.data;
    } catch (e) {
      throw (new Error(e));
    }
  },
};
