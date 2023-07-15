//using axios for http requests

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "c0ec48ce189f4f45e9a01a40b1212651";

export const fetchDataFromApi = async (url, params) => {
  try {
    //since we only need 'data' property from api call we can destructure it here itself
    const { data } = await axios.get(`${BASE_URL}${url}?api_key=${API_KEY}`, {
      params,
    });
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const fetchSearchQueryDataFromApi = async (
  url,
  query,
  pageNum,
  params
) => {
  try {
    //since we only need 'data' property from api call we can destructure it here itself
    const { data } = await axios.get(
      `${BASE_URL}${url}?api_key=${API_KEY}&query=${query}&page=${pageNum}`,
      {
        params,
      }
    );
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
