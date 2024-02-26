import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { faker } from '@faker-js/faker';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';

fdescribe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET and return list of products', () => {
    const dummyProducts = [
      { name: faker.commerce.productName(), price: faker.number.int() },
      { name: faker.commerce.productName(), price: faker.number.int() },
    ];

    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should GET and return a single product by its name', () => {
    const dummyProduct: Product = {
      name: faker.commerce.productName(),
      price: faker.number.int(),
      description: faker.lorem.sentences(2),
    };

    service.getProductByName(dummyProduct.name).subscribe((product) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products/${dummyProduct.name}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should POST product and return a success message', () => {
    const newProduct: Product = {
      name: faker.commerce.productName(),
      price: faker.number.int(),
      description: faker.lorem.sentences(2),
    };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    req.flush(newProduct);
  });

  it('should PUT and return a success update message', () => {
    const updatedProduct: Product = {
      name: faker.commerce.productName(),
      price: faker.number.int(),
    };
    const productId = faker.string.numeric();
    const successResponse = { message: 'Product updated successfully' };

    service.updateProduct(productId, updatedProduct).subscribe((response) => {
      expect(response).toEqual(successResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products/${productId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(successResponse);
  });

  it('should DELETE the product and return a success message', () => {
    const productId = faker.string.numeric();
    const successResponse = { message: 'Product deleted successfully' };

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toEqual(successResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products/${productId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(successResponse);
  });
});
