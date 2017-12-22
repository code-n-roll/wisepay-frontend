import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _ from 'lodash';

import { getPurchasesRequest } from 'pages/DashboardPage/actions';
import {
  makeSelectPurchasesList,
  makeSelectCurrentPurchase,
  makeSelectPendingPurchase,
} from 'pages/DashboardPage/selectors';
import PurchaseItem from 'components/Purchases/PurchaseItem';
import ListFilter from 'components/ListFilter';
import PlusButton from 'components/PlusButton';

class PurchasesList extends Component {
  constructor(props) {
    super(props);
    this.renderPurchasesList = this.renderPurchasesList.bind(this);
    this.getPurchasesList = this.getPurchasesList.bind(this);
  }

  componentWillMount() {
    this.props.getPurchasesRequest();
  }

  getPurchasesList() {
    const { pendingPurchase, purchasesList } = this.props;
    console.log(pendingPurchase);
    if (pendingPurchase) {
      return [pendingPurchase, ...purchasesList];
    }

    return purchasesList;
  }

  renderPurchasesList(props) {
    return (
      props.items.map((purchase) => (
        <Link to={`?purchase=${purchase.id}`} key={purchase.id}>
          <PurchaseItem
            {...purchase}
            active={_.get(props.currentPurchase, 'id') === purchase.id || purchase.isPending}
          />
        </Link>
      ))
    );
  }

  render() {
    const { currentPurchase, onPlusClick } = this.props;

    return (
      <div className="fill-parent purchases-list">
        <ListFilter
          renderList={this.renderPurchasesList}
          items={this.getPurchasesList()}
          filterProp="name"
          itemsPropName="items"
          inputPlaceholder="Enter purchase name"
          listProps={{
            currentPurchase,
          }}
        />
        <div className="go-to-create-purchase-btn">
          <PlusButton onClick={onPlusClick} />
        </div>
      </div>
    );
  }
}

PurchasesList.propTypes = {
  purchasesList: PropTypes.array,
  getPurchasesRequest: PropTypes.func,
  onPlusClick: PropTypes.func,
  currentPurchase: PropTypes.object,
  pendingPurchase: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  purchasesList: makeSelectPurchasesList(),
  currentPurchase: makeSelectCurrentPurchase(),
  pendingPurchase: makeSelectPendingPurchase(),
});

const mapDispatchToProps = {
  getPurchasesRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesList);
