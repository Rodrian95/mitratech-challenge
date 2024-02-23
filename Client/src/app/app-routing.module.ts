import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductTableComponent,
  },
  {
    path: 'products/:productName',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
