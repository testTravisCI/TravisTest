import db from '../../config/database';
import {
  fetchAllUserHelper
} from './userSQLHelpers';
import {
  success,
  error
} from '../../lib/log';

export const fetchAllUserQuery = async () => {
  try {
    const queryString = fetchAllUserHelper();
    const data = await db.queryAsync(queryString);
    success('fetchAllUserQuery - successfully fetched all users ', data);
    return data;
  } catch (err) {
    error('fetchAllUserQuery - error= ', err);
    throw new Error(err);
  }
};
