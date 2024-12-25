import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../../quartz/components//types"
import style from "../../../quartz/components/./styles/footer.scss"
import { version } from "../../../quartz/components/./../../package.json"
import { i18n } from "../../../quartz/components/./../../quartz/i18n"
import WalineComment from "../../../quartz/components/./../../content/.obsidian/plugins/waline/waline-comment"
import WalineScript from "./scripts/waline.inline"
import WalinePageview from "../../../quartz/components/./../../content/.obsidian/plugins/waline/waline-pageview"

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
          <WalineComment />
          <p>
            {i18n(cfg.locale).components.footer.createdWith}{" "}
            <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
          </p>
          <p id="waline-pageview-wait" style="visibility: hidden;" class="breakable">
            {"Current page views:"}{" "}
            <WalinePageview />
          </p>
          <div style="text-align: center;">
            <a href="#" >⇫</a>
          </div>
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
