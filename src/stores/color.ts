import { colors } from "quasar";

export const useColorStore = defineStore("color", () => {
  const brandColors = ["primary", "secondary", "accent", "dark", "positive", "negative", "info", "warning"];
  const colorList = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
  ];

  const colorShades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const allColors = brandColors.concat(colorList.flatMap((c) => [c].concat(colorShades.map((t) => `${c}-${t}`))));

  const paletteToHex = Object.fromEntries(allColors.map((c) => [c, colors.getPaletteColor(c)]));

  const hexToPalette = Object.fromEntries<string>(allColors.toReversed().map((c) => [colors.getPaletteColor(c), c]));

  const palette: string[] = allColors.map(colors.getPaletteColor);

  const paddedPalette = [...palette.slice(0, 8), ...new Array<string>(7), ...palette.slice(8)];

  const getPaletteColor: (color: string) => string = colors.getPaletteColor;

  const contrastBW = (color: string) => (colors.brightness(paletteToHex[color] ?? color) < 160 ? "white" : "black");

  return { palette: paddedPalette, paddedPalette: paddedPalette, hexToPalette, contrastBW, getPaletteColor };
});
