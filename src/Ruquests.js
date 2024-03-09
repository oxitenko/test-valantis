import axios, { isAxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import { url, headers } from './utils';

axiosRetry(axios, {
  retries: 5,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: isAxiosError,
});

export const filter = async (field, name) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'filter',
        params: { [field]: name },
      },
      {
        headers,
      },
    );
    return res;
  } catch (error) {
    console.log(`Произошла ошибка:${error}`);
  }
};

export const fetchCards = async (ids) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'get_items',
        params: { ids },
      },
      {
        headers,
      },
    );
    return res;
  } catch (error) {
    console.log(`Произошла ошибка:${error}`);
  }
};

export const fetchFields = async (name) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'get_fields',
        params: { field: name },
      },
      {
        headers,
      },
    );
    return res;
  } catch (error) {
    console.log(`Произошла ошибка:${error}`);
  }
};

export const fetchIDs = async (offset, limit) => {
  try {
    const res = await axios.post(
      url,
      {
        action: 'get_ids',
        params: { offset, limit },
      },
      {
        headers,
      },
    );
    return res;
  } catch (error) {
    console.log(`Произошла ошибка:${error}`);
  }
};
