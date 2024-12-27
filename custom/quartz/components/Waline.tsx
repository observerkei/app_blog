import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../../quartz/components//types"
import WalineComment from "./Waline/waline-comment"
import WalineScript from "./Waline/waline.inline"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <>
        <footer class={`${displayClass ?? "waline"}`}>
          <WalineComment />
        </footer>
      </>
    )
  }

  Footer.afterDOMLoaded = WalineScript
  return Footer
}) satisfies QuartzComponentConstructor
