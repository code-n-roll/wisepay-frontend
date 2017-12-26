import { takeEvery } from 'redux-saga/effects';

import { updateProfile as updateProfileAction } from 'components/forms/ProfileForm/actions';
import { addBankCard as addBankCardAction } from 'components/forms/BankCardForm/actions';
import {
  GET_USERS_REQUEST,
  GET_CURRENT_USER_PROFILE_REQUEST,
  GET_GROUPS_REQUEST,
  CREATE_GROUP_REQUEST,
  UPDATE_GROUP_REQUEST,
} from '../constants';

import {
  getUsersData,
  getCurrentUser,
  updateProfile,
  addBankCard,
} from './users';

import {
  getGroupsData,
  createGroup,
  updateGroup,
} from './groups';

function* commonWatcherSaga() {
  yield takeEvery(GET_USERS_REQUEST, getUsersData);
  yield takeEvery(GET_CURRENT_USER_PROFILE_REQUEST, getCurrentUser);
  yield takeEvery(updateProfileAction.REQUEST, updateProfile);
  yield takeEvery(addBankCardAction.REQUEST, addBankCard);
  yield takeEvery(GET_GROUPS_REQUEST, getGroupsData);
  yield takeEvery(CREATE_GROUP_REQUEST, createGroup);
  yield takeEvery(UPDATE_GROUP_REQUEST, updateGroup);
}

export default commonWatcherSaga;