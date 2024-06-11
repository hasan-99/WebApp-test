import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../core/models/response/products';

@Component({
  selector: 'app-prpdact',
  templateUrl: './prpdact.component.html',
  styleUrls: ['./prpdact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class PrpdactComponent implements OnInit {
  @Input() product!: Product;

  constructor() { }

  ngOnInit() {
  }

  getRatingStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index + 1);
  }


}

