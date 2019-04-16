const _sold = new WeakMap();
const _totalAmount = new WeakMap();
const _retrieves = new WeakMap();
const _deposits = new WeakMap();

function Bank(name, sold) {
  this.name = name;

  _sold.set(this, sold);
  _totalAmount.set(this, 0);
  _retrieves.set(this, 0);
  _deposits.set(this, 0);

  Object.defineProperty(this, "sold", {
    get: () => _sold.get(this)
  });

  Object.defineProperty(this, "totalAmount", {
    get: () => _totalAmount.get(this)
  });

  Object.defineProperty(this, "totalRetrieves", {
    get: () => _retrieves.get(this)
  });

  Object.defineProperty(this, "totalDeposits", {
    get: () => _deposits.get(this)
  });
}

Bank.prototype.retrieve = function(amount) {
  if (!amount) throw new Error("You need to enter a valid amount");

  let sold = _sold.get(this);
  let totalAmount = _totalAmount.get(this);
  let retrieves = _retrieves.get(this);

  if (amount > sold) throw new Error("Insufficient funds");

  if (this.totalRetrieves >= 10) {
    console.error(
      `You have reached the limit of 10 retrieves a day. The total amount retrieved is: ${
        this.totalAmount
      }`
    );
    return;
  }

  _sold.set(this, sold - amount);
  _totalAmount.set(this, totalAmount + amount);
  _retrieves.set(this, retrieves + 1);
  _deposits.set(this, 0);

  if (this.sold <= 100)
    console.log(`Attention! Your current sold is: ${this.sold}!`);

  if (this.totalRetrieves >= 5)
    console.info(`The amount retrieved so far is ${this.totalAmount}.`);
};

Bank.prototype.deposit = function(amount) {
  if (!amount) throw new Error("You need to enter a valid amount");

  let sold = _sold.get(this);
  let deposits = _deposits.get(this);
  _sold.set(this, sold + amount);
  _deposits.set(this, deposits + 1);
  _retrieves.set(this, 0);
  _totalAmount.set(this, 0);
  console.log(`Your current sold is: ${this.sold}`);
};

const account = new Bank("ING", 1000);
