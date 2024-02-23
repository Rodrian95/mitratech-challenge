import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product: Product | undefined;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const productName = params.get('productName');
      if (productName) {
        this.productService
          .getProductByName(productName)
          .subscribe((product) => {
            this.product = product;
          });
      }
    });
  }
}
