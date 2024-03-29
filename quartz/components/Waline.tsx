import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import WalineComment from "../../content/.obsidian/plugins/waline/waline-comment"
import WalineScript from "./scripts/waline.inline"
import WalinePageview from "../../content/.obsidian/plugins/waline/waline-pageview"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <>
      <footer class={`${displayClass ?? ""}`}>
        <hr />
      <WalineComment />
        <spane id="waline-pageview-wait" style="visibility: hidden;" class="breakable">
          {i18n(cfg.locale).components.waline.pageviewCount}{" "}
          <WalinePageview />
        </spane>
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
      </>
    )
  }

  Footer.css = style
  Footer.afterDOMLoaded = WalineScript
  return Footer
}) satisfies QuartzComponentConstructor
