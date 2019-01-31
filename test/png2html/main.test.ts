import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { PngImage } from "../../src";
import { PngToHtml } from "../../src/png2html/png-to-html";

test("read png", () =>
{
    const buffer = readFileSync(resolve(__dirname, "./asset/basic.png"));
    const png = new PngImage({ buffer });
    const { html_file, css_file } = PngToHtml(png);
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/basic/index.html"), html_file, "utf8");
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/basic/index.css"), css_file, "utf8");
});

test("chinese-knot", () =>
{
    const buffer = readFileSync(resolve(__dirname, "./asset/chinese-knot.png"));
    const png = new PngImage({ buffer });
    const { html_file, css_file } = PngToHtml(png);
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/chinese-knot/index.html"), html_file, "utf8");
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/chinese-knot/index.css"), css_file, "utf8");
});

test("spring", () =>
{
    const buffer = readFileSync(resolve(__dirname, "./asset/spring.png"));
    const png = new PngImage({ buffer });
    const { html_file, css_file } = PngToHtml(png);
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/spring/index.html"), html_file, "utf8");
    writeFileSync(resolve(__dirname, "../pipeline/main/asset/png2html/spring/index.css"), css_file, "utf8");
});