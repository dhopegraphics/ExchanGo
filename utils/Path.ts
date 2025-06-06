import { parse } from "react-native-redash";

export const getPathXCenter = (currentPath: string) => {
  const parsed = parse(currentPath);
  if (!parsed || !parsed.curves || parsed.curves.length === 0) return 0;
  const curves = parsed.curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};

export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
  if (
    !tabPaths ||
    !tabPaths[index] ||
    !tabPaths[index].curves ||
    tabPaths[index].curves.length === 0
  ) {
    return (index + 0.5) * (1 / (tabPaths?.length || 4)); // fallback: center of tab
  }
  const curves = tabPaths[index].curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};
