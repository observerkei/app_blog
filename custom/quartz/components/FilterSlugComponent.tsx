import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "../../../quartz/components/types"


interface Options {
    blackList?: string[];
    whiteList?: string[];
    component: QuartzComponent;
}

export default ((opts?: Options) => {
    if (opts?.component) {
        const Component = opts?.component
        const DesktopOnly: QuartzComponent = (props: QuartzComponentProps) => {
            let hideComponent = false;

            if (opts?.blackList && opts.blackList.length > 0) {
                for (const item of opts?.blackList) {
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

            if (opts?.whiteList && opts.whiteList.length > 0) {
                let showComponent = false;

                for (const item of opts?.whiteList) {
                    const regex = new RegExp(item);
                    const slug = props.fileData.slug;
                    if (typeof slug === "string" && regex.test(slug)) {
                        showComponent = true;
                        break;
                    }
                }

                if (!showComponent) {
                    return () => <></>
                }
            }

            return <Component {...props} />
        }

        DesktopOnly.displayName = opts?.component.displayName
        DesktopOnly.afterDOMLoaded = opts?.component?.afterDOMLoaded
        DesktopOnly.beforeDOMLoaded = opts?.component?.beforeDOMLoaded
        DesktopOnly.css = opts?.component?.css
        return DesktopOnly
    } else {
        return () => <></>
    }
}) satisfies QuartzComponentConstructor
