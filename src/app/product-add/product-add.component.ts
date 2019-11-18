import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productform:FormGroup;
  isSubmitted=false;
product:Product=new Product();
  constructor(private formBuilder:FormBuilder,private service:ProductService,private toastr:ToastrService) { }

  ngOnInit() {
    this.productform=this.formBuilder.group({
      productname:['',Validators.required],
      productdescription:['',Validators.required],
      mdate:['',Validators.required],
      pprice:['',Validators.required]

    });
  }
  get formcontrols()
  {
    return this.productform.controls;
  }
  AddProduct()
  {
    this.isSubmitted=true;
    if(this.productform.invalid)
    {
      return;
    }
    this.product.pname=this.productform.controls.productname.value;
    this.product.pdescription=this.productform.controls.productdescription.value;
    this.product.pdate=this.productform.controls.mdate.value;
    this.product.pprice=this.productform.controls.pprice.value;
    this.service.AddProducts(this.product).subscribe(x=>{this.toastr.success('Product Added','hooorrayyy!')});
    
    
    //this.ngOnInit();
  }

}
