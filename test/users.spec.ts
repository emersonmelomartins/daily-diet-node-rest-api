import { execSync } from "node:child_process";
import request from "supertest";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("Users routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(() => {
    execSync("npm run migrate:rollback --all");
    execSync("npm run migrate:latest");
  });

  it("should be able to create user", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user).expect(204);
  });

  it("should be able to login user", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    await request(app.server)
      .post("/users/login")
      .send({ email: user.email })
      .expect(204);
  });

  it("should be able to return metrics countings", async () => {
    const user = {
      email: "test.user@email.com",
      name: "Test User",
    };

    await request(app.server).post("/users").send(user);

    const loginResp = await request(app.server)
      .post("/users/login")
      .send({ email: user.email });

    const cookies = loginResp.get("Set-Cookie") ?? [];

    const meals = Array.from({ length: 4 }, (_, i) => {
      const is_on_diet = i === 0 || i === 1 || i === 3;
      return {
        name: `Meal ${i}`,
        description: `Test meal number ${i}`,
        meal_time: new Date().toISOString(),
        is_on_diet,
      };
    });

    for await (const meal of meals) {
      await request(app.server)
        .post("/meals")
        .set("Cookie", cookies)
        .send(meal);
    }

    const metricsResp = await request(app.server)
      .get("/users/metrics")
      .set("Cookie", cookies);

    expect(metricsResp.body).toEqual({
      totalMeals: 4,
      totalMealsOnDiet: 3,
      totalMealsNotOnDiet: 1,
      bestSequencialStreak: 2,
    });
  });
});
