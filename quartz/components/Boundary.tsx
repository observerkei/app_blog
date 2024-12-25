import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Boundary: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
        <hr />
    )
  }

  return Boundary
}) satisfies QuartzComponentConstructor