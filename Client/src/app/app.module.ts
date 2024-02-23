import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ActionAlertComponent } from './components/action-alert/action-alert.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent,
    ProductFormComponent,
    ActionAlertComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
