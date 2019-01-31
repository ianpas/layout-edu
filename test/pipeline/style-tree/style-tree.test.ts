import { Dom, StyleSheet, StyleTree, IStyleNode } from "../../../src";
import { resolve } from "path";
import { readFileSync } from "fs";

const dom = new Dom(readFileSync(resolve(__dirname, "../../common/html/basic.html"), "utf8"));
const style_sheet = new StyleSheet(readFileSync(resolve(__dirname, "../../common/css/basic.css"), "utf8"));

test("build style tree", () =>
{
    const style_tree = new StyleTree(dom, style_sheet);
    expect(style_tree.ToJson()).toEqual({ "children": [{ "children": [], "node": "h1", "props": { "color": "#cc0000", "margin": "auto", "margin-bottom": "20px", "padding": "20px" } }, { "children": [], "node": "div", "props": { "display": "none", "margin-bottom": "20px", "padding": "20px" } }], "node": "body", "props": {} });
});

test("traverse style tree", () =>
{
    const callback = (node: IStyleNode) => { console.log(JSON.stringify(node.props, null, 4)); };
    const style_tree = new StyleTree(dom, style_sheet);
    style_tree.Traverse(callback);
})