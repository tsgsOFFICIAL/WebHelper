let cookieBanner = document.getElementById("cookie-banner");
let rejectBtn = document.getElementById("cookie-btn-reject");
let acceptBtn = document.getElementById("cookie-btn-accept");

if (isCookieConsent()) {
    cookieBanner.remove();
} else {
    if (getCookie("cookie_consent") == "false") {
        // Do nothing, user has rejected cookies
    } else {
        cookieBanner.classList.add("visible");

        cookieBanner.addEventListener("animationend", () => {
            document.addEventListener("click", closeCookiePopup);
        });
    }
}

// Event listeners
rejectBtn.addEventListener("click", () => {
    rejectCookies();
});

acceptBtn.addEventListener("click", () => {
    acceptCookies();
});

function acceptCookies() {
    setCookie("cookie_consent", "true", 365);

    document.removeEventListener("click", closeCookiePopup);

    cookieBanner.classList.add("animateOut");
    cookieBanner.classList.remove("visible");

    cookieBanner.addEventListener("animationend", () => {
        cookieBanner.remove();
    });

}

function rejectCookies() {
    setCookie("cookie_consent", "false", 365);

    document.removeEventListener("click", closeCookiePopup);

    cookieBanner.classList.add("animateOut");
    cookieBanner.classList.remove("visible");
}

function closeCookiePopup(e) {
    try {
        const x = e.clientX;
        const y = e.clientY;

        if (document.elementFromPoint(x, y).classList.contains("cookie-item")) {
            // Do nothing
        } else {
            // Accept cookies
            acceptCookies();
        }
    } catch (err) {
        //console.error(err);
    }
}

// Check cookie consent
function isCookieConsent() {
    return getCookie("cookie_consent") == "true" ? true : false;
}

// Set a cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get a cookies content
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }

    }
    return "";
}