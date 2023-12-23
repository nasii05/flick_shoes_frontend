import { product } from './../../models/product.interface';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent {
  prod: product[] = [];
  updatedProd : any = {}
  constructor(private activatedRoute: ActivatedRoute,private productService: ProductService, private router: Router){
    this.activatedRoute.params.subscribe((param) => {
      this.productService.getSingleProduct(param['id']).subscribe((data)=>{
        this.prod.push(data)
        console.log(this.prod);
      })
    })
  }

  ngOnInit(){

  }

  updateProd(id: string, product: any): void{
    this.productService.updateProduct(id, product).subscribe((task)=>{
      this.productService.getSingleProduct(id).subscribe(res => console.log(res))

      setTimeout(()=>{
        this.router.navigate(['/inventory'])
      }, 1000)
    })
  }

  ngOnDestroy(){
    this.prod = []
  }
}
