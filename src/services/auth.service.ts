import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET non definito in .env");

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3).optional(),
  fullName: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  danceStyles: z.array(z.string()).optional(),
  skillLevel: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(data: unknown) {
  const validated = registerSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existingUser) {
    throw new Error("Email già registrata");
  }

  const passwordHash = await bcrypt.hash(validated.password, 10);

  const user = await prisma.user.create({
    data: {
      email: validated.email,
      passwordHash,
      username: validated.username,
      fullName: validated.fullName,
      birthDate: validated.birthDate ? new Date(validated.birthDate) : null,
      gender: validated.gender,
      city: validated.city,
      danceStyles: validated.danceStyles || [],
      skillLevel: validated.skillLevel,
      isActive: true,
    },
  });

  return { user: { id: user.id, email: user.email, username: user.username } };
}

export async function loginUser(data: unknown) {
  const { email, password } = loginSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    throw new Error("Credenziali non valide");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error("Credenziali non valide");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.isOrganizer ? "organizer" : "user",
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      isTeacher: user.isTeacher,
      isOrganizer: user.isOrganizer,
    },
  };
}

export async function getCurrentUser(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      username: true,
      fullName: true,
      danceStyles: true,
      skillLevel: true,
      isTeacher: true,
      isOrganizer: true,
      city: true,
      createdAt: true,
    },
  });

  if (!user) throw new Error("Utente non trovato");

  return user;
}
