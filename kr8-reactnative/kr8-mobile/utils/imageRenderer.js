// utils/imageRenderer.js
import { Buffer } from "buffer";
import { Image } from "react-native";

export function renderImageFromUint8(imageData) {
  if (!imageData) return null;

  const arr = Object.values(imageData);
  let bytes = new Uint8Array(arr);

  const base64 = Buffer.from(bytes).toString("base64");
  const uri = `data:image/jpeg;base64,${base64}`;

  return (
    <Image
      source={{ uri }}
      style={{ width: "100%", aspectRatio: 1, borderRadius: 2 }}
      resizeMode="cover"
      accessibilityLabel="Track artwork"
    />
  );
}
