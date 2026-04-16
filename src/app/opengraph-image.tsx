import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt =
  "Liberty English Cream Golden Retrievers - Put a Little Love in Your Life";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "images", "logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #FFFBF8 0%, #F4ECE4 50%, #FFFBF8 100%)",
          position: "relative",
        }}
      >
        {/* Decorative top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #A36F40, #C8956A, #A36F40)",
            display: "flex",
          }}
        />

        {/* Decorative bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #A36F40, #C8956A, #A36F40)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
            padding: "40px 80px",
          }}
        >
          {/* Logo */}
          <img
            src={logoBase64}
            width={280}
            height={280}
            style={{ borderRadius: "50%" }}
          />

          {/* Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#1A1105",
                lineHeight: 1.1,
                marginBottom: "8px",
                display: "flex",
              }}
            >
              Liberty
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: "#A36F40",
                letterSpacing: "3px",
                textTransform: "uppercase",
                marginBottom: "20px",
                display: "flex",
              }}
            >
              English Cream Golden Retrievers
            </div>

            {/* Divider */}
            <div
              style={{
                width: "100px",
                height: "3px",
                background:
                  "linear-gradient(90deg, #A36F40, transparent)",
                marginBottom: "20px",
                display: "flex",
              }}
            />

            {/* Tagline */}
            <div
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: "#7A6355",
                fontStyle: "italic",
                marginBottom: "24px",
                display: "flex",
              }}
            >
              Put a Little Love in Your Life
            </div>

            {/* Details */}
            <div
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "center",
                fontSize: "18px",
                color: "#A36F40",
                fontWeight: 600,
              }}
            >
              <span style={{ display: "flex" }}>Knox, Indiana</span>
              <span style={{ display: "flex", opacity: 0.4 }}>|</span>
              <span style={{ display: "flex" }}>OFA Health Tested</span>
              <span style={{ display: "flex", opacity: 0.4 }}>|</span>
              <span style={{ display: "flex" }}>Champion Lines</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
