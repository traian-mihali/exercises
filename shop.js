/*
 * The goals of this problem are to:
 * 1. Parse OrdersString into an array of Order objects (details below) containing the types and quantities of furniture requested
 * Example: OrderString -> [Order], [Order] stands for array of Order objects
 * Parsing "Tables-5,Beds-3;Tables-4,Chairs-2" will result in an array containing 2 Order objects,
 * the first with 5 Tables and 3 Beds and the second with 4 Tables and 2 Chairs
 * 2. Parse StockString into a Stock object containing available furniture stored
 * 3. Iterate the array of Orders and check which can be delivered given the available Stock
 * 4. Collect into another array the Orders which could not be completed and merge them into a single Order,
 * with the total furniture required to complete them
 * 5. Log the uncompleted Orders, the merged Order with the total furniture, and the remaining Stock
 *
 * This problem is best solved with JavaScript Objects and the prototype mechanism.
 * The function signatures you will need have already been provided below, along with instructions for what each needs to do.
 */

/*
 * The Orders are stored in a string called "OrdersString", and the Stock of furniture is stored in a string called "StockString". (below)
 * - Orders are separated by the ";" character
 * - Furniture types are separated by the "," character
 * - Furniture type and Quantity are separated by the "-" character
 */
var OrdersString =
  "Tables-5,Chairs-3,Beds-2;Tables-2,Chairs-5;Tables-3,Chairs-2,Beds-10;Tables-1,Beds-2;Chairs-8,Beds-2";
var StockString = "Tables-15,Chairs-15,Beds-8";

/*
 * Create the Order object, which has:
 * 1. the constructor, which takes the string representation of an Order ("Tables-1,Chairs2,Beds-3" for example)
 * and adds the different furniture types along with their respective quantities into the object
 * 2. the method "addFurniture", which takes pairs of (Furniture (String) - Quantity (Number)) and adds them to the object
 * 3. the method "mergeOrders", which takes another Order and results in an Order containing the total Furniture of each type for both Orders
 * Example: orderA has 5 Tables and 2 Chairs, orderB has 2 Tables and 1 Chair; orderA.merge(orderB) -> orderA containing 7 Tables and 3 Chairs
 * Hint: mergeOrders is needed later in the test, you can skip implementing it at first.
 */
function Order(orderString) {
  if (orderString === "" || typeof orderString !== "string") return;

  const arrayOfFurnitures = orderString.split(",");
  const orderObject = {};

  for (let furniture of arrayOfFurnitures) {
    let arr = furniture.split("-");
    orderObject[arr[0]] = Number([arr[1]]);
  }

  for (let key in orderObject) {
    this[key] = orderObject[key];
  }
}

Order.prototype.addFurniture = function(furniture, count) {
  this[furniture] = count;
};

Order.prototype.mergeOrders = function(otherOrder) {
  for (let key in otherOrder) {
    if (this.hasOwnProperty(key)) this[key] += otherOrder[key];
    else if (otherOrder.hasOwnProperty(key)) this[key] = otherOrder[key];
  }
};

const order = new Order("Tables-5,Chairs-3,Beds-2");
const otherOrder = new Order("Tables-1,Chairs-1,Beds-1");

/* Create a Stock object, which has:
 * 1. the constructor, which parses a stock string representation into pairs of (Furniture (String) - Quantity (Number)) 
 which will represent the furniture available for processing orders
 * 1. the method "hasEnoughFurniture", which takes an Order object, and returns true if there is enough furniture to complete the entire Order, or false otherwise
 * 2. the method "deliverFurniture", which takes an Order object, and subtracts the amount of furniture the Order needs from the available Stock ONLY if enough is available
 */

function Stock(stockString) {
  const stock = new Order(stockString);
  for (let key in stock) {
    if (stock.hasOwnProperty(key)) this[key] = stock[key];
  }
}

Stock.prototype.hasEnoughFurniture = function(order) {
  for (let key of Object.keys(order)) {
    if (!this.hasOwnProperty(key) || this[key] < order[key]) return false;
  }
  return true;
};

Stock.prototype.deliverFurniture = function(order) {
  if (!this.hasEnoughFurniture(order))
    return "Insufficient furniture in stock to cover the order";

  for (let key in order) if (this.hasOwnProperty(key)) this[key] -= order[key];
};

const stock = new Stock(StockString);

/* Create a FurnitureShop object, which has:
 * 1. the method "ordersStringToOrdersArray" which parses "OrdersString" into an "orders" array of Order objects
 * 2. the method "stockStringToStock" which parses "StockString" into a "stock" object
 * 3. the method "processOrders" which goes through each Order, completes it, reducing the furniture in Stock
 * (only if all the furniture in that Order can be delivered), and returns an array "remainingOrders" which have not been completed
 * 4. the method "mergeRemainingOrdersIntoRequiredStock" which merges all uncompleted Orders from processOrders,
 * creating a new Order object with the total amount of Furniture that the FurnitureShop needs, called "requiredStock"
 * At the end of the script, the original orders, remaining orders, remaining stock and required stock are logged.
 */
function FurnitureShop() {}

FurnitureShop.prototype.ordersStringToOrdersArray = function(ordersString) {
  const ordersArray = ordersString.split(";");
  const orders = [];

  for (let order of ordersArray) {
    let orderObj = new Order(order);
    orders.push(orderObj);
  }

  this.orders = orders;
};

FurnitureShop.prototype.stockStringToStock = function(stockString) {
  const stock = new Stock(stockString);
  this.stock = stock;
};

FurnitureShop.prototype.processOrders = function(ordersArray, stock) {
  const remainingOrders = [];
  for (let order of ordersArray) {
    if (stock.hasEnoughFurniture(order)) stock.deliverFurniture(order);
    else remainingOrders.push(order);
  }
  this.remainingOrders = remainingOrders;
};

FurnitureShop.prototype.mergeRemainingOrdersIntoRequiredStock = function(
  remainingOrders
) {
  const requiredStock = new Order("");
  for (let order of remainingOrders) {
    requiredStock.mergeOrders(order);
  }

  this.requiredStock = requiredStock;
};

var shop = new FurnitureShop();

shop.ordersStringToOrdersArray(OrdersString);
shop.stockStringToStock(StockString);
shop.processOrders(shop.orders, shop.stock);
shop.mergeRemainingOrdersIntoRequiredStock(shop.remainingOrders);

console.log("Original orders: " + JSON.stringify(shop.orders));
console.log("Remaining orders: " + JSON.stringify(shop.remainingOrders));
console.log("Required stock: " + JSON.stringify(shop.requiredStock));
console.log("Remaining stock: " + JSON.stringify(shop.stock));
