import { ISelector, IColor } from "./type";
import * as Tokenizer from "css-selector-tokenizer";
import * as Color from "color";

export function Clamp(value: number): number
{
    if (value > 255) return 255;
    if (value < 0) return 0;
    return value;
}

export function ToColor(str_color: string): IColor
{
    const color = Color(str_color).object();

    return { a: color.alpha || 1.0, r: color.r, g: color.g, b: color.b };
}

export function MatchSelector(e: HTMLElement, selector: string): boolean
{
    const __selector = Selector(selector);

    if (__selector.nodes.some(s => s.type === "element" && e.tagName !== s.name.toUpperCase()))
    {
        return false;
    }

    if (__selector.nodes.some(s => s.type === "id" && e.id !== s.name))
    {
        return false;
    }

    if (__selector.nodes.some(s => s.type === "class" && e.className !== s.name))
    {
        return false;
    }

    return true;
}

export function Specificity(selector: string): number
{
    const __selector = Selector(selector);

    let specificity = 0;
    __selector.nodes.forEach(node =>
    {
        switch (node.type)
        {
            case "id":
                specificity += 100;
                break;

            case "class":
                specificity += 10;
                break;

            case "element":
                specificity += 1;
                break;

            default:
                break;
        }
    });
    return specificity;
}

function Selector(str_selector: string): ISelector
{
    return Tokenizer.parse(str_selector).nodes[0];
}

