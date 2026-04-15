import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Admin-uploaded photos (persistent volume)
const UPLOAD_DIR =
  process.env.NODE_ENV === "production"
    ? "/app/data/photos"
    : path.join(process.cwd(), "data", "photos");

// Original images baked into the Docker image
const STATIC_DIR =
  process.env.NODE_ENV === "production"
    ? "/app/public/images/dogs"
    : path.join(process.cwd(), "public", "images", "dogs");

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Prevent path traversal
  const safe = path.basename(filename);

  // Check admin upload dir first, then fall back to static baked-in images
  const candidates = [
    path.join(UPLOAD_DIR, safe),
    path.join(STATIC_DIR, safe),
  ];

  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const ext = path.extname(safe).toLowerCase();
      const contentType = MIME[ext] || "application/octet-stream";
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  return new NextResponse("Not found", { status: 404 });
}
