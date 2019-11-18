import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http:HttpClient) { }


  GetProductList():Observable<any>
  {
return this.http.get(environment.baseUrl+'/productTbls')
  }

  AddProducts(product:Product)
  {
    return this.http.post(environment.baseUrl+'/productTbls',product)
  }
  updateproduct(id:number,product:Product)
  {
    return this.http.put(environment.baseUrl+'/productTbls/'+id,product)
  }
  GetProduct(id:number):Observable<any>
  {
    return this.http.get(environment.baseUrl+'/productTbls/'+id)
  }
  deleteproduct(id:number)
  {
return this.http.delete(environment.baseUrl+'/productTbls/'+id)
  }

}
