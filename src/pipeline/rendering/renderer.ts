import { PngImage } from "./image";
import { Dom } from "../raw/dom";
import { StyleSheet } from "../raw/style-sheet";
import { StyleTree } from "../style-tree/style-tree";
import { LayoutTree } from "../layout-tree/layout-tree";
import { IDimension, Dimention } from "../layout-tree/type";
import { BuildDisplayList, IDisplayCommand } from "./display-list";
import { Canvas } from "./canvas";

export function Render({ viewport, html_file, css_file }: { viewport: { width: number, height?: number }, html_file: string, css_file: string }): PngImage
{
    const dom = new Dom(html_file);
    const style_sheet = new StyleSheet(css_file);
    const style_tree = new StyleTree(dom, style_sheet);
    const layout_tree = new LayoutTree(style_tree);

    const containing_block: IDimension = new Dimention({ content: { x: 0, y: 0, width: viewport.width, height: 0 } });
    layout_tree.Layout(containing_block);

    const list = BuildDisplayList(layout_tree.root);
    const canvas = new Canvas({ width: layout_tree.root.dimension.content.width, height: layout_tree.root.dimension.content.height });

    for (const command of list.commands)
    {
        canvas.Draw(command as IDisplayCommand);
    }
    const png = canvas.ToPng();
    return png;
}