import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  private apiUrl = 'http://localhost:3000/api/products';
  products :product[] = [];
  totalPages : number = 1;
  newProduct: any = {}
  constructor(private productService: ProductService){}

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((data)=>{
      this.products = data as product[];
    })
  }

  addProduct(): void{
    this.productService.addProduct(this.newProduct).subscribe(()=>{
      this.getAllProducts();
      this.newProduct  = {};
    })
  }

  deleteProduct(id: string){
    return this.productService.deleteProduct(id).subscribe(()=>{
      this.getAllProducts();
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
