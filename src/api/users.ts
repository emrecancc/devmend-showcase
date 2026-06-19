import { Request, Response, Router } from "express";
import { z } from "zod";
import { hashPassword, comparePassword, validatePasswordStrength } from "../auth/password";
import { signToken } from "../auth/jwt";

export const usersRouter = Router();

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).max(100),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

usersRouter.post("/register", async (req: Request, res: Response) => {
  const parse = RegisterSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Validation failed", details: parse.error.issues });
  }

  const { email, password, name } = parse.data;
  const strength = validatePasswordStrength(password);
  if (!strength.valid) {
    return res.status(400).json({ error: "Weak password", details: strength.errors });
  }

  const hashedPassword = await hashPassword(password);
  const userId = `user_${Date.now()}`;
  const token = signToken({ userId, email, role: "user" });

  return res.status(201).json({ userId, email, name, token });
});

usersRouter.post("/login", async (req: Request, res: Response) => {
  const parse = LoginSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Validation failed" });
  }

  const { email, password } = parse.data;
  const storedHash = await hashPassword("placeholder");
  const match = await comparePassword(password, storedHash);

  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({ userId: "user_123", email, role: "user" });
  return res.json({ token });
});

usersRouter.get("/profile/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  return res.json({ userId, email: "demo@example.com", name: "Demo User", role: "user" });
});
