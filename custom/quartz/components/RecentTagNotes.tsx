import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../../../quartz/components/types"
import { FullSlug, SimpleSlug, resolveRelative } from "../../../quartz/util/path"
import { QuartzPluginData } from "../../../quartz/plugins/vfile"
import { byDateAndAlphabetical } from "../../../quartz/components/PageList"
import style from "./styles/recentTagNotes.scss"
import { Date, getDate } from "../../../quartz/components/Date"
import { GlobalConfiguration } from "../../../quartz/cfg"
import { i18n } from "../../../quartz/i18n"
import { classNames } from "../../../quartz/util/lang"
import { fileSyntax } from "esbuild-sass-plugin/lib/utils"
import { BackgroundColorName } from "chalk"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  desktopOnly: BackgroundColorName
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  desktopOnly: true,
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <>
        <div class={classNames(displayClass, "recent-tag-notes")}>
          <div
            style={{
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              fontSize: '0.7rem',
            }}>

            <h3 style={{
              marginTop: '0',
              marginBottom: '0.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: '0.5rem',
            }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
              }}>
                Recent Notes
              </div>

              {opts.linkToMore && remaining > 0 && (
                <a
                  href={resolveRelative(fileData.slug!, opts.linkToMore)}
                  style={{
                    fontSize: '0.7rem',
                  }}
                >
                  {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
                </a>
              )}
            </h3>


            {pages.slice(0, opts.limit).map((page) => {
              const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
              const tags = page.frontmatter?.tags ?? []

              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>

                  <a
                    href={resolveRelative(fileData.slug!, page.slug!)}
                    class="internal"
                    style={{
                      backgroundColor: '#0000',
                      flexGrow: 1,
                    }}
                  >
                    {title}
                  </a>
                  {page.dates && (
                    <Date
                      date={getDate(cfg, page)!}
                      locale={cfg.locale}
                    />
                  )}
                </div>
              )
            })}

          </div>
        </div>
      </>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
