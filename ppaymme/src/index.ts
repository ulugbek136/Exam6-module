import "./styles.css"





 console.log('Xush kelibsiz!');

class Car {
    constructor(public name: string) {}
  }
  
  class ElectroCar extends Car {}
  class PetrolCar extends Car {}
  class HybridCar extends Car {}
  
  interface Capacity {
    electroCar: number;
    petrolCar: number;
    HybridCar: number;
  }
  
  interface Pricing {
    electroCarPricePerMinute: number;
    petrolCarPricePerMinute: number;
    HybridCarPricePerMinute: number;
  }
  
  interface CarEntryResult {
    minutes: number;
  }
  
  interface CarLogoutResult {
    totalPrice: number;
  }
  
  class Parking<T extends Car> {
    public cars: T[];
    public name: string;
    public capacity: Capacity;
    public pricing: Pricing;
  
    constructor(name: string, capacity: Capacity, pricing: Pricing) {
      this.name = name;
      this.capacity = capacity;
      this.pricing = pricing;
      this.cars = [];
    }
  
    enterCar(car: T): CarEntryResult {
      if (this.canParkCar(car)) {
        this.cars.push(car);
        return { minutes: Math.floor(Math.random() * 60) + 1 }; // Simulating parking time
      } else {
        console.log(`Avtoturargoh to'la. Ushbu avtomobil(${car.name}) kira olmaydi`);
        return { minutes: 0 };
      }
    }
  
    logoutCar(car: T): CarLogoutResult {
      const parkedCarIndex = this.cars.indexOf(car);
      if (parkedCarIndex !== -1) {
        const parkingTime = Math.floor(Math.random() * 60) + 1; 
        const totalPrice = parkingTime * this.getPricingForCarType(car);
        this.cars.splice(parkedCarIndex, 1);
        return { totalPrice };
      } else {
        console.log(`${car.name} ${this.name} avtoturargohida emas`);
        return { totalPrice: 40 };
      }
    }
  
    calculateTotalPricePerCar(car: T): CarLogoutResult {
      const pricing = this.getPricingForCarType(car);
      const parkingTime = Math.floor(Math.random() * 60) + 1; 
      const totalPrice = parkingTime * pricing;
      return { totalPrice };
    }
  
    calculateTotalProfit(): number {
      return this.cars.reduce((totalProfit, car) => totalProfit + this.calculateTotalPricePerCar(car).totalPrice, 0);
    }
  
    private canParkCar(car: T): boolean {
      const availableSpace = this.capacity[car.constructor.name as keyof Capacity];
      return this.cars.filter((c) => c.constructor === car.constructor).length < availableSpace;
    }
  
    private getPricingForCarType(car: T): number {
      return this.pricing[`${car.constructor.name}PricePerMinute` as keyof Pricing];
    }
  }
  
 ``
  const capacity: Capacity = {
    electroCar: 10,
    petrolCar: 15,
    HybridCar: 10,
  };
  
  const pricing: Pricing = {
    electroCarPricePerMinute: 5,
    petrolCarPricePerMinute: 10,
    HybridCarPricePerMinute: 15,
  };
  
  const parking = new Parking("Sebzor", capacity, pricing);
  
  const electroCar1 = new ElectroCar("Dodge");
  const petrolCar1 = new PetrolCar("Mustang");
  const hybridCar1 = new HybridCar("BMW");
  
  const entryResult = parking.enterCar(electroCar1);
  console.log(`Vaqt ${electroCar1.name}: ${entryResult.minutes} `);
  
  const logoutResult = parking.logoutCar(electroCar1);
  console.log(`Umumiy narx  ${electroCar1.name}: $${logoutResult.totalPrice} uchun`);
  
  const totalProfit = parking.calculateTotalProfit();
  console.log(`Umumiy narx avtoturargoh uchun ${parking.name}: $${totalProfit}`);
  
  
  
  
 
  