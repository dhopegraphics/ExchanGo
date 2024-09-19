import { useMemo } from "react";
import { curveBasis, line } from "d3-shape";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN_WIDTH } from "../constants/Screen";
import { parse } from "react-native-redash";

type GenerateTabShapePath = (
  position: number,
  adjustedHeight: number
) => string;

const NUM_TABS = 4;
const SCALE = 0.7;
const TAB_BAR_HEIGHT = 64;
