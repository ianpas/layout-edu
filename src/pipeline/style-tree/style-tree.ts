import { IStyleProps } from "../../common/type";
import { Dom } from "../raw/dom";
import { StyleSheet } from "../raw/style-sheet";

export interface IStyleNode
{
    node: HTMLElement;
    props: IStyleProps;
    children: Array<IStyleNode>;
    value(prop: string): string;
    lookup(...props: Array<string>): string;
}

export interface IStyleNodeJson
{
    node: string;
    props: IStyleProps;
    children: Array<IStyleNodeJson>;
}

export class StyleNode implements IStyleNode
{
    public node: HTMLElement;
    public props: IStyleProps;
    public children: Array<IStyleNode>;

    public constructor({ node = null, props = {}, children = [] }: { node?: HTMLElement, props?: IStyleProps, children?: Array<IStyleNode> } = {})
    {
        this.node = node;
        this.props = props;
        this.children = children;
    }

    public lookup(...props: Array<string>): string
    {
        for (let i = 0; i < props.length; ++i)
        {
            if (i !== props.length - 1)
            {
                const value = this.value(props[i]);
                if (value)
                {
                    return value;
                }
            }
            else
            {
                return props[props.length - 1];
            }
        }
    }

    public value(prop: string): string
    {
        return this.props[prop] || "";
    }

    public display(): string
    {
        return this.value("display") || "block";
    }
}

export class StyleTree
{
    private m_Root: IStyleNode;

    public constructor(dom: Dom, style_sheet: StyleSheet)
    {
        this.m_Root = this.BuildTree(dom.document.body, style_sheet);
    }

    get root()
    {
        return this.m_Root;
    }

    public Traverse(callback: { (node: IStyleNode): void }, node: IStyleNode = this.m_Root)
    {
        callback(node);
        node.children.forEach(child =>
        {
            this.Traverse(callback, child);
        });
    }

    private BuildTree(e: HTMLElement, style_sheet: StyleSheet): IStyleNode
    {
        const root: IStyleNode = new StyleNode({ node: e, props: style_sheet.SpecifiedValues(e), children: [] });
        for (const child of e.children)
        {
            root.children.push(this.BuildTree(child as HTMLElement, style_sheet));
        }
        return root;
    }

    public ToJson(node = this.m_Root): IStyleNodeJson
    {
        return { node: node.node.tagName.toLowerCase(), props: node.props, children: node.children.map(child => this.ToJson(child)) };
    }
}