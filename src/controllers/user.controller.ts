import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadProfilePicture } from "../services/upload.service";
import { AuthRequest } from "../middleware/auth.middleware";

const prisma = new PrismaClient();

export async function uploadProfilePhoto(req: AuthRequest, res: Response) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ error: "Utente non autenticato" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Nessun file caricato" });
    }

    const url = await uploadProfilePicture(req.file, req.user.id);

    await prisma.users.update({
      where: { id: req.user.id },
      data: { profile_picture_url: url },
    });

    res.json({
      message: "Foto profilo aggiornata",
      profilePictureUrl: url,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Errore durante l'upload", details: error.message });
  }
}
