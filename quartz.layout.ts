import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import Custom from './custom/quartz/components'
import { getAllSegmentPrefixes } from "./quartz/util/path"
import { QuartzPluginData } from "./quartz/plugins/vfile";

const filterFileTags = (Tag: string) => {
  return (file: QuartzPluginData) => 
   (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(Tag)
};

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Custom.Waline(),
    Component.Backlinks(),
    Component.MobileOnly(Component.RecentNotes({ 
      linkToMore: 
      "tags/Note", limit: 1,
      filter: filterFileTags("Note"),
    })),
  ],
  footer: Custom.WalineFooterViewOnly(),
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
    Component.DesktopOnly(Custom.RecentTagNotes({ 
      linkToMore: "tags/Note", 
      limit: 1,
      filter: filterFileTags("Note"),
    })),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
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
  beforeBody: [
    Component.Breadcrumbs(), 
    Component.MobileOnly(Component.Explorer({ showTitlePointer: false, title: " " })),
    Component.ArticleTitle(), 
    Component.ContentMeta()
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph({
      localGraph: {
        removeTags: [
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
