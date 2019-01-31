import { Dom, StyleSheet } from "../../../src";
import { resolve } from "path";
import { readFileSync } from "fs";
import { NormalizeCss, StringifyRules } from "../../common/utility";

const dom = new Dom(readFileSync(resolve(__dirname, "../../common/html/basic.html"), "utf8"));
const style_sheet = new StyleSheet(readFileSync(resolve(__dirname, "../../common/css/basic.css"), "utf8"));

test("specified values", () =>
{
    const values = style_sheet.SpecifiedValues(dom.document.querySelector("h1"));
    expect(values).toEqual({ "color": "#cc0000", "margin": "auto", "margin-bottom": "20px", "padding": "20px" });
});

test("get matched rules of element", () =>
{
    const get_result = (tag: string) =>
    {
        const matched_rules = style_sheet.MatchedRules(dom.document.querySelector(tag));
        //

        const rules = matched_rules.map(e => e.rule);
        const str_rules = StringifyRules(rules);

        //
        const selectors = matched_rules.map(e => e.selector);
        return { selectors, str_rules };
    };

    {
        const { selectors, str_rules } = get_result("h1");
        expect(selectors).toEqual(["h1", ".note"]);

        const to_compare = `h1,h2,h3{margin:auto;color:#c00;padding:10px}.note{margin-bottom:20px;padding:20px}`;
        expect(NormalizeCss(str_rules)).toEqual(NormalizeCss(to_compare));
    }

    {
        const { selectors, str_rules } = get_result("div");
        expect(selectors).toEqual([".note", "#answer"]);

        const to_compare = `.note{margin-bottom:20px;padding:20px}#answer{display:none}`;
        expect(NormalizeCss(str_rules)).toEqual(NormalizeCss(to_compare));
    }
});
