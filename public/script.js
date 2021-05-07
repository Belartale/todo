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

console.log(getIdCookie());

// fetch("http://localhost:3000/signInUser", {
//   method: "PUT",
//   body: JSON.stringify({ val: "test" }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("POST = yes", data);
//   });
