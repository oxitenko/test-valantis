import moment from 'moment';
import md5 from 'md5';

export const today = moment(new Date()).format('YYYYMMDD');
export const url = 'https://api.valantis.store:41000/';
export const key = md5(`${process.env.REACT_APP_API_PASSWORD}_${today}`);
export const headers = { 'X-Auth': key };
export const brand = 'brand';
export const price = 'price';
export const product = 'product';
export const unknow = 'Неизвестный бренд';
