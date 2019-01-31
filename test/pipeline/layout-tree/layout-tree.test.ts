import { Dom, StyleSheet, StyleTree, StyleNode, LayoutTree, LayoutNode, IDimension, Dimention, Rectangle, EdgeSize } from "../../../src";
import { resolve } from "path";
import { readFileSync } from "fs";

const dom = new Dom(readFileSync(resolve(__dirname, "../../common/html/basic.html"), "utf8"));
const style_sheet = new StyleSheet(readFileSync(resolve(__dirname, "../../common/css/basic.css"), "utf8"));

test("build layout tree", () =>
{
    const style_tree = new StyleTree(dom, style_sheet);
    const layout_tree = new LayoutTree(style_tree);
    expect(layout_tree.ToJson()).toEqual({ "children": [{ "children": [], "dimension": { "border": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "content": { "height": 0, "width": 0, "x": 0, "y": 0 }, "margin": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "padding": { "bottom": 0, "left": 0, "right": 0, "top": 0 } }, "type": "block" }, { "children": [], "dimension": { "border": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "content": { "height": 0, "width": 0, "x": 0, "y": 0 }, "margin": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "padding": { "bottom": 0, "left": 0, "right": 0, "top": 0 } }, "type": "block" }], "dimension": { "border": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "content": { "height": 0, "width": 0, "x": 0, "y": 0 }, "margin": { "bottom": 0, "left": 0, "right": 0, "top": 0 }, "padding": { "bottom": 0, "left": 0, "right": 0, "top": 0 } }, "type": "block" });

});

test("calculate block width", () =>
{
    const containing_block: IDimension = new Dimention({
        content: { x: 0, y: 0, width: 500, height: 150 },
    });

    const style_props = { "padding": "12px" };
    const node = new LayoutNode({ style: new StyleNode({ props: style_props }) });
    node.CalculateBlockWidth(containing_block);
    expect(node.dimension).toEqual(new Dimention({
        content: { x: 0, y: 0, width: 476, height: 0 },
        padding: { left: 12, right: 12, top: 0, bottom: 0 }, // calculate width only, top and bottom are not set
    }));
});

test("calculate block position", () =>
{
    const containing_block: IDimension = new Dimention({ content: { x: 0, y: 0, width: 500, height: 0 } });

    const style_props = { "padding": "12px", "margin-top": "6px" };
    const node = new LayoutNode({ style: new StyleNode({ props: style_props }) });
    node.CalculateBlockPosition(containing_block);
    expect(node.dimension).toEqual(new Dimention({
        content: { x: 0, y: 18, width: 0, height: 0 },
        padding: { left: 0, right: 0, top: 12, bottom: 12 }, // calculate width only, top and bottom are not set
        margin: { left: 0, right: 0, top: 6, bottom: 0 }
    }));
});


/** see layout-node.html */
test("layout node", () =>
{
    const containing_block: IDimension = new Dimention({ content: { x: 0, y: 0, width: 500, height: 0 } });
    const style_a = { "padding": "12px", "margin-top": "6px", "margin-left": "3px", "height": "75px" };
    const style_b = { "padding": "18px", "margin-bottom": "5px", "margin-right": "4px", "height": "35px" };

    const container = new LayoutNode();
    const div_a = new LayoutNode({ style: new StyleNode({ props: style_a }) })
    const div_b = new LayoutNode({ style: new StyleNode({ props: style_b }) })

    container.children.push(div_a);
    container.children.push(div_b);

    //
    container.Layout(containing_block);

    expect(container.dimension.Origin()).toEqual({ x: 0, y: 0 });
    expect(container.dimension).toEqual(new Dimention({
        content: new Rectangle({ x: 0, y: 0, width: 500, height: 181 })
    }));

    expect(div_a.dimension.Origin()).toEqual({ x: 0, y: 0 });
    expect(div_a.dimension).toEqual(new Dimention({
        content: new Rectangle({ x: 15, y: 18, width: 473, height: 75 }),
        padding: new EdgeSize({ left: 12, right: 12, top: 12, bottom: 12 }),
        margin: new EdgeSize({ left: 3, top: 6 })
    }));

    expect(div_b.dimension.Origin()).toEqual({ x: 0, y: 105 });
    expect(div_b.dimension).toEqual(new Dimention({
        content: new Rectangle({ x: 18, y: 123, width: 460, height: 35 }),
        padding: new EdgeSize({ left: 18, right: 18, top: 18, bottom: 18 }),
        margin: new EdgeSize({ right: 4, bottom: 5 })
    }));
});