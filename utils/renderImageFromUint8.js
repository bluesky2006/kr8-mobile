import { Buffer } from "buffer";
import { Image } from "react-native";

export function renderImageFromUint8(imageData, opts = {}) {
  if (!imageData) return null;

  // New server format: { mime, base64 }
  if (typeof imageData === "object" && imageData.base64) {
    const mime = imageData.mime || "image/jpeg";
    const uri = `data:${mime};base64,${imageData.base64}`;

    return (
      <Image
        source={{ uri }}
        className={opts.className ?? "w-full h-full"}
        resizeMode={opts.resizeMode ?? "cover"}
        accessibilityLabel="Track artwork"
      />
    );
  }

  // Legacy format: bytes (Uint8Array or {0:...,1:...})
  const bytes =
    imageData instanceof Uint8Array ? imageData : new Uint8Array(Object.values(imageData));

  const base64 = Buffer.from(bytes).toString("base64");
  const uri = `data:image/jpeg;base64,${base64}`;

  return (
    <Image
      source={{ uri }}
      className={opts.className ?? "w-full h-full"}
      resizeMode={opts.resizeMode ?? "cover"}
      accessibilityLabel="Track artwork"
    />
  );
}
