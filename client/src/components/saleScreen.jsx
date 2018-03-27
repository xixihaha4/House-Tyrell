import React from 'react';
import SaleItems from './saleItems.jsx';
import SaleCategory from './saleCategory.jsx';
import Transaction from './transaction.jsx';
import SaleControl from './saleControl.jsx';
import Navbar from './navbar.jsx';
import Select from 'react-select';

const SaleScreen = ({ menuItems, itemClick, menuCategories, transactionItems, total, tax, discount, openDiscountModal, closeDiscountModal, discountOptions, updateDiscount, transactionRemove, filterByCategory, removeIng, transactionComplete, openOptionModal, closeOptionModal, transactionClear }) =>
  (
    <div>
      <div className="navbar">
        <Navbar transactionItems={transactionItems}/>
      </div>
      <div className="saleScreenGrid animated fadeIn">
        <div id="discountModal" className="discountModal animated fadeIn">
          <div className="modal-content">
            <div className="modal-header">Discount <div className="discountClose" onClick={() => closeDiscountModal()}>&times;</div></div>
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
        <div id="optionModal" className="discountModal animated fadeIn">
          <div className="modal-content">
            <div className="modal-header">Options <div className="discountClose" onClick={() => closeOptionModal()}>&times;</div></div>
            <div className="modal-body">
              Percentage
              <Select
                className="discountDropdown"
                options={discountOptions}
                matchProp="any"
                searchable="false"
                // onChange={value => updateDiscount(value.value)}
              />
            </div>
            <div className="modal-footer">Please Pick</div>
          </div>
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
            openDiscountModal={openDiscountModal}
            transactionComplete={transactionComplete}
            transactionItems={transactionItems}
            openOptionModal={openOptionModal}
            closeOptionModal={closeOptionModal}
            transactionClear={transactionClear}
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
