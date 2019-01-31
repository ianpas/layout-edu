import { Specificity, Dom, MatchSelector } from "../../src";
import { resolve } from "path";
import { readFileSync } from "fs";

const dom = new Dom(readFileSync(resolve(__dirname, "../common/html/basic.html"), "utf8"));

test("specificity", () =>
{
    expect(Specificity("div.note")).toEqual(11);
    expect(Specificity("#answer")).toEqual(100);
});

test("match selector", () =>
{
    expect(MatchSelector(dom.document.querySelector("h1"), "h1")).toEqual(true);
    expect(MatchSelector(dom.document.querySelector("h1"), "#_1")).toEqual(false);
    expect(MatchSelector(dom.document.querySelector("h1"), "div.note")).toEqual(false);
});


