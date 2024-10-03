import request from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import User from "../../src/models/tempUserModel";
import bcrypt from 'bcrypt';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/testdb");
});

// clean up before each test
beforeEach(async () => {
    await User.deleteMany({});
});

// Clean up after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("AuthController", () => {
  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
        const uniqueEmail = `emii${Date.now()}@em.se`
      // Create a user directly in the test database
      const user = new User({
        name: "emii",
        email: uniqueEmail,
        password: await bcrypt.hash("123456", 10),
        roles: ["user"],
      });
      await user.save();

      // Test login
      const response = await request(app).post("/api/auth/login").send({
        email: uniqueEmail,
        password: "123456",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("email", uniqueEmail);
    });

    it("should return 401 for invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "emi@em.se",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });
  });

  describe("POST /api/auth/user", () => {
    it("should register a new user with roles as an array", async () => {
      const response = await request(app)
        .post("/api/auth/user")
        .send({
          name: "New user",
          email: "newuser@example.se",
          password: "newpassword123",
          roles: ["user"],
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.email).toBe("newuser@example.se");

      // Check if the user is saved in the database
      const savedUser = await User.findOne({ email: "newuser@example.se" });
      expect(savedUser).not.toBeNull();
      expect(savedUser?.roles).toEqual(["user"]);
    });

    it("should return 400 if user already exists", async () => {
      // Create a user directly in the test database
      const existingUser = new User({
        name: "Existing user",
        email: "existinguser@example.se",
        password: await bcrypt.hash("existingpassword123", 10),
        roles: ["user"],
      });
      await existingUser.save();

      // Try to register the same user again
      const response = await request(app)
        .post("/api/auth/user")
        .send({
          name: "Existing user",
          email: "existinguser@example.se",
          password: "existingpassword123",
          roles: ["user"],
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User with this email does already exist.");
    });

    it("should return 400 for invalid role", async () => {
      const response = await request(app)
        .post("/api/auth/user")
        .send({
          name: "New user",
          email: "newuser@example.se",
          password: "newpassword123",
          roles: ["invalidRole"],
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid role");
    });
  });
});
