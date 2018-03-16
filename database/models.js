const Sequelize = require('sequelize');
const config = require('config');

const DB_NAME = config.DB_NAME;
const DB_PORT = config.DB_PORT;
const DB_UN = config.DB_UN;
const DB_PW = config.DB_PW;
const DB_URL = config.DB_URL;

const db = new Sequelize(DB_NAME, DB_UN, DB_PW, {
  host: DB_URL,
  port: DB_PORT,
  dialect: 'mysql',
});

const Employee = db.define('Employees', {
  employee_id: Sequelize.INTEGER,
  employee_img: Sequelize.STRING,
  manager_password: {type: Sequelize.STRING, allowNull: false, defaultValue: NULL},
  manager_privilege: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
  employee_name: Sequelize.STRING
});

const Item = db.define('Items', {
  item_name: Sequelize.STRING,
  item_price: Sequelize.DECIMAL,
  item_image: Sequelize.STRING,
  item_ingredients: Sequelize.STRING,
  item_category: Sequelize.INTEGER
});

const Category = db.define('Categories', {
  category_name: Sequelize.STRING
});

const Sale = db.define('Sales', {
  sale_date: Sequelize.STRING,
  item_id: Sequelize.STRING,
  employee_id: Sequelize.INTEGER,
  sale_amount: Sequelize.DECIMAL,
  sale_cost: Sequelize.DECIMAL,
  sale_discount: Sequelize.INTEGER
});

const Ingredient = db.define('Ingredients', {
  ingredient_name: Sequelize.STRING,
  order_number: Sequelize.STRING,
  ingredient_left: Sequelize.DECIMAL,
  ingredient_initial: Sequelize.DECIMAL,
  ingredient_cost: Sequelize.DECIMAL,
  ingredient_expire: Sequelize.STRING
});

const Order = db.define('Orders', {
  order_date: Sequelize.STRING,
  order_id: Sequelize.INTEGER,
  order_initial: Sequelize.DECIMAL,
  order_left: Sequelize.DECIMAL,
  order_price: Sequelize.DECIMAL
});

const Timesheet = db.define('Timesheets', {
  employee_id: Sequelize.INTEGER,
  check_in: Sequelize.STRING,
  check_out: Sequelize.STRING
});
