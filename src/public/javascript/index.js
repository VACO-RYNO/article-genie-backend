const pList = document.querySelectorAll("p");
const genieModeLinkButton = document.getElementById("genie-mode-link");
const hoverModal = document.getElementById("genie-hover-modal");
const genieTag = document.querySelector("#genie-hover-modal > p");

let previousHash = "";

if (location.hash) {
  previousHash = location.hash;
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  window.scrollTo({
    top: target.offsetTop - 20,
    behavior: "smooth",
  });

  target.classList.add("focus");
}

pList.forEach(element =>
  element.addEventListener("click", e => {
    hoverModal.style.left = e.pageX - 0 + "px";
    hoverModal.style.top = e.pageY - 200 + "px";
    hoverModal.classList.add("show");

    genieTag.setAttribute("genie-id", e.target.getAttribute("genie-id"));
    genieTag.innerHTML = e.target.innerHTML;
  }),
);

window.addEventListener("mousemove", e => {
  pList.forEach(pElement => {
    const offset = pElement.getBoundingClientRect();

    if (e.y > offset.top && e.y < offset.bottom)
      return pElement.classList.add("highlight");

    pElement.classList.remove("highlight");
  });
});

genieModeLinkButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}${
        window.location.pathname
      }#genie-id-${genieTag.getAttribute("genie-id")}`,
    );

    alert("링크 복사됨.");
  } catch (error) {
    alert("복사 실패!");
  }

  hoverModal.classList.remove("show");
});

window.addEventListener("hashchange", () => {
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  window.scrollTo({
    top: target.offsetTop - 20,
    behavior: "smooth",
  });

  if (previousHash.length > 0) {
    const previousTarget = document.querySelector(
      `[genie-id="${previousHash.split("-")[2]}"]`,
    );
    previousTarget.classList.remove("focus");
  }

  target.classList.add("focus");
  previousHash = location.hash;
});
