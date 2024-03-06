import moment from 'moment';
import md5 from 'md5';

export const today = moment(new Date()).format('YYYYMMDD');
export const url = 'https://api.valantis.store:41000/';
export const key = md5(`${process.env.REACT_APP_API_PASSWORD}_${today}`);
export const headers = { 'X-Auth': key };
