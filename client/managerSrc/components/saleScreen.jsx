import React from 'react';
import SaleItems from './saleItems.jsx';
import SaleCategory from './saleCategory.jsx';
import Transaction from './transaction.jsx';
import SaleControl from './saleControl.jsx';
import Navbar from './navbar.jsx';
import ItemModal from './itemModal.jsx';
import Select from 'react-select';
import CategoryModal from './categoryModal.jsx'

const SaleScreen = ({ menuItems, itemClick, menuCategories, transactionItems, total, tax, discount, openDiscountModal, closeDiscountModal, discountOptions, updateDiscount, transactionRemove, filterByCategory, removeIng, transactionComplete, closeItemModal, openItemModal, transactionClear, openCategoryModal, closeCategoryModal, getMenuItems, getCategories }) =>
  (
    <div>
      <div className="saleScreenGridManager animated fadeIn">
        <ItemModal
          openItemModal={openItemModal}
          closeItemModal={closeItemModal}
          getMenuItems={getMenuItems}
        />
        <CategoryModal
          openCategoryModal={openCategoryModal}
          closeCategoryModal={closeCategoryModal}
          getCategories={getCategories}
        />


        <SaleItems
            menuItems={menuItems}
            itemClick={itemClick}
            openItemModal={openItemModal}
            closeItemModal={closeItemModal}
        />
        <div className="saleTransactionGrid">
          <Transaction
            removeIng={removeIng}
            transactionRemove={transactionRemove}
            transactionItems={transactionItems}
            total={total}
            tax={tax}
            discount={discount}
            openDiscountModal={openDiscountModal}
            transactionComplete={transactionComplete}
            transactionItems={transactionItems}
            openItemModal={openItemModal}
            closeItemModal={closeItemModal}
            transactionClear={transactionClear}
          />
        </div>
        <div className="saleCategoryGrid">
          <SaleCategory
            menuCategories={menuCategories}
            openCategoryModal={openCategoryModal}
            filterByCategory={filterByCategory} />
        </div>
      </div>
    </div>
  );

export default SaleScreen;
