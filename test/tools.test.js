import { expect } from "chai";
import { test } from "mocha";
import request from "supertest";
import app from "../app.js";

import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
import Tool from "../src/models/Tool.js";

describe("CRUD Tools", function () {
  this.timeout(5000);

  before(async () => {
    // Crear un usuario administrador
    await User.deleteMany();

    const hash = await bcrypt.hash("abc.123-", 10);

    const user = {
      name: "Admin",
      email: "admin@test.com",
      password: hash,
      admin: true,
    };

    await User.create(user);
  });

  test("deberia traer un array de herramientas", async () => {
    const response = await request(app).get("/api/tools");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  test("el Admin deberia poder crear una herramienta", async () => {
    await Tool.deleteMany();

    const responseLogin = await request(app).post("/api/auth/login").send({
      email: "admin@test.com",
      password: "abc.123-",
    });

    const token = responseLogin.body.token;

    const tool = {
      name: "Una herramienta",
      description: "Descripción de prueba",
      category: "Productividad",
      pricing: "Freemium",
      website: "https://example.com",
      image: "https://picsum.photos/200",
      rating: 4.5,
      featured: false,
    };

    const response = await request(app)
      .post("/api/tools")
      .send(tool)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name");
    expect(response.body.name).to.equal("Una herramienta");
  });
});