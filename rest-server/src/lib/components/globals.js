import db from '../../config/database';
import {
  success,
  error
} from '../log';

export const globalQueryHelper = async (payload, query, name) => {
  try {
    const queryString = query(payload);
    const data = await db.queryAsync(queryString);
    success(`${name} - successfully retrived data ${JSON.stringify(data)}`);
    return data;
  } catch (err) {
    error(`${name} - error= ', err`);
    throw new Error(err);
  }
};

export const globalController = (query, name) => {
  return async (req, res) => {
    const { url, method } = req;
    let payload;
    if (method === 'POST' || method === 'PUT') {
      payload = req.body;
    } else {
      payload = req.params;
    }
    try {
      const { rows } = await query(payload, url);
      success(`${name} - sucessfully retrieved data ${JSON.stringify(rows[0])}`);
      return res.status(200).send(rows[0]);
    } catch (err) {
      error(`${name} - error= ${err}`);
      throw new Error(err);
    }
  }
};
