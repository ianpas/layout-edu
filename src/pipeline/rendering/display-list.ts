import { IRectangle } from "../layout-tree/type";
import { ILayoutNode, LayoutTree } from "../layout-tree/layout-tree";

export interface IDisplayList
{
    commands: Array<IDisplayCommand>;
}

export type CommandType = "solid_color";

export interface IDisplayCommand
{
    type: CommandType;
    color?: string;
    rect?: IRectangle;
}

function RenderBackground(list: IDisplayList, node: ILayoutNode)
{
    const color = node.style.value("background-color");

    if (color)
    {
        list.commands.push({
            type: "solid_color",
            color,
            rect: node.dimension.BorderBox()
        });
    }
}

function RenderLayoutNode(list: IDisplayList, node: ILayoutNode)
{
    RenderBackground(list, node);
    // RenderBorders ...
    // RenderText ...

    for (const child of node.children)
    {
        RenderLayoutNode(list, child);
    }
}

export function BuildDisplayList(root: ILayoutNode): IDisplayList
{
    const list: IDisplayList = { commands: [] };
    RenderLayoutNode(list, root);
    return list;
}