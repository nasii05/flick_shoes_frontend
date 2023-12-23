import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/';
  private currentPage: number = 1;

  constructor(private http: HttpClient) { }

  getCurrentPage(): number{
    return this.currentPage;
  }

  serCurrentPage(page: number):void {
    this.currentPage = page;
  }

  getAllProducts(page?: number): Observable<any>{
    const curentPage = page || this.currentPage;
    const url = `${this.apiUrl}api/products?page=${curentPage}`;
    return this.http.get(url);
  }

  getPostsForNextPage(): Observable<any> {
    this.currentPage++;
    return this.getAllProducts();
  }

  getPostsForPreviousPage(): Observable<any>{
    if(this.currentPage > 1){
      this.currentPage--;
    }
    return this.getAllProducts();
  }
}
