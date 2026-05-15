import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(10, 20, 47) 0%, rgb(20, 43, 90) 50%, rgb(217, 119, 6) 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900 }}>
          <div style={{ fontSize: 34, letterSpacing: "0.18em", opacity: 0.8, textTransform: "uppercase" }}>
            {site.legalName}
          </div>
          <div style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.2 }}>
            Franchises internationales, retail premium et développement de marques en Mauritanie et au Sénégal
          </div>
        </div>
      </div>
    ),
    size,
  );
}
