export class FilterCriteria {
          public label?: string;
          public bestRate: boolean;
          public lowerPrice: number;
          public higherPrice: number;
        
          constructor(bestRate: boolean, lowerPrice: number, higherPrice: number, label?: string) {
            this.bestRate = bestRate;
            this.lowerPrice = lowerPrice;
            this.higherPrice = higherPrice;
            this.label = label;
          }
        }