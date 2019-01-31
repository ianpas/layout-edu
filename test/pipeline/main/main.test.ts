import { resolve } from "path";
import { readFileSync } from "fs";
import { Render } from "../../../src/pipeline/rendering/renderer";

test("basic", () =>
{
    const png = Render({
        viewport: { width: 500 },
        html_file: readFileSync(resolve(__dirname, "./asset/basic/index.html"), "utf8"),
        css_file: readFileSync(resolve(__dirname, "./asset/basic/index.css"), "utf8")
    })
    png.Save(resolve(__dirname, "../../../out/main-basic.png"));
});

test("concentric", () =>
{
    const png = Render({
        viewport: { width: 500 },
        html_file: readFileSync(resolve(__dirname, "./asset/concentric/index.html"), "utf8"),
        css_file: readFileSync(resolve(__dirname, "./asset/concentric/index.css"), "utf8")
    })
    png.Save(resolve(__dirname, "../../../out/main-concentric.png"));
});

test("alpha-blend", () =>
{
    const png = Render({
        viewport: { width: 500 },
        html_file: readFileSync(resolve(__dirname, "./asset/alpha-blend/index.html"), "utf8"),
        css_file: readFileSync(resolve(__dirname, "./asset/alpha-blend/index.css"), "utf8")
    })
    png.Save(resolve(__dirname, "../../../out/main-alpha-blend.png"));
});


// test("main-chinese-knot", () =>
// {
//     const png = Render({
//         viewport: { width: 500 },
//         html_file: readFileSync(resolve(__dirname, "./asset/png2html/chinese-knot/index.html"), "utf8"),
//         css_file: readFileSync(resolve(__dirname, "./asset/png2html/chinese-knot/index.css"), "utf8")
//     })
//     png.Save(resolve(__dirname, "../../../out/main-chinese-knot.png"));
// });

// test("main-spring", () =>
// {
//     const png = Render({
//         viewport: { width: 500 },
//         html_file: readFileSync(resolve(__dirname, "./asset/png2html/spring/index.html"), "utf8"),
//         css_file: readFileSync(resolve(__dirname, "./asset/png2html/spring/index.css"), "utf8")
//     })
//     png.Save(resolve(__dirname, "../../../out/main-spring.png"));
// });