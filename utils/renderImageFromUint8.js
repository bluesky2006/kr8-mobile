import { Buffer } from "buffer";
import { Image } from "react-native";

export function renderImageFromUint8(imageData) {
  if (!imageData) return null;

  const bytes =
    imageData instanceof Uint8Array ? imageData : new Uint8Array(Object.values(imageData));

  const base64 = Buffer.from(bytes).toString("base64");
  const uri = `data:image/jpeg;base64,${base64}`;

  return (
    <Image
      source={{ uri }}
      className="w-full h-full"
      resizeMode="cover"
      accessibilityLabel="Track artwork"
    />
  );
}
