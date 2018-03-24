import React from 'react';
import SaleItems from './saleItems.jsx';
import SaleCategory from './saleCategory.jsx';
import Transaction from './transaction.jsx';
import SaleControl from './saleControl.jsx';
import Navbar from './navbar.jsx';
import ItemModal from './itemModal.jsx';
import Select from 'react-select';
import CategoryModal from './categoryModal.jsx';
import ConfirmationModal from './confirmationModal.jsx';
import DiscardModal from './discardModal.jsx';

const SaleScreen = ({ menuItems, itemClick, menuCategories, transactionItems, total, tax, discount, discountOptions, updateDiscount, transactionRemove, filterByCategory, removeIng, transactionComplete, transactionClear, getMenuItems, getCategories, openModal, closeModal, handleNewItem, handleNewCategory, saveChanges, discardChanges, categories, ingredients }) =>
  (
    <div>
      <div className="saleScreenGridManager animated fadeIn">
        <ItemModal
          openModal={openModal}
          closeModal={closeModal}
          getMenuItems={getMenuItems}
          handleNewItem={handleNewItem}
          ingredients={ingredients}
          categories={categories}
        />
        <CategoryModal
          getCategories={getCategories}
          openModal={openModal}
          closeModal={closeModal}
          handleNewCategory={handleNewCategory}
        />

        <ConfirmationModal
          openModal={openModal}
          closeModal={closeModal}
          saveChanges={saveChanges}
        />

        <DiscardModal
          openModal={openModal}
          closeModal={closeModal}
          discardChanges={discardChanges}
        />

        <SaleItems
            menuItems={menuItems}
            itemClick={itemClick}
            openModal={openModal}
            closeModal={closeModal}
        />
        <div className="saleTransactionGrid">
          <Transaction
            removeIng={removeIng}
            transactionRemove={transactionRemove}
            transactionItems={transactionItems}
            total={total}
            tax={tax}
            discount={discount}
            transactionComplete={transactionComplete}
            transactionItems={transactionItems}
            openModal={openModal}
            transactionClear={transactionClear}
          />
        </div>
        <div className="saleCategoryGrid">
          <SaleCategory
            menuCategories={menuCategories}
            openModal={openModal}
            filterByCategory={filterByCategory} />
        </div>
      </div>
    </div>
  );

export default SaleScreen;
