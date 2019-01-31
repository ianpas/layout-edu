import { IDisplayCommand } from "./display-list";
import { IColor } from "../../common/type";
import { ToColor } from "../../common/utility";
import { PngImage } from "./image";


export interface ICanvas
{
    pixels: Array<Array<IColor>>;
    width: number;
    height: number;
}

export class Canvas implements ICanvas
{
    public pixels: Array<Array<IColor>>;
    public width: number;
    public height: number;

    public constructor({ width = 0, height = 0 }: { width?: number, height?: number } = {})
    {
        this.width = width;
        this.height = height;
        this.pixels = Array.from({ length: this.height }, () => Array.from({ length: this.width }, () => ({ r: 255, g: 255, b: 255, a: 1.0 })));
    }

    public Draw(command: IDisplayCommand)
    {
        if (command.type === "solid_color")
        {
            const color = ToColor(command.color);
            const { x, y, width, height } = command.rect;

            for (let j = y; j < y + height; ++j)
            {
                for (let i = x; i < x + width; ++i)
                {
                    const pixel = this.pixels[j][i];

                    pixel.r = color.r * color.a + (1 - color.a) * pixel.r;
                    pixel.g = color.g * color.a + (1 - color.a) * pixel.g;
                    pixel.b = color.b * color.a + (1 - color.a) * pixel.b;
                    pixel.a = 1.0;
                }
            }
        }
    }

    public ToPng(): PngImage
    {
        const png = new PngImage({ width: this.width, height: this.height });

        for (let y = 0; y < this.height; ++y)
        {
            for (let x = 0; x < this.width; ++x)
            {
                png.Write({ x, y, color: this.pixels[y][x] });
            }
        }

        return png;
    }
}