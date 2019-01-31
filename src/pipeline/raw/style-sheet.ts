import { Stylesheet as IStylesheet, parse, Rule, Declaration } from "css";
import { IMatchedRules, IStyleProps } from "../../common/type";
import { MatchSelector, Specificity } from "../../common/utility";

export class StyleSheet
{
    private m_StyleSheet: IStylesheet;

    public constructor(css_file: string)
    {
        this.m_StyleSheet = parse(css_file);
    }

    public SpecifiedValues(e: HTMLElement): IStyleProps
    {
        const style_props = {};

        // TODO: sort by specificity and position
        const matched_rules = this.MatchedRules(e).sort((a, b) => Specificity(a.selector) - Specificity(b.selector));

        matched_rules.forEach(matched =>
        {
            (matched.rule.declarations as Array<Declaration>).forEach(declaration =>
            {
                style_props[declaration.property] = declaration.value;
            })
        })

        return style_props;
    }

    public MatchedRules(e: HTMLElement): IMatchedRules
    {
        return [].concat(...this.m_StyleSheet.stylesheet.rules.map(rule => this.OnMatchedRule(e, rule)));
    }

    private OnMatchedRule(e: HTMLElement, rule: Rule): IMatchedRules
    {
        return rule.selectors.map(selector => MatchSelector(e, selector) ? { selector, rule } : null).filter(e => e !== null);
    }

}