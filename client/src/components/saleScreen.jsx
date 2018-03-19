import React from 'react';
import SaleItems from './saleItems.jsx';
import SaleCategory from './saleCategory.jsx';

const SaleScreen = ({ menuItems, itemClick, menuCategories, filterByCategory }) =>
  (
    <div className="saleScreenGrid">
      <div><SaleItems menuItems={menuItems} itemClick={itemClick} /></div>
      <div className="saleTransactionGrid">Transactions</div>
      <div><SaleCategory menuCategories={menuCategories} filterByCategory={filterByCategory} /></div>
      <div className="saleControlGrid">Grid</div>
    </div>
  );

export default SaleScreen;
