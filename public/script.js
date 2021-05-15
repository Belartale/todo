// gsap.to(".aniTest", { duration: 2, x: 300 });
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

console.log(`COOOOOO: ${getIdCookie()}`);

// let buttonDeleteCookies = document.querySelector(`.buttonDeleteCookies`);
// buttonDeleteCookies.addEventListener("click", () => {}, false);

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

buttonDeleteCookies.addEventListener(
  "click",
  async () => {
    await deleteAllCookies();
    await window.location.reload();
  },
  false
);

// import bootstrap from "bootstrap";

// let myModal = new bootstrap.Modal(document.getElementById("myModal"), {
//   keyboard: false,
// });

// myModal.show();
