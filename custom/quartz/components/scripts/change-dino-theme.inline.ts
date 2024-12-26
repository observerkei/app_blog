import { console_dbg } from '../common/util';

const dinoChangeTheme = (e: CustomEventMap["themechange"]) => {
    const theme = e.detail.theme
    const iframe = document.getElementById("dino-item-iframe") as HTMLIFrameElement;
    if (!iframe) {
        console.log('nomath dino iframe.');
        return;
    }
    if (!iframe.src) {
        console.log('dino iframe no src.');
        return;
    }
    iframe.style.visibility = "hidden";
    if (theme === "light") {
        iframe.src = 'static/dino';
        console_dbg('update dino light theme.')
    } else {
        iframe.src = 'static/dino/index-dark.html';
        console_dbg('update dino dark theme.')
    }
    setTimeout(() => {
        iframe.style.visibility = 'visible';
    }, 200);
}

document.addEventListener("nav", () => {
    document.addEventListener("themechange", dinoChangeTheme)
})


document.addEventListener('DOMContentLoaded', () => {
    const saveTheme = document.documentElement.getAttribute("saved-theme");
    
    console_dbg('get init theme: ', saveTheme);
    dinoChangeTheme({
        detail: {
            theme: saveTheme || 'dark',
        }
    });
});

