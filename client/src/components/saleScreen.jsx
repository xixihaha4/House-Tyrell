import React from 'react';
import SaleItems from './saleItems.jsx';

const SaleScreen = () =>
  (
    <div className="saleScreenGrid">
      <div><SaleItems /></div>
      <div className="saleTransactionGrid">Transactions</div>
      <div className="saleCategoryGrid">Categories</div>
      <div className="saleControlGrid">Grid</div>
    </div>
  );

export default SaleScreen;
