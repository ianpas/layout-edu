import * as CleanCss from "clean-css";
import { parse, stringify, Rule } from "css";

export function StringifyRules(rules: Array<Rule>): string
{
    const ast = parse("");
    ast.stylesheet.rules = rules;
    return stringify(ast);
}

export function NormalizeCss(css: string): string
{
    return new CleanCss({}).minify(css).styles;
}