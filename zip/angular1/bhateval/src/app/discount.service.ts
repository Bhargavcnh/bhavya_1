import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  calculateDiscount(totalBill: number): number {
    const discountPercentage = totalBill > 10000 ? 10 : 0;
    const discountAmount = (discountPercentage / 100) * totalBill;
    return discountAmount;
  }
}