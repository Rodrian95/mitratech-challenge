import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  @Input() isCreateAction = false;
  @Input() productId = '';

  constructor(private fb: FormBuilder, private productsServ: ProductsService) {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(20000),
          Validators.pattern(/^\d+\.?\d{0,2}$/),
        ],
      ],
      description: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    const productData: Product = this.productForm.value;
    this.isCreateAction
      ? this.productsServ.addProduct(productData).subscribe({
          next: () => {
            this.productForm.reset();
            this.productsServ.notifyProductListWasUpdated('create');
          },
          error: (error) => {
            console.error(error);
          },
        })
      : this.productsServ.updateProduct(this.productId, productData).subscribe({
          next: () => {
            this.productForm.reset();
            this.productsServ.notifyProductListWasUpdated('update');
          },
          error: (error) => {
            console.error(error);
          },
        });
  }
}
