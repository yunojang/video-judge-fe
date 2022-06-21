export const getAlphaColor = (color: string, alpha: number) => {
  return color + Math.floor(alpha * 255).toString(16);
};
