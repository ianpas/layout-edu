import { StyleNode, Canvas, LayoutNode, IDimension, Dimention, BuildDisplayList, IDisplayCommand } from "../../../src";
import { resolve } from "path";


test("build display list", () =>
{
    const containing_block: IDimension = new Dimention({ content: { x: 0, y: 0, width: 500, height: 0 } });
    const style_a = { "background-color": "rgba(0,160,233,0.7)", "padding": "12px", "margin-top": "6px", "margin-left": "3px", "height": "75px" };
    const style_b = { "background-color": "#00a0e9", "padding": "18px", "margin-bottom": "5px", "margin-right": "4px", "height": "35px" };

    const container = new LayoutNode();
    const div_a = new LayoutNode({ style: new StyleNode({ props: style_a }) })
    const div_b = new LayoutNode({ style: new StyleNode({ props: style_b }) })

    container.children.push(div_a);
    container.children.push(div_b);

    //
    container.Layout(containing_block);
    const list = BuildDisplayList(container);
    expect(list).toEqual({
        "commands": [
            {
                "type": "solid_color",
                "color": "rgba(0,160,233,0.7)",
                "rect": {
                    "x": 3,
                    "y": 6,
                    "width": 497,
                    "height": 99
                }
            },
            {
                "type": "solid_color",
                "color": "#00a0e9",
                "rect": {
                    "x": 0,
                    "y": 105,
                    "width": 496,
                    "height": 71
                }
            }
        ]
    });
});

test("draw pixel", () =>
{
    const commands = [
        {
            "type": "solid_color",
            "color": "rgba(0,160,233,0.7)",
            "rect": {
                "x": 3,
                "y": 6,
                "width": 497,
                "height": 99
            }
        },
        {
            "type": "solid_color",
            "color": "#00a0e9",
            "rect": {
                "x": 0,
                "y": 105,
                "width": 496,
                "height": 71
            }
        }
    ];

    const canvas = new Canvas({ width: 500, height: 181 });
    for (const command of commands)
    {
        canvas.Draw(command as IDisplayCommand);
    }
    const png = canvas.ToPng();
    png.Save(resolve(__dirname, "../../../out/canvas-test.png"));
});


test("alpha blend", () =>
{
    const commands = [
        {
            "type": "solid_color",
            "color": "rgba(233, 0, 0, 1.0)",
            "rect": {
                "x": 0,
                "y": 0,
                "width": 50,
                "height": 50
            }
        },
        {
            "type": "solid_color",
            "color": "rgba(0, 160, 233, 0.5)",
            "rect": {
                "x": 25,
                "y": 25,
                "width": 50,
                "height": 50
            }
        }
    ];

    const canvas = new Canvas({ width: 175, height: 175 });
    for (const command of commands)
    {
        canvas.Draw(command as IDisplayCommand);
    }
    const png = canvas.ToPng();
    png.Save(resolve(__dirname, "../../../out/alpha-blend.png"));
});