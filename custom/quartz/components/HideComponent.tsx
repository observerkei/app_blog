import { QuartzComponent, QuartzComponentProps } from "./types"


type QuartzComponentHideConstructor<Options extends object | undefined = undefined> = (
    hideSlug: string[], component: QuartzComponent,
) => QuartzComponent


export default ((hideSlug: string[], component?: QuartzComponent) => {
    if (component) {
        const Component = component
        const DesktopOnly: QuartzComponent = (props: QuartzComponentProps) => {
            let hideComponent = false;

            if (hideSlug.length > 0) {
                for (const item of hideSlug) {
                    if (item === props.fileData.slug) {
                        hideComponent = true;
                        break;
                    }
                }
            }
            if (hideComponent) {
                return () => <></>
            }

            return <Component {...props} />
        }

        DesktopOnly.displayName = component.displayName
        DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded
        DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded
        DesktopOnly.css = component?.css
        return DesktopOnly
    } else {
        return () => <></>
    }
}) satisfies QuartzComponentHideConstructor
