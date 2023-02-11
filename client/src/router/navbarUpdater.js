function updateNavbar() {
    setTimeout(() => {
        const appIndex = document.querySelector('app-index');
        if (appIndex) {
            appIndex.requestUpdate();
        }
    }, 0);
}

export default updateNavbar;

