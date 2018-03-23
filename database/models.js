const Sequelize = require('sequelize');
const {
  DB_NAME, DB_PORT, DB_UN, DB_PW, DB_URL
} = require('../config.js');

const db = new Sequelize(DB_NAME, DB_UN, DB_PW, {
  host: DB_URL,
  port: DB_PORT,
  dialect: 'mysql',
});

const Employee = db.define('Employees', {
  employee_id: Sequelize.INTEGER,
  employee_img: Sequelize.STRING,
  manager_password: Sequelize.STRING,
  manager_privilege: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  employee_name: Sequelize.STRING,
});

const Item = db.define('Items', {
  item_name: Sequelize.STRING,
  item_price: Sequelize.DECIMAL,
  item_image: Sequelize.STRING,
  item_ingredients: Sequelize.STRING,
  item_category: Sequelize.INTEGER,
});

const Category = db.define('Categories', {
  category_name: Sequelize.STRING,
});

const Sale = db.define('Sales', {
  sale_date: Sequelize.STRING,
  item_id: Sequelize.STRING,
  employee_id: Sequelize.INTEGER,
  sale_amount: Sequelize.DECIMAL,
  sale_cost: Sequelize.DECIMAL,
  sale_discount: Sequelize.INTEGER,
  sale_cash: Sequelize.BOOLEAN,
});

const Ingredient = db.define('Ingredients', {
  ingredient_name: Sequelize.STRING,
  order_number: Sequelize.STRING,
  ingredient_left: Sequelize.DECIMAL,
  ingredient_initial: Sequelize.DECIMAL,
  ingredient_cost: Sequelize.DECIMAL,
  ingredient_expire: Sequelize.STRING,
});

const Order = db.define('Orders', {
  order_date: Sequelize.STRING,
  order_name: Sequelize.STRING,
  order_id: Sequelize.INTEGER,
  order_initial: Sequelize.DECIMAL,
  order_left: Sequelize.DECIMAL,
  order_price: Sequelize.DECIMAL,
  order_expire: Sequelize.STRING,
});

const Timesheet = db.define('Timesheets', {
  employee_id: Sequelize.INTEGER,
  check_in: Sequelize.STRING,
  check_out: Sequelize.STRING,
});

// db.sync({ force: true }).then(() => {
//   Employee.create({
//     employee_id: '5', employee_name: 'Manos', employee_img: 'https://avatars3.githubusercontent.com/u/32654968?s=460&v=4', manager_privilege: true,
//   });
//   Employee.create({
//     employee_id: '96', employee_name: 'Eric', manager_privilege: true,
//   });
//   Employee.create({
//     employee_id: '99', employee_name: 'Jerry', employee_img: 'https://avatars2.githubusercontent.com/u/29716220?s=460&v=4', manager_privilege: true,
//   });
//   Employee.create({
//     employee_id: '88', employee_name: 'Xixi', employee_img: 'https://avatars2.githubusercontent.com/u/31266066?s=460&v=4', manager_privilege: true,
//   });
//   Employee.create({
//     employee_id: '400', employee_name: 'Adam', employee_img: 'https://media.licdn.com/dms/image/C5603AQESXK5y_CFecQ/profile-displayphoto-shrink_800_800/0?e=1526958000&v=alpha&t=iYNrBoRdR-6nKxPN8ZA76GfYAXWmi3aEmp9pWBAMTns', manager_privilege: false,
//   });
//   Ingredient.create({
//     ingredient_name: 'Ground Beef', order_number: 5, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 5, ingredient_expire: '2018/03/29',
//   });
//   Ingredient.create({
//     ingredient_name: 'Lettuce', order_number: 6, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.10, ingredient_expire: '2018/04/25',
//   });
//   Ingredient.create({
//     ingredient_name: 'Tomatoes', order_number: 10, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.25, ingredient_expire: '2018/04/25',
//   });
//   Ingredient.create({
//     ingredient_name: 'Onions', order_number: 9, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.15, ingredient_expire: '2018/03/29',
//   });
//   Ingredient.create({
//     ingredient_name: 'Pickles', order_number: 8, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 0.5, ingredient_expire: '2018/04/25',
//   });
//   Ingredient.create({
//     ingredient_name: 'Ketchup', order_number: 11, ingredient_left: 5.5, ingredient_initial: 10.5, ingredient_cost: 1, ingredient_expire: '2018/03/29',
//   });
//   Ingredient.create({
//     ingredient_name: 'Coca-Cola Cans', order_number: 12, ingredient_left: 80, ingredient_initial: 100, ingredient_cost: 0.10, ingredient_expire: '2018/03/29',
//   });
//   Category.create({
//     category_name: 'Drinks',
//   });
//   Category.create({
//     category_name: 'Burgers',
//   });
//   Category.create({
//     category_name: 'Salad',
//   });
//   Category.create({
//     category_name: 'Soup',
//   });
//   Category.create({
//     category_name: 'Steak',
//   });
//   Category.create({
//     category_name: 'Breakfast',
//   });
//   Item.create({
//     item_name: 'Hamburger', item_price: 5, item_image: 'https://www.rallys.com/wp-content/uploads/2017/03/BigBuford_Feature_1000x1000-600x600.jpg', item_ingredients: '[1, 2, 3, 4, 5, 6]', item_category: 2,
//   });
//   Item.create({
//     item_name: 'Coca-Cola', item_price: 1, item_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY2B_5VgeOlPdpGZLz3H4SBmazfFS1gsoxtcBddF0awQux3EiY', item_ingredients: '[7]', item_category: 1,
//   });
//   Item.create({
//     item_name: 'Basic Salad', item_price: 6, item_image: 'https://recipes.heart.org/-/media/aha/recipe/recipe-images/mediterranean-salad.jpg', item_ingredients: '[2, 3, 4]', item_category: 3,
//   });
//   Item.create({
//     item_name: 'Chicken Noodle Soup', item_price: 4, item_ingredients: '[6]', item_category: 4,
//   });
//   Item.create({
//     item_name: 'Egg and Cheese Sandwich', item_price: 3, item_ingredients: '[6]', item_category: 6,
//   });
//   Order.create({
//     order_date: '2018/02/27', order_name: 'Ground Beef', order_id: 5, order_initial: 21, order_left: 6, order_price: 18, order_expire: '2018/03/25',
//   });
//   Order.create({
//     order_date: '2018/02/27', order_name: 'Lettuce', order_id: 5, order_initial: 50, order_left: 29, order_price: 1, order_expire: '2019/03/25',
//   });
//   Order.create({
//     order_date: '2018/02/27', order_name: 'Pickles', order_id: 5, order_initial: 14, order_left: 2, order_price: 3.6, order_expire: '2018/05/25',
//   });
//   Order.create({
//     order_date: '2018/02/28', order_name: 'Onions', order_id: 6, order_initial: 100, order_left: 70, order_price: 2.2, order_expire: '2018/10/25',
//   });
//   Order.create({
//     order_date: '2018/02/28', order_name: 'Coca-Cola Cans', order_id: 6, order_initial: 90, order_left: 15, order_price: 1.8, order_expire: '2018/11/25',
//   });
//   Order.create({
//     order_date: '2018/02/28', order_name: 'Ground Beef', order_id: 9, order_initial: 8, order_left: 4, order_price: 20, order_expire: '2018/08/25',
//   });
//   Order.create({
//     order_date: '2018/02/28', order_name: 'Tomatoes', order_id: 10, order_initial: 35, order_left: 15, order_price: 9, order_expire: '2019/03/25',
//   });
//   Order.create({
//     order_date: '2018/03/04', order_name: 'Ketchup', order_id: 11, order_initial: 200, order_left: 45, order_price: 1.5, order_expire: '2019/03/25',
//   });
//   Order.create({
//     order_date: '2018/03/04', order_name: 'Ground Beef', order_id: 11, order_initial: 55, order_left: 2, order_price: 18, order_expire: '2018/10/25',
//   });
//   Order.create({
//     order_date: '2018/01/04', order_name: 'Coca-Cola Cans', order_id: 6, order_initial: 90, order_left: 10, order_price: 1.8, order_expire: '2018/06/25',
//   });
//   Order.create({
//     order_date: '2018/01/04', order_name: 'Ground Beef', order_id: 9, order_initial: 8, order_left: 12, order_price: 20, order_expire: '2018/06/25',
//   });
//   Order.create({
//     order_date: '2017/12/12', order_name: 'Tomatoes', order_id: 10, order_initial: 35, order_left: 9, order_price: 9, order_expire: '2018/04/25',
//   });
//   Order.create({
//     order_date: '2017/11/18', order_name: 'Ketchup', order_id: 11, order_initial: 200, order_left: 45, order_price: 1.5, order_expire: '2018/02/25',
//   });
//   Order.create({
//     order_date: '2017/10/02', order_name: 'Ground Beef', order_id: 11, order_initial: 55, order_left: 13, order_price: 18, order_expire: '2018/01/25',
//   });
// });

exports.Employee = Employee;
exports.Item = Item;
exports.Category = Category;
exports.Sale = Sale;
exports.Ingredient = Ingredient;
exports.Order = Order;
exports.Timesheet = Timesheet;



//   Sale.create({
//     sale_date: '3/20/2018', item_id: '[1, 2, 3]', employee_id: 88, sale_amount: 14.23, sale_cost: 7.09, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/20/2018', item_id: '[2, 4]', employee_id: 96, sale_amount: 5.03, sale_cost: 3.29, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/19/2018', item_id: '[1, 3, 5]', employee_id: 99, sale_amount: 15.03, sale_cost: 9.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/19/2018', item_id: '[4]', employee_id: 99, sale_amount: 4.12, sale_cost: 2.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/19/2018', item_id: '[4]', employee_id: 5, sale_amount: 4.12, sale_cost: 2.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/18/2018', item_id: '[1, 2]', employee_id: 96, sale_amount: 6.49, sale_cost: 3.06, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/18/2018', item_id: '[1, 2, 3]', employee_id: 88, sale_amount: 14.23, sale_cost: 7.09, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/18/2018', item_id: '[2, 4]', employee_id: 96, sale_amount: 5.03, sale_cost: 3.29, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/17/2018', item_id: '[1, 3, 5]', employee_id: 99, sale_amount: 15.03, sale_cost: 9.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/17/2018', item_id: '[4]', employee_id: 99, sale_amount: 4.12, sale_cost: 2.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/16/2018', item_id: '[4]', employee_id: 5, sale_amount: 4.12, sale_cost: 2.26, sale_discount: 0,
//   });
//   Sale.create({
//     sale_date: '3/16/2018', item_id: '[1, 2]', employee_id: 96, sale_amount: 6.49, sale_cost: 3.06, sale_discount: 0,
//   });
