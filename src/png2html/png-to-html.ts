import { PngImage } from "../pipeline/rendering/image";
import { IColor } from "../common/type";

interface IPos
{
    x: number;
    y: number;
}

function PosToClassName(pos: IPos)
{
    return `x${pos.x}y${pos.y}`;
}

function ToHtml(pos: IPos)
{
    return `<div class="${PosToClassName(pos)}"></div>`
}

function PosToCss(pos: IPos)
{
    return `margin-top:${PosToMarginTop(pos)}px;margin-left:${pos.x}px;`;
}

function ColorToCss(color: IColor)
{
    return `background-color:rgba(${color.r},${color.g},${color.b},${color.a});width:1px;height:1px;`;
}

function ToCss(pos: IPos, color: IColor)
{
    return `.${PosToClassName(pos)}{${PosToCss(pos)}${ColorToCss(color)}}`;
}

function HtmlWrapper(html: string)
{
    return `<!doctype html><html><head><link href="./index.css" rel="stylesheet"></head><body>${html}</body></html>`;
}

function PosToMarginTop(pos: IPos)
{
    return pos.x === 0 ? 0 : -1;
}

export interface IPngInHtml
{
    html_file: string;
    css_file: string;
}

export function PngToHtml(png: PngImage)
{
    const html = [];
    const css = [];

    for (let y = 0; y < png.height; ++y)
    {
        for (let x = 0; x < png.width; ++x)
        {
            const pos = { x, y };
            const color = png.Read(pos);

            html.push(ToHtml(pos));
            css.push(ToCss(pos, color));
        }
    }


    return { html_file: HtmlWrapper(html.join("")), css_file: css.join("") };
}