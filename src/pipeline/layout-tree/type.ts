export interface IOrigin
{
    x: number;
    y: number;
}

export interface IDimension
{
    content: IRectangle;
    padding: IEdgeSize;
    border: IEdgeSize;
    margin: IEdgeSize;

    PaddingBox?(): IRectangle;
    BorderBox?(): IRectangle;
    MarginBox?(): IRectangle;
    Origin?(): IOrigin;
}

export class Dimention implements Dimention
{
    public content: IRectangle;
    public padding: IEdgeSize;
    public border: IEdgeSize;
    public margin: IEdgeSize;

    public constructor({ content = new Rectangle(), padding = new EdgeSize(), border = new EdgeSize(), margin = new EdgeSize() }: { content?: IRectangle, padding?: IEdgeSize, border?: IEdgeSize, margin?: IEdgeSize } = {})
    {
        this.content = content;
        this.padding = padding;
        this.border = border;
        this.margin = margin;
    }

    public PaddingBox(): IRectangle
    {
        return this.content.ExpandedBy(this.padding);
    }

    public BorderBox(): IRectangle
    {
        return this.PaddingBox().ExpandedBy(this.border);
    }

    public MarginBox(): IRectangle
    {
        return this.BorderBox().ExpandedBy(this.margin);
    }

    public Origin(): IOrigin
    {
        return {
            x: this.content.x - this.padding.left - this.border.left - this.margin.left,
            y: this.content.y - this.padding.top - this.border.top - this.margin.top
        };
    }
}

export interface IEdgeSize
{
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export class EdgeSize implements IEdgeSize
{
    public left: number;
    public right: number;
    public top: number;
    public bottom: number;

    public constructor({ left = 0, right = 0, top = 0, bottom = 0 }: { left?: number, right?: number, top?: number, bottom?: number } = {})
    {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
}

export interface IRectangle
{
    x: number;
    y: number;
    width: number;
    height: number;
    ExpandedBy?(edge: IEdgeSize): IRectangle;

}

export class Rectangle implements IRectangle
{
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    public constructor({ x = 0, y = 0, width = 0, height = 0 }: { x?: number, y?: number, width?: number, height?: number } = {})
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public ExpandedBy(edge: IEdgeSize): IRectangle
    {
        return new Rectangle({
            x: this.x - edge.left,
            y: this.y - edge.top,
            width: this.width + edge.left + edge.right,
            height: this.height + edge.top + edge.bottom
        })
    }
}