
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)


const updateDinoTheme = (theme = 'dark') => {
    const iframe = document.getElementById("dino-item-iframe");
    if (iframe) {
        const iframeDocument = iframe?.contentDocument || iframe?.contentWindow.document;

        const dinoItem = iframeDocument?.getElementById("dino-item");
        if (dinoItem) {
            if (theme === "light") {
                const light = '#faf8f8';

                dinoItem.style.background = light;
                console.log('update dino light theme.')
            } else {
                const dark = '#161618';
                dinoItem.style.background = dark;
                console.log('update dino dark theme.')
            }
        } else {
            console.log('dino not found. try later. ')
            setTimeout(() => {
                updateDinoTheme(theme);
            }, 200);
        }
    } else {
        console.log('dino iframe not found. try later.')
        setTimeout(() => {
            updateDinoTheme(theme);
        }, 200);
    }
}


document.addEventListener("themechange", (e) => {
    console.log("dino check Theme changed to " + e.detail.theme) // either "light" or "dark"
    // your logic here
    updateDinoTheme(e.detail.theme);
})



document.addEventListener("nav", () => {
    const htmlElement = document.documentElement;
    const savedTheme = htmlElement.getAttribute("saved-theme");


    updateDinoTheme(savedTheme);
})

updateDinoTheme(currentTheme);