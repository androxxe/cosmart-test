export const generateCover = (cover_id: number | string, size: "S" | "M" | "L" = "L") => {
  return `https://covers.openlibrary.org/b/id/${cover_id}-${size}.jpg`;
};
