import { Rule } from "css";

export interface ISelector
{
    type: string;
    nodes: Array<{ type: string, name: string }>;
}

export interface ISelectors
{
    type: string;
    nodes: Array<ISelector>;
}

export interface IMatchedRule
{
    selector: string;
    rule: Rule;
}

export type IMatchedRules = Array<IMatchedRule>;

export type IStyleProps = { [index: string]: string };

export interface IColor
{
    r?: number;
    g?: number;
    b?: number;
    a?: number;
}