AOS.init();

console.log(document.cookie);

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getIdCookie() {
  return getCookie("_id").slice(3, getCookie("_id").length - 1);
}

console.log(`cookieID >>>: ${getIdCookie()}`);
console.log(`authUser >>>: ${getCookie("authUser")}`);

if (getCookie("authUser")) {
  iconUser.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
    </svg>`;
  [itemNavbarPreviewTodos, itemNavbarCreateTodo, buttonExitProfile].forEach(
    (element) => {
      element.classList.remove("d-none");
    }
  );
  itemNavbarSignUpUser.classList.add("d-none");
} else {
  itemNavbarSignUpUser.classList.remove("d-none");
  iconUser.remove();
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
// deleteAllCookies();

buttonExitProfile.addEventListener(
  "click",
  async (e) => {
    e.preventDefault();
    await deleteAllCookies();
    window.location.href = "/";
  },
  false
);
