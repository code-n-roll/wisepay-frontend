import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import FaWrench from 'react-icons/lib/fa/wrench';
import DropdownMenu from 'react-dd-menu';

import './styles.css';

class GroupItem extends Component {
  constructor(props) {
    super(props);

    this.renderToggler = this.renderToggler.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu(e) {
    if (e) {
      e.stopPropagation();
    }

    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  renderToggler() {
    return (
      null
    );
  }

  render() {
    const { props } = this;
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: () => this.toggleMenu(),
      align: 'right',
    };

    return (
      <div
        className="group-item"
        onClick={() => props.onClick && props.onClick(props)}
        style={props.onClick ? { cursor: 'pointer' } : { cursor: 'auto' }}
      >
        <div style={{ float: 'left' }}>
          <Avatar name={props.name} round size={50} />
        </div>
        <div className="group-item_info" >
          <span className="group-item_info__name">{props.name}</span>
          <div className="group-item-avatars">
            {props.users.slice(0, 5).map((user) => (
              user.avatarUrl ?
                <img src={user.avatarUrl} role="presentation" style={{ marginRight: 3 }} /> :
                <Avatar name={user.username} round size={20} style={{ marginRight: 3 }} />
            ))}
            {props.users.length > 5 && <span className="group-item-avatars-dots">...</span>}
          </div>
        </div>
        {props.withMenu && props.isOwner && (
          <div className="group-item-menu-toggler" onClick={this.toggleMenu}>
            <FaWrench />
          </div>
        )}
        {props.withMenu && props.isOwner && (
          <div className="group-item-menu">
            <DropdownMenu {...menuOptions}>
              <li className="group-item-menu-item" onClick={(e) => { e.stopPropagation(); props.onEditClick(); }}>
                Edit
              </li>
              <li className="group-item-menu-item">
                Remove
              </li>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  }
}

GroupItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
  users: PropTypes.array,
  withMenu: PropTypes.bool,
  onEditClick: PropTypes.func,
};

export default GroupItem;