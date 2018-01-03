import { takeEvery } from 'redux-saga/effects';

import purchasesSagas from './purchases';
import storesSaga from './stores';
import debtorsSaga from './debtors';

function* dashboardWatcherSaga() {
  yield takeEvery(purchasesSagas.getPurchases.actionType, purchasesSagas.getPurchases.handler);
  yield takeEvery(purchasesSagas.createPurchase.actionType, purchasesSagas.createPurchase.handler);

  yield takeEvery(storesSaga.fetchStores.actionType, storesSaga.fetchStores.handler);
  yield takeEvery(storesSaga.fetchStoreContent.actionType, storesSaga.fetchStoreContent.handler);
  yield takeEvery(storesSaga.createStoreOrder.actionType, storesSaga.createStoreOrder.handler);
  yield takeEvery(storesSaga.updateStoreOrder.actionType, storesSaga.updateStoreOrder.handler);
  yield takeEvery(storesSaga.submitStoreOrder.actionType, storesSaga.submitStoreOrder.handler);

  yield takeEvery(purchasesSagas.payPurchase.actionType, purchasesSagas.payPurchase.handler);
  yield takeEvery(purchasesSagas.declinePurchase.actionType, purchasesSagas.declinePurchase.handler);

  yield takeEvery(debtorsSaga.getDebtorsStatistics.actionType, debtorsSaga.getDebtorsStatistics.handler);
}

export default [
  dashboardWatcherSaga,
];
