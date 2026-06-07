export interface OnekoSkin {
  name: string;
  variant: string;
  gifPath: string;
  cursorEmoji: string;
}

export const onekoSkins: OnekoSkin[] = [
  { name: "Classic", variant: "classic", gifPath: "/oneko/oneko-classic.gif", cursorEmoji: "🐱" },
  { name: "Dog", variant: "dog", gifPath: "/oneko/oneko-dog.gif", cursorEmoji: "🐶" },
  { name: "Tora", variant: "tora", gifPath: "/oneko/oneko-tora.gif", cursorEmoji: "🐯" },
  { name: "Maia", variant: "maia", gifPath: "/oneko/oneko-maia.gif", cursorEmoji: "🐈" },
  { name: "Vaporwave", variant: "vaporwave", gifPath: "/oneko/oneko-vaporwave.gif", cursorEmoji: "🌊" },
  { name: "RamxCodes", variant: "ramxcodes", gifPath: "/oneko/oneko-ramxcodes.gif", cursorEmoji: "💻" },
];
