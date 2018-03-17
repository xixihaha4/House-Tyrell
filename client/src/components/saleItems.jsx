import React from 'react';

const SaleItems = ({ menuItems, itemClick }) => (
  <div className="saleItemGrid">
    {
      menuItems.map((item, i) =>
        (<div className={`item_${i}`}>
          <img alt="menuitem" src={item.item_image} style={{ width: '150px', height: '150px' }} onClick={() => itemClick(item)}/>
        </div>))
    }
  </div>
);

export default SaleItems;
