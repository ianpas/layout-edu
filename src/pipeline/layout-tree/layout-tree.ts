import { IDimension, Dimention } from "./type";
import { IStyleNode, StyleTree, StyleNode } from "../style-tree/style-tree";

export type IBoxType = "block" | "inline" | "anonymous";

export interface ILayoutNode
{
    type: IBoxType;
    dimension: IDimension;
    children: Array<ILayoutNode>;
    style?: IStyleNode;
    Layout(containing_block: IDimension): void;
}

export interface ILayoutNodeJson
{
    type: IBoxType;
    dimension: IDimension;
    children: Array<ILayoutNodeJson>;
}

export class LayoutNode implements ILayoutNode
{
    public type: IBoxType;
    public dimension: IDimension;
    public children: Array<ILayoutNode>;
    public style: IStyleNode;

    public constructor({ type = "block", dimension = new Dimention(), children = [], style = new StyleNode() }: { type?: IBoxType, dimension?: IDimension, children?: Array<ILayoutNode>, style?: IStyleNode } = {})
    {
        this.type = type;
        this.dimension = dimension;
        this.children = children;
        this.style = style;
    }

    public Layout(containing_block: IDimension)
    {
        if (this.type === "block")
        {
            this.LayoutBlock(containing_block);
        }
    }

    private LayoutBlock(containing_block: IDimension)
    {
        this.CalculateBlockWidth(containing_block);
        this.CalculateBlockPosition(containing_block);
        this.LayoutBlockChildren();
        this.CalculateBlockHeight();
    }

    private CalculateBlockHeight()
    {
        const specified_height = this.style.value("height");
        if (specified_height)
        {
            this.dimension.content.height = parseInt(specified_height);
        }
    }

    private LayoutBlockChildren()
    {
        const containing_block = this.dimension;
        for (const child of this.children)
        {
            child.Layout(containing_block);
            containing_block.content.height += child.dimension.MarginBox().height;
        }
    }

    public CalculateBlockWidth(containing_block: IDimension)
    {
        const style = this.style;
        const dimension = this.dimension;

        // margin
        dimension.margin.left = parseInt(style.lookup("margin-left", "margin", "0"));
        dimension.margin.right = parseInt(style.lookup("margin-right", "margin", "0"));

        // TODO: border

        // padding
        dimension.padding.left = parseInt(style.lookup("padding-left", "padding", "0"));
        dimension.padding.right = parseInt(style.lookup("padding-right", "padding", "0"));

        // content
        let width = 0;
        const specified_width = style.value("width");
        if (specified_width)
        {
            width = parseInt(specified_width);
        }
        else
        {
            const other = dimension.margin.left + dimension.margin.right
                + dimension.border.left + dimension.border.right
                + dimension.padding.left + dimension.padding.right;

            width = containing_block.content.width - other;
        }

        this.dimension.content.width = width;
    }

    public CalculateBlockPosition(containing_block: IDimension)
    {
        const style = this.style;
        const dimension = this.dimension;

        // margin
        dimension.margin.top = parseInt(style.lookup("margin-top", "margin", "0"));
        dimension.margin.bottom = parseInt(style.lookup("margin-bottom", "margin", "0"));

        // TODO: border

        // padding
        dimension.padding.top = parseInt(style.lookup("padding-top", "padding", "0"));
        dimension.padding.bottom = parseInt(style.lookup("padding-bottom", "padding", "0"));

        // content
        dimension.content.x = containing_block.content.x + dimension.margin.left + dimension.border.left + dimension.padding.left;
        dimension.content.y = containing_block.content.y + containing_block.content.height + dimension.margin.top + dimension.border.top + dimension.padding.top;
    }
}

export class LayoutTree
{
    private m_Root: ILayoutNode;

    public constructor(style_tree: StyleTree)
    {
        this.m_Root = new LayoutNode({ style: style_tree.root });
        this.BuildTree(style_tree.root, this.m_Root);
    }

    private BuildTree(style_node: IStyleNode, layout_node: ILayoutNode): ILayoutNode
    {
        layout_node.children = style_node.children.map(child => new LayoutNode({ style: child }));
        layout_node.children.forEach((child, i) =>
        {
            this.BuildTree(style_node.children[i], child);
        });
        return layout_node;
    }

    public ToJson(node = this.m_Root): ILayoutNodeJson
    {
        return { type: node.type, dimension: node.dimension, children: node.children.map(child => this.ToJson(child)) };
    }

    public Layout(containing_block: IDimension)
    {
        this.root.Layout(containing_block);
    }

    get root()
    {
        return this.m_Root;
    }
}