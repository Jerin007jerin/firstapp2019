import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product: Product = new Product();
  productform: FormGroup;
  constructor(private service: ProductService, private route: ActivatedRoute, private formbuilder: FormBuilder, private toastr: ToastrService) { }
  id: number;
  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.service.GetProduct(this.id).subscribe(x=>{
      console.log(x)
      this.product=x;
     console.log(this.product)
    });
    
    
    
    this.productform = this.formbuilder.group({
      pid: [Validators.compose([Validators.required])],
      pname: [Validators.compose([Validators.required])],
      pdescription: [Validators.compose([Validators.required])],
      pdate: [Validators.compose([Validators.required])],
      pprice: [Validators.compose([Validators.required])]

    });
  }
  get formControls() {
    return this.productform.controls;
  }
  UpdateProduct() {
    this.product.pid = this.productform.controls.pid.value;
    this.product.pname = this.productform.controls.pname.value;
    this.product.pdescription = this.productform.controls.pdescription.value;
    this.product.pdate = this.productform.controls.pdate.value;
    this.product.pprice = this.productform.controls.pprice.value;
    this.service.updateproduct(this.id, this.product).subscribe(res => {
      this.toastr.success("update successfull");
    })
  }
}
