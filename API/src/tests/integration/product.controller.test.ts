import request from "supertest";
import { app } from "../../app";
import { faker } from "@faker-js/faker";

describe("Products Controller", () => {
  it("should create a new product", async () => {
    const newProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price({ min: 1, max: 20000 })),
      description: faker.lorem.sentences(2),
    };
    const res = await request(app).post("/api/products").send(newProduct);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Product created successfully");
  });

  it("should update the product", async () => {
    const newProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price({ min: 1, max: 20000 })),
      description: faker.lorem.sentences(2),
    };
    await request(app).post("/api/products").send(newProduct);
    const res = await request(app).get(`/api/products/${newProduct.name}`);

    const updatedProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price({ min: 1, max: 20000 })),
      description: faker.lorem.sentences(3),
    };
    const originalProduct = await request(app).get(
      `/api/products/${res.body.name}`
    );
    const updateResponse = await request(app)
      .put(`/api/products/${originalProduct.body.id}`)
      .send(updatedProduct);
    expect(updateResponse.statusCode).toEqual(200);
    expect(updateResponse.body).toHaveProperty(
      "message",
      "Product updated successfully"
    );
  });

  it("should return all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should return a product by name", async () => {
    const newProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price({ min: 1, max: 20000 })),
      description: faker.lorem.sentences(2),
    };
    await request(app).post("/api/products").send(newProduct);
    const res = await request(app).get(`/api/products/${newProduct.name}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", newProduct.name);
  });

  it("should return 404 for a non-existing product", async () => {
    const res = await request(app).get("/api/products/9999");
    expect(res.statusCode).toEqual(404);
  });

  it("should delete the product", async () => {
    const newProduct = {
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price({ min: 1, max: 20000 })),
      description: faker.lorem.sentences(2),
    };
    await request(app).post("/api/products").send(newProduct);
    const originalProduct = await request(app).get(
      `/api/products/${newProduct.name}`
    );
    const res = await request(app).delete(
      `/api/products/${originalProduct.body.id}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Product deleted successfully");
  });
});
