import { IColor } from "../../common/type";
import { PNG } from "pngjs";
import { writeFileSync } from "fs";

export type ICallback = ({ x, y }: { x: number, y: number }) => void;

export class PngImage
{
    private m_Image: PNG;

    public constructor({ width = 0, height = 0, buffer = null }: { width?: number, height?: number, buffer?: Buffer } = {})
    {
        if (!buffer)
        {
            this.m_Image = new PNG({ width, height });
        }
        else
        {
            this.m_Image = PNG.sync.read(buffer);
        }
    }

    public Write({ x, y, color }: { x: number, y: number, color: IColor })
    {
        const index = (this.m_Image.width * y + x) * 4;

        this.m_Image.data[index] = color.r;
        this.m_Image.data[index + 1] = color.g;
        this.m_Image.data[index + 2] = color.b;
        this.m_Image.data[index + 3] = color.a * 255;
    }

    public Read({ x, y }: { x: number, y: number }): IColor
    {
        const index = (this.m_Image.width * y + x) * 4;

        return {
            r: this.m_Image.data[index],
            g: this.m_Image.data[index + 1],
            b: this.m_Image.data[index + 2],
            a: this.m_Image.data[index + 3] / 255
        }
    }

    public Save(path: string)
    {
        const buffer = PNG.sync.write(this.m_Image);
        writeFileSync(path, buffer);
    }

    get width()
    {
        return this.m_Image.width;
    }

    get height()
    {
        return this.m_Image.height;
    }
}