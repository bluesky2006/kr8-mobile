// utils/renderImageFromUint8.js
import { Buffer } from "buffer";
import { Image } from "react-native";

/**
 * Renders an Image from Uint8-like data.
 * Accepts extra props (e.g. className, resizeMode) for NativeWind styling.
 */
export function renderImageFromUint8(imageData, props = {}) {
  if (!imageData) return null;

  // Support objects like {0:...,1:...} or Uint8Array directly
  const bytes =
    imageData instanceof Uint8Array ? imageData : new Uint8Array(Object.values(imageData));

  const base64 = Buffer.from(bytes).toString("base64");
  const uri = `data:image/jpeg;base64,${base64}`;

  return (
    <Image
      source={{ uri }}
      // Default to square, full-bleed; override with props if needed
      className="w-full h-full"
      resizeMode="cover"
      accessibilityLabel="Track artwork"
      {...props}
    />
  );
}
