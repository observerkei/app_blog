import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../../quartz/components/types"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <>
      </>
    )
  }

  Footer.css;
  Footer.afterDOMLoaded;
  return Footer
}) satisfies QuartzComponentConstructor
