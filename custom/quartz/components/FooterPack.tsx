import { QuartzComponent, QuartzComponentProps } from "../../../quartz/components/types"
import style from "../../../quartz/components/./styles/footer.scss"


type QuartzComponentPackConstructor<Options extends object | undefined = undefined> = (
    list: QuartzComponent[],
) => QuartzComponent

export default ((list: QuartzComponent[]): QuartzComponent => {
    const Footer: QuartzComponent = (props: QuartzComponentProps) => {

    return (
      <>
        <footer class={`${props.displayClass ?? "footer-pack"}`}>
          {list.map((Component: QuartzComponent) => <Component {...props}/>)}
        </footer>
      </>
    )
  }

  Footer.css = style;

  for (const item of list) {
    if (item?.css) {
      Footer.css += item.css;
    }
    if (item?.afterDOMLoaded) {
      Footer.afterDOMLoaded += `
${Footer.afterDOMLoaded || ""}
${item.afterDOMLoaded || ""}
`
    }
  }

  return Footer
}) satisfies QuartzComponentPackConstructor
