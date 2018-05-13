import React, { Component } from 'react';
import {
  MasterDetailsView,
  MasterDetailsViewItem,
  MasterDetailsViewItemMaster,
  MasterDetailsViewItemDetails,
  Text
} from 'react-desktop/windows';

export default class extends Component {
  static defaultProps = {
    color: '#cc7f29',
    theme: 'light'
  };

  render() {
    return (
      <div>asd</div>
    );
  }

  renderItem(master, details) {
    return (
      <MasterDetailsViewItem>
        <MasterDetailsViewItemMaster push>
          {master}
        </MasterDetailsViewItemMaster>
        <MasterDetailsViewItemDetails background>
          <Text padding="20px" color="white">{details}</Text>
        </MasterDetailsViewItemDetails>
      </MasterDetailsViewItem>
    );
  }
}