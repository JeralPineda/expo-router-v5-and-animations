// Semilla fija para generar datos consistentes
let seed = 22;
function seededRandom() {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Función para obtener un número entero entre min y max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

// Función para generar un UUID simple
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(seededRandom() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Lista de usuarios posibles
const users = [
  { name: "John", score: 12 },
  { name: "Jane", score: 22 },
  { name: "Bob", score: 4 },
  { name: "Alice", score: 15 },
  { name: "Mark", score: 33 },
  { name: "Lily", score: 10 },
  { name: "Liam", score: 31 },
];

// Función para elegir un nombre aleatorio de los usuarios
const getRandomName = () => {
  const index = randomInt(0, users.length - 1);
  return users[index].name;
};

// Generar una URL aleatoria de Picsum
const getRandomImageUrl = (
  width: number,
  height: number,
  blur: number = 0
): string => {
  const id = randomInt(1, 1000);
  const blurParam = blur > 0 ? `&blur=${blur}` : "";
  return `https://picsum.photos/id/${id}/${width}/${height}?${blurParam}`;
};

export const generateFakeHome = () => ({
  key: generateUUID(),
  name: getRandomName(),
  image: getRandomImageUrl(80, 80),
});

export const generateHomes = () => {
  return [...Array(randomInt(1, 5)).keys()].map(() => generateFakeHome());
};

export type HomeType = ReturnType<typeof generateFakeHome>;
