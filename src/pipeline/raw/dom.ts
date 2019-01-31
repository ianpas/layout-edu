import { JSDOM as JsDom } from "jsdom";

export class Dom
{
    private m_Dom: JsDom;

    public constructor(html_file: string)
    {
        this.m_Dom = new JsDom(html_file);
    }

    get document()
    {
        return this.m_Dom.window.document;
    }
}