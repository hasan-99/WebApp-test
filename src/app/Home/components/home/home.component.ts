import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { firstValueFrom } from 'rxjs';
import { DropdownModel } from '../../core/models/DropdownModel';
import { Product } from '../../core/models/response/products';
import { HttpService } from '../../core/services/http.service';
import { LoaderComponent } from '../loader/loader.component';
import { PrpdactComponent } from '../prpdact/prpdact.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LoaderComponent, PrpdactComponent, FormsModule, CommonModule, ButtonModule, NgxPaginationModule, DropdownModule, InputTextModule]

})
export class HomeComponent implements OnInit {
  totalProdact: number = 0;
  loading: boolean = true;
  p: number = 1;
  products: Product[] = [];
  dropdwonOptions: DropdownModel<number>[] = [];
  searchValue: string = '';
  allProducts: Product[] = [];
  selectedSortCriteria: number | null = null;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.setupDropdownOptions();
    this.getProducts();
  }

  private async getProducts() {
    this.loading = true;
    let rolesResp = await firstValueFrom(this.http.getFakeData());
    this.loading = false;

    this.allProducts = rolesResp;
    this.applyFilters();
  }

  private setupDropdownOptions() {
    this.dropdwonOptions = [
      { value: 1, label: 'Best Rating' },
      { value: 2, label: 'Lower Price' },
      { value: 3, label: 'Higher Price' }
    ];
  }

  onDropdownChange(selectedCriteria: number | null) {
    this.selectedSortCriteria = selectedCriteria;
    this.applySorting();
  }

  onSearch(keyword: string) {
    this.searchValue = keyword;
    this.applyFilters();
  }

  private applyFilters() {
    let filteredProducts = this.allProducts;

    if (this.searchValue) {
      filteredProducts = this.filterProductsByNameOrDescription(filteredProducts, this.searchValue);
    }

    this.products = filteredProducts;
    this.applySorting();
  }

  private applySorting() {
    if (this.selectedSortCriteria !== null) {
      switch (this.selectedSortCriteria) {
        case 1: //sort by best rating
          this.sortByBestRating();
          break;
        case 2: //sort by lower price
          this.sortByLowerPrice();
          break;
        case 3:// sort by higher price
          this.sortByHigherPrice();
          break;
        default:
          break;
      }
    } else {
      this.shuffleProducts();
    }
  }

  // Filters the products based on search keyword and updates the products list.
  private filterProductsByNameOrDescription(products: Product[], keyword: string): Product[] {
    return products.filter(product =>
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private sortByBestRating() {
    this.products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  private sortByLowerPrice() {
    this.products.sort((a, b) => a.price - b.price);
  }

  private sortByHigherPrice() {
    this.products.sort((a, b) => b.price - a.price);
  }


  // The `shuffleProducts` function shuffles the elements in the `products` array using the Fisher-Yates algorithm.

  private shuffleProducts() {
    for (let i = this.products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.products[i], this.products[j]] = [this.products[j], this.products[i]];
    }
  }
}