let hoverBoxTimeout;
const hoverBox = document.createElement("div");
const button = document.getElementById("check-button");
hoverBox.className = "hover-box";
document.body.appendChild(hoverBox);

let isMouseOverAnchor = false;
let isMouseOverBox = false;

// button.addEventListener("click", async () => {
//   // e.preventDefault();
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const currentTab = tabs[0];
//     const url = currentTab.url; // 현재 탭의 URL
//     console.log(`http://127.0.0.1:5000/?url=${url}`);
//     document.getElementById("url-display").innerText = `Current URL: ${url}`;
//   });

//   // const response = await fetch(`http://127.0.0.1:5000/?url=${document.URL}`, {
//   //   mode: "no-cors",
//   // });

//   // // const json = await response.json();
//   // console.log(response.text);
// });

document.addEventListener("mouseover", (e) => {
  const target = e.target;
  if (target.tagName === "A") {
    isMouseOverAnchor = true;
    showHoverBox(target, e);
  }
});

document.addEventListener("mouseout", (e) => {
  const related = e.relatedTarget;

  if (!related || related !== hoverBox) {
    isMouseOverAnchor = false;
    checkHoverConditions();
  }
});

hoverBox.addEventListener("mouseenter", () => {
  isMouseOverBox = true;
});

hoverBox.addEventListener("mouseleave", () => {
  isMouseOverBox = false;
  checkHoverConditions();
});

async function showHoverBox(anchor, event) {
  hoverBox.style.left = `${event.pageX}px`;
  hoverBox.style.top = `${event.pageY}px`;
  hoverBox.style.display = "block";
  hoverBox.classList.add("show");

  try {
    const url = `http://127.0.0.1:5000/?url=${anchor.href}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("서버 응답이 올바르지 않습니다.");
    }

    const data = await response.json();

    hoverBox.textContent = data["text"];
  } catch (error) {
    console.error(error.message);
    hoverBox.textContent = "에러: 기사의 URL을 찾지 못했어요";
  }
}

function checkHoverConditions() {
  if (!isMouseOverAnchor && !isMouseOverBox) {
    hoverBox.classList.remove("show");
    hoverBox.style.display = "none";
  }
}
