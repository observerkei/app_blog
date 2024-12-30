import { QuartzComponent, QuartzComponentProps } from "../../../quartz/components/./types"


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
                    const regex = new RegExp(item);
                    const slug = props.fileData.slug;
                    if (typeof slug === "string" && regex.test(slug)) {
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
