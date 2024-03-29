
import Comment from '../../../content/.obsidian/plugins/waline/waline-comment.inline'
import Pageview from '../../../content/.obsidian/plugins/waline/waline-pageview.inline'


var is_404 = false
var bodyTag = document.querySelector('body');
var dataSlugValue = bodyTag.getAttribute('data-slug');
if (dataSlugValue === "404") {
  is_404 = true
}

if (!is_404) {
  try {
    Comment();
  } catch (err) {
  
  }
  
  try {
    Pageview();
  } catch (err) {
  
  }
}