import React from 'react';
import SaleItems from './saleItems.jsx';
import SaleCategory from './saleCategory.jsx';
import Transaction from './transaction.jsx';
import SaleControl from './saleControl.jsx';

const SaleScreen = ({menuItems, itemClick, menuCategories, transactionItems, total, tax, transactionRemove}) =>
  (
    <div className="saleScreenGrid">
      <div><SaleItems menuItems={menuItems} itemClick={itemClick} /></div>
      <div className="saleTransactionGrid">
        <Transaction
          transactionRemove={transactionRemove}
          transactionItems={transactionItems}
          total={total}
          tax={tax}
        />
      </div>
      <div><SaleCategory menuCategories={menuCategories} /></div>
      <div className="saleControlGrid">
        <SaleControl total={total} tax={tax} />
      </div>
    </div>
  );

export default SaleScreen;
