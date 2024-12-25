import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import Custom from './custom/quartz/components'

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
      Custom.Waline()
  ],
  footer: Custom.Empty(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.MobileOnly(Component.Explorer({ showTitlePointer: false, title: " " })),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    Component.MobileOnly(Component.TableOfContents()),
  ],
  left: [
    Component.MobileOnly(Component.PageTitle()),
    Component.DesktopOnly(Custom.PageTitleDarkmode()),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.MobileOnly(Component.Darkmode()),
    Component.DesktopOnly(Custom.RecentNotes({ linkToMore: "tags/Note", limit: 1 })),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.MobileOnly(Component.RecentNotes({ linkToMore: "tags/Note", limit: 2 })),
    Component.Backlinks(),
    Component.Graph({
      localGraph: {
        removeTags: [
          "Note",
          "excalidraw"
        ]
      },
      globalGraph: {
        removeTags: [
          "Note",
          "excalidraw"
        ]
      }
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
