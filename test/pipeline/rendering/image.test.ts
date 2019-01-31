import { PngImage } from "../../../src";
import { resolve } from "path";

test("create image", () =>
{
    const png = new PngImage({ width: 5, height: 5 });
    png.Write({ x: 0, y: 0, color: { r: 0, g: 160, b: 233, a: 1.0 } });
    png.Write({ x: 0, y: 1, color: { r: 0, g: 160, b: 233, a: 0.7 } });
    png.Save(resolve(__dirname, "../../../out/out.png"));
});