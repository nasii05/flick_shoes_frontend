import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private apiUrl = 'http://localhost:3000/api/products';
  products :product[] = [];
  totalPages : number = 1;
  constructor(private productService: ProductService){}

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data)=>{
      this.products = data as product[];
    })
  }

  goToNextPage(){
    this.productService.getPostsForNextPage().subscribe((data)=>{
      this.products = data as product[];
      this.totalPages = data.totalPages;
    })
  }

  goToPreviousPage(){
    this.productService.getPostsForPreviousPage().subscribe((data)=>{
      this.products = data as product[];
      this.totalPages = data.totalPages;
    })
  }

}
