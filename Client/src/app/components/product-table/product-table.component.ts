import { Component } from '@angular/core';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  products: Product[] = [];
  isAlertActive = false;
  alertMessage = '';
  alertType = '';
  alertAction = '';
  createProductSub: Subscription;
  updateProductId = '';
  isCreateAction = false;
  modalInstance!: Modal;

  constructor(private productsServ: ProductsService) {
    this.createProductSub = this.productsServ.$productListUpdate.subscribe({
      next: (response: any) => {
        const closeModal = document.getElementById('close-modal');
        closeModal?.click();
        this.alertMessage = `Product was ${response}ed succesfully`;
        this.alertAction = response;
        this.alertType = 'success';
        this.isAlertActive = true;
        this.loadProducts();
        setInterval(() => {
          this.isAlertActive = false;
        }, 4000);
      },
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  openProductFormModal(productId?: string) {
    if (productId) {
      this.updateProductId = productId;
      this.isCreateAction = false;
    } else this.isCreateAction = true;
    const modalElement = document.getElementById('productFormModal');
    const modalInstance = new Modal(modalElement!);
    this.modalInstance = modalInstance;
    modalInstance.show();
  }

  loadProducts() {
    this.productsServ
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  deleteProduct(id: string) {
    this.productsServ.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
    });
  }
}
