import Comment from '../../../../content/.obsidian/plugins/waline/waline-comment.inline'
import Pageview from '../../../../content/.obsidian/plugins/waline/waline-pageview.inline'


function wait_load() {
  var is_404 = false
  var bodyTag = document.querySelector('body');
  var dataSlugValue = bodyTag.getAttribute('data-slug');
  if (dataSlugValue === "404") {
    is_404 = true
  }

  if (!is_404) {
    try {
      Pageview();
    } catch (err) {

    }
    try {
      Comment();
    } catch (err) {

    }
  }
}

setTimeout(() => wait_load(), 100);
