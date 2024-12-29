import {
    QuartzComponent,
    QuartzComponentConstructor,
    QuartzComponentProps
} from "../../../quartz/components/types"

interface Options {
}

export default ((opts?: Options) => {
    const MetaLink: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
        const permalink = fileData.frontmatter?.permalink;
        if (permalink) {
            return (
                <>
                    <meta 
                        name="giscus:backlink" 
                        content={`https://${cfg.baseUrl}${permalink}`}
                    />
                </>
            )
        } else {
            return (<></>)
        }
    }

    //MetaLink.css;
    //MetaLink.afterDOMLoaded;
    return MetaLink
}) satisfies QuartzComponentConstructor
