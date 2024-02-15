import { Component } from '@angular/core';
import { DiscountService } from '../discount.service';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  selected: boolean;
  chef: {
    name: string;
    incentive: number;
  };
}

@Component({
  selector: 'app-dish',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent {
  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Veg Biryani',
      price: 1500,
      selected: false,
      chef: { name: 'Chef A', incentive: 0 },
    },
    {
      id: 2,
      name: 'Cappucino',
      price: 2000,
      selected: false,
      chef: { name: 'Chef B', incentive: 0 },
    },
    {
      id: 3,
      name: 'Vada Pav',
      price: 1000,
      selected: false,
      chef: { name: 'Chef C', incentive: 0 },
    },
    {
      id: 4,
      name: 'Samosa',
      price: 1000,
      selected: false,
      chef: { name: 'Chef D', incentive: 0 },
    },
    {
      id: 5,
      name: 'Pulao',
      price: 1800,
      selected: false,
      chef: { name: 'Chef E', incentive: 0 },
    },
    {
      id: 6,
      name: 'Desert',
      price: 3000,
      selected: false,
      chef: { name: 'Chef F', incentive: 0 },
    },
    {
      id: 7,
      name: 'Soups',
      price: 1500,
      selected: false,
      chef: { name: 'Chef A', incentive: 0 },
    },
    {
      id: 8,
      name: 'Starters',
      price: 700,
      selected: false,
      chef: { name: 'Chef A', incentive: 0 },
    },
  ];

  constructor(private discountService: DiscountService) {}

  get selectedDishes() {
    return this.menuItems.filter((item) => item.selected);
  }

  get totalBill() {
    return this.selectedDishes.reduce((sum, item) => sum + item.price, 0);
  }

  get discountApplied() {
    return this.discountService.calculateDiscount(this.totalBill);
  }

  get discountedBill() {
    return this.totalBill - this.discountApplied;
  }

  get chefIncentive() {
    return this.selectedDishes.reduce(
      (sum, item) => sum + item.chef.incentive,
      0
    );
  }

  onSubmit() {
    // Calculate chef incentive
    const chefIncentive = 0.02 * this.totalBill;

    // Apply incentive to selected dishes' chefs
    this.selectedDishes.forEach((item) => {
      item.chef.incentive += chefIncentive;
    });

    // Log details
    console.log('Selected Dishes:', this.selectedDishes);
    console.log('Total Bill:', this.totalBill);
    console.log('Discount Applied:', this.discountApplied);
    console.log('Discounted Bill:', this.discountedBill);
    console.log('Chef Incentive:', chefIncentive);
    alert(
      `Thanks for your order!\nThe total bill is: Rs.${this.discountedBill}.\nThe chefs were able to earn: Rs.${chefIncentive}\nVisit Again!`
    );
  }
}
