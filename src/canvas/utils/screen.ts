export interface WidthProps {
  width: number;
  height?: number;
}

export interface HeightProps {
  width?: number;
  height: number;
}

export const getResolution = ({
  width,
  height,
}: WidthProps | HeightProps): { height: number; width: number } => {
  const getHeight = (width: number) => width * (9 / 16);
  const getWidth = (height: number) => height / (9 / 16);

  return width
    ? { width, height: getHeight(width) }
    : { height: height as number, width: getWidth(height as number) };
};
