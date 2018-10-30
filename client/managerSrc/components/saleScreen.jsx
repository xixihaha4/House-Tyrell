import React from 'react';
import SaleItems from './SaleItems.jsx';
import SaleCategory from './SaleCategory.jsx';
import Transaction from './Transaction.jsx';
import SaleControl from './SaleControl.jsx';
// import Navbar from './Navbar.jsx';
import ItemModal from './ItemModal.jsx';
import Select from 'react-select';
import CategoryModal from './categoryModal.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import DiscardModal from './DiscardModal.jsx';
import RemoveItemModal from './RemoveItemModal.jsx';
import RemoveCategoryConfirm from './RemoveCategoryConfirm.jsx'

const SaleScreen = ({ menuItems, itemClick, menuCategories, transactionItems, total, tax, discount, discountOptions, updateDiscount, transactionRemove, filterByCategory, removeIng, transactionComplete, transactionClear, getMenuItems, getCategories, openModal, closeModal, handleNewItem, handleNewCategory, saveChanges, discardChanges, categories, ingredients, catOptions, removeItem, handleRemoveConfirm, removeCategoryConfirm, confirmCategoryConfirm }) =>
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
          catOptions={catOptions}
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

        <RemoveItemModal
          openModal={openModal}
          closeModal={closeModal}
          handleRemoveConfirm={handleRemoveConfirm}
        />

        <RemoveCategoryConfirm
          openModal={openModal}
          closeModal={closeModal}
          confirmCategoryConfirm={confirmCategoryConfirm}
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
            removeItem={removeItem}
        />
        <div className="saleTransactionGrid" style={{ gridColumn: '4 / 4', gridRow: '1 / 3' }}>
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
        <div className="saleCategoryGrid" style={{ gridRow: '2 / 2', gridColumn: '1 / 4' }}>
          <SaleCategory
            menuCategories={menuCategories}
            removeCategoryConfirm={removeCategoryConfirm}
            openModal={openModal}
            filterByCategory={filterByCategory} />
        </div>
      </div>
    </div>
  );

export default SaleScreen;
