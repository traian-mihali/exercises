function Vehicle(model, manufacturer, horsepower, consumption, fuel) {
  this.model = model;
  this.manufacturer = manufacturer;
  this.horsepower = horsepower;
  this.consumption = consumption;
  this.fuel = fuel;
}

Vehicle.prototype.startEngine = function() {
  return `${this.fuel} liters`;
};

Vehicle.prototype.driveDistance = function(distance) {
  const consumedFuel = distance * (this.consumption / 100);

  if (this.fuel >= consumedFuel)
    return `
    ${distance}km can be covered. 
    Remaining fuel: ${(this.fuel - consumedFuel).toFixed(2)} liters`;
  return `
  Not enough fuel to travel ${distance}km. 
  Maximum Distance: ${(this.fuel / (this.consumption / 100)).toFixed(2)}km`;
};

Vehicle.prototype.timeToArrive = function(distance) {
  const consumedFuel = distance * (this.consumption / 100);
  if (this.fuel < consumedFuel)
    return `Not enough fuel to reach the destination`;

  let topSpeed;
  if (this.horsepower < 100) topSpeed = 120;
  else if (this.horsepower >= 100 && this.horsepower < 140) topSpeed = 220;
  else if (this.horsepower >= 140 && this.horsepower < 200) topSpeed = 280;
  else topSpeed = 330;

  const duration = (distance / topSpeed) * 60;

  return `
  Duration: ${duration.toFixed(2)} minutes.
  Distance: ${distance}km.
  Fuel consumed: ${consumedFuel.toFixed(2)} liters.`;
};

const miniCooper = new Vehicle("Mini Cooper", "BMW", 134, 8.5, 15);
const mustangMachI = new Vehicle("Mustang Mach I", "Ford", 335, 15, 30);
const pontiacFireBird = new Vehicle("Pontiac FireBird", "GM", 250, 14, 20);

miniCooper.price = 28200;
mustangMachI.price = 43400;
pontiacFireBird.price = 35300;

function compareVehicle(...vehicles) {
  let fastestCar = vehicles[0];
  let bestCarByConsumption = vehicles[0];
  let cheapestCar = vehicles[0];

  for (let vehicle of vehicles) {
    if (vehicle["horsepower"] > fastestCar["horsepower"]) fastestCar = vehicle;

    if (vehicle["consumption"] < bestCarByConsumption["consumption"])
      bestCarByConsumption = vehicle;

    if (vehicle["price"] < cheapestCar["price"]) cheapestCar = vehicle;
  }

  return `Summary:
  The fastest car: ${fastestCar.model}.
  The best car by consumption: ${bestCarByConsumption.model}.
  The cheapest car: ${cheapestCar.model}.`;
}

console.log(compareVehicle(miniCooper, mustangMachI, pontiacFireBird));
