import { execSync } from "node:child_process";
import request from "supertest";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("Meals routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(() => {
    execSync("npm run migrate:rollback --all");
    execSync("npm run migrate:latest");
  });

  it("should be able to create meal", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meal = {
      name: `Meal 1`,
      description: `Test meal number 1`,
      meal_time: new Date().toISOString(),
      is_on_diet: false,
    };

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies)
      .send(meal)
      .expect(204);
  });

  it("should be able to list meals", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meal = {
      name: `Meal 1`,
      description: `Test meal number 1`,
      meal_time: new Date().toISOString(),
      is_on_diet: false,
    };

    await request(app.server).post("/meals").set("Cookie", cookies).send(meal);

    const mealsResp = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies);

    expect(mealsResp.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: `Meal 1`,
          description: `Test meal number 1`,
          meal_time: expect.any(String),
          is_on_diet: false,
        }),
      ])
    );
  });

  it("should be able to get specific meal", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meal = {
      name: `Meal 1`,
      description: `Test meal number 1`,
      meal_time: new Date().toISOString(),
      is_on_diet: false,
    };

    await request(app.server).post("/meals").set("Cookie", cookies).send(meal);

    const mealsResp = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies);

    const mealId = mealsResp.body[0].id;

    const mealResp = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", cookies);

    expect(mealResp.body).toEqual(
      expect.objectContaining({
        id: mealId,
        name: `Meal 1`,
        description: `Test meal number 1`,
        meal_time: expect.any(String),
        is_on_diet: false,
      })
    );
  });

  it("should be able to update specific meal", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meal = {
      name: `Meal 1`,
      description: `Test meal number 1`,
      meal_time: new Date().toISOString(),
      is_on_diet: false,
    };

    await request(app.server).post("/meals").set("Cookie", cookies).send(meal);

    const mealsResp = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies);

    const mealId = mealsResp.body[0].id;

    const updatedMeal = {
      name: `Meal 1 Updated`,
      description: `Test meal number 1 updated`,
      meal_time: new Date().toISOString(),
      is_on_diet: true,
    };

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set("Cookie", cookies)
      .send(updatedMeal);

    const mealResp = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", cookies);

    expect(mealResp.body).toEqual(
      expect.objectContaining({
        id: mealId,
        name: `Meal 1 Updated`,
        description: `Test meal number 1 updated`,
        meal_time: expect.any(String),
        is_on_diet: true,
      })
    );
  });

  it("should be able to delete specific meal", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meal = {
      name: `Meal 1`,
      description: `Test meal number 1`,
      meal_time: new Date().toISOString(),
      is_on_diet: false,
    };

    await request(app.server).post("/meals").set("Cookie", cookies).send(meal);

    const mealsResp = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies);

    const mealId = mealsResp.body[0].id;

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set("Cookie", cookies)
      .expect(204);
  });
});
