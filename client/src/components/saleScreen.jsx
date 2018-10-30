import React from 'react';
import Select from 'react-select';
import SaleItems from './SaleItems.jsx';
import SaleCategory from './SaleCategory.jsx';
import Transaction from './Transaction.jsx';
import SaleControl from './SaleControl.jsx';
import Navbar from './Navbar.jsx';
import VoidModal from './VoidModal.jsx';

const SaleScreen = ({ menuItems, itemClick, menuCategories, transactionItems, total, tax, discount, openModal, closeModal, discountOptions, updateDiscount, transactionRemove, filterByCategory, removeIng, transactionComplete, transactionClear, addIng }) =>
  (
    <div>
      <div className="navbar">
        <Navbar transactionItems={transactionItems} />
      </div>
      <div className="saleScreenGrid animated fadeIn">
        <div id="discountModal" className="discountModal animated fadeIn">
          <div className="modal-content">
            <div className="modal-header">Discount <div className="discountClose" onClick={() => closeModal('discountModal')}>&times;</div></div>
            <div className="modal-body">
              Percentage
              <Select
                className="discountDropdown"
                options={discountOptions}
                matchProp="any"
                searchable="false"
                onChange={value => updateDiscount(value.value)}
              />
            </div>
            <div className="modal-footer">Please Pick</div>
          </div>
        </div>
        <div id="voidModal" className="voidModal animated fadeIn">
          <VoidModal
            openModal={openModal}
            closeModal={closeModal}
          />
        </div>
        <div style={{ gridColumn: '1 / 4', gridRow: '1 / 1' }}><SaleItems menuItems={menuItems} itemClick={itemClick} /></div>
        <div className="saleTransactionGrid">
          <Transaction
            removeIng={removeIng}
            transactionRemove={transactionRemove}
            transactionItems={transactionItems}
            total={total}
            tax={tax}
            discount={discount}
            openModal={openModal}
            addIng={addIng}
            transactionComplete={transactionComplete}
            transactionItems={transactionItems}
            transactionClear={transactionClear}
            menuItems={menuItems}
          />
        </div>
        <div className="saleCategoryGrid">
          <SaleCategory
            menuCategories={menuCategories}
            filterByCategory={filterByCategory} />
        </div>
      </div>
    </div>
  );

export default SaleScreen;
