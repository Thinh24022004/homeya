document.addEventListener("DOMContentLoaded", function () {
    var preload = document.querySelector(".preload");

    function hidePreload() {
        if (!preload) {
            return;
        }

        preload.classList.add("is-hidden");
        setTimeout(function () {
            if (preload && preload.parentNode) {
                preload.parentNode.removeChild(preload);
            }
        }, 400);
    }

    if (document.readyState === "complete") {
        hidePreload();
    } else {
        window.addEventListener("load", hidePreload, { once: true });
        setTimeout(hidePreload, 2500);
    }

    var toggler = document.querySelector(".mobile-nav-toggler");
    var mobileMenu = document.querySelector(".mobile-menu");
    var closeButton = document.querySelector(".mobile-menu .close-btn");
    var backdrop = document.querySelector(".mobile-menu .menu-backdrop");
    var menuOuter = document.querySelector(".mobile-menu .menu-outer");
    var desktopNavigation = document.querySelector(".main-menu .navigation");
    var progressWrap = document.querySelector(".progress-wrap");
    var progressPath = document.querySelector(".progress-wrap path");

    if (progressWrap) {
        progressWrap.setAttribute("role", "button");
        progressWrap.setAttribute("aria-label", "Scroll to top");
        progressWrap.setAttribute("tabindex", "0");
    }

    if (progressPath) {
        var pathLength = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;

        var updateProgress = function () {
            var scroll = window.scrollY || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - window.innerHeight;
            var progress = height > 0 ? pathLength - (scroll * pathLength) / height : pathLength;

            progressPath.style.strokeDashoffset = progress;

            if (scroll > 120) {
                progressWrap.classList.add("active-progress");
            } else {
                progressWrap.classList.remove("active-progress");
            }
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress();

        var scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        progressWrap.addEventListener("click", scrollToTop);
        progressWrap.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                scrollToTop();
            }
        });
    }

    if (menuOuter && desktopNavigation) {
        var mobileNavigation = desktopNavigation.cloneNode(true);
        menuOuter.innerHTML = "";
        menuOuter.appendChild(mobileNavigation);

        mobileNavigation.querySelectorAll("li.dropdown2").forEach(function (item) {
            var submenu = item.querySelector(":scope > ul");

            if (!submenu) {
                return;
            }

            var toggleButton = document.createElement("button");
            toggleButton.type = "button";
            toggleButton.className = "dropdown2-btn";
            toggleButton.setAttribute("aria-label", "Toggle submenu");
            toggleButton.innerHTML = "<span></span>";
            item.appendChild(toggleButton);

            toggleButton.addEventListener("click", function () {
                item.classList.toggle("open");
            });
        });
    }

    function openMenu() {
        if (!mobileMenu || !toggler) {
            return;
        }

        mobileMenu.classList.add("is-open");
        toggler.classList.add("is-active");
        document.body.classList.add("menu-open");
        toggler.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        if (!mobileMenu || !toggler) {
            return;
        }

        mobileMenu.classList.remove("is-open");
        toggler.classList.remove("is-active");
        document.body.classList.remove("menu-open");
        toggler.setAttribute("aria-expanded", "false");
    }

    if (toggler) {
        toggler.addEventListener("click", openMenu);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeMenu);
    }

    if (backdrop) {
        backdrop.addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (event) {
        if (mobileMenu && event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
            closeMenu();
        }
    });
});