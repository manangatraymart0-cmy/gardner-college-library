/* =========================================
   BOOKLIB — SHARED AUTH / SESSION SCRIPT
   Include this on every page that sits behind
   login (dashboard, books, borrow, borrowed,
   history, students).
   ========================================= */

(function () {

    var savedSession =
        localStorage.getItem("loggedInUser");


    /* Not logged in at all -> back to the login page */

    if (savedSession == null) {

        window.location.href = "index.html";

        return;

    }


    var currentUser =
        JSON.parse(savedSession);


    /* Page is admin-only but this user isn't an admin */

    if (typeof PAGE_REQUIRES_ADMIN !== "undefined" &&
        PAGE_REQUIRES_ADMIN &&
        currentUser.role !== "admin") {

        window.location.href = "dashboard.html";

        return;

    }


    window.currentUser = currentUser;


    /* Fill in the profile badge and show/hide admin-only nav items.
       This script tag sits right before </body>, so the rest of the
       page has already been parsed by the time this runs. */

    var nameEl =
        document.querySelector(".profile strong");

    var roleEl =
        document.querySelector(".profile p");

    var pictureEl =
        document.querySelector(".profile-picture");


    if (nameEl) {

        nameEl.textContent =
            currentUser.fullname || currentUser.username;

    }

    if (roleEl) {

        roleEl.textContent =
            currentUser.role === "admin" ? "Admin" : "Student";

    }

    if (pictureEl) {

        pictureEl.textContent =
            initials(currentUser.fullname || currentUser.username);

    }


    var adminLinks =
        document.querySelectorAll(".admin-only");

    for (var i = 0; i < adminLinks.length; i++) {

        adminLinks[i].style.display =
            currentUser.role === "admin" ? "" : "none";

    }


    function initials(name) {

        var parts =
            name.trim().split(/\s+/);

        var first =
            parts[0] ? parts[0][0] : "";

        var last =
            parts.length > 1 ? parts[parts.length - 1][0] : "";

        return (first + last).toUpperCase();

    }

})();


/* LOG OUT */

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";

}
	