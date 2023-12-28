const searchString = document.getElementById("searchString");
const searchBtn = document.getElementById("searchBtn");
//this is youtube v3 base url
const apiKey = "AIzaSyBJ_jhWVh5pvnuNwtx739sncUqu1rAPkNk";
const baseUrl = `https://www.googleapis.com/youtube/v3`;
const rightContainer = document.getElementById("right-container");

let VideoDetailsSearchItem = JSON.parse(localStorage.getItem("searchItem"));

//loding bar ----> hide after 2s;
let lodingBar = document.getElementById("lodingBar");
setTimeout(() => {
  lodingBar.style.display = "none";
}, 1000);

if (VideoDetailsSearchItem != null) {
  getSearchResults(VideoDetailsSearchItem.searchStr);
  console.log(VideoDetailsSearchItem);
  localStorage.removeItem("searchItem");
} else {
  console.log("home");
  getHomeVideos();
}

// search the string that user typed--->
searchBtn.addEventListener("click", () => {
  lodingBar.style.display = "block";
  setTimeout(() => {
    lodingBar.style.display = "none";
  }, 1000);
  let searchStr = searchString.value.trim();
  if (searchStr === " ") {
    return;
  }
  getSearchResults(searchStr);
});
// when user press enter for serching --->
searchString.addEventListener("keypress", (event) => {
  lodingBar.style.display = "block";
  setTimeout(() => {
    lodingBar.style.display = "none";
  }, 1000);
  if (event.key == "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

async function getSearchResults(searchString) {
  // let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4&q=java'
  let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=50`;
  console.log(url);
  const response = await fetch(url, { method: "GET" });
  const result = await response.json();
  console.log(result);
  appendVideoInContainer(result.items);
}

async function getHomeVideos(reletedStr) {
  // let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4&q=java'
  let url = `${baseUrl}/search?key=${apiKey}&q=frontenddeveloper&part=snippet&maxResults=50`;
  // console.log(url);
  const response = await fetch(url, { method: "GET" });
  const result = await response.json();
  // console.log(result);
  homeContainer(result.items);
}
//get more info about profile img and view counts -->

function appendVideoInContainer(list) {
  removeElements(document.getElementById("video-container"));
  removeElements(document.getElementById("home-video-container"));

  const videoCon = document.createElement("div");
  videoCon.id = "video-container";

  list.forEach((videoCard) => {
    let id = videoCard.id;
    let snippet = videoCard.snippet;
    let vCard = document.createElement("div");
    vCard.className = "video-card";
    vCard.innerHTML = `
                    <div class="thumb-img">
                        <img src="${snippet.thumbnails.high.url}" alt="">
                    </div>
                    <div class="video-details">
                    <div class="profile-image">
                      <img id='profile-none' src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Eo_circle_purple_white_letter-r.svg/2048px-Eo_circle_purple_white_letter-r.svg.png" alt="">
                    </div>
                    <div class="video-about">
                      <p class="title">${snippet.title}</p>
                      <p class="channelTitel">${snippet.channelTitle}</p>
                      <p class="video-description">${snippet.description}</p>
                     </div>
                    </div>
      `;
    videoCon.appendChild(vCard);
    rightContainer.appendChild(videoCon);

    let localData = {
      snippet,
      id,
    };
    vCard.addEventListener("click", () => {
      localStorage.setItem("video", JSON.stringify(localData));
      location.href = "videoDetails.html";
    });
  });
}

function removeElements(item) {
  if (item === null) {
    return;
  }
  item.remove();
}

function homeContainer(list) {
  removeElements(document.getElementById("video-container"));
  removeElements(document.getElementById("home-video-container"));

  const homeContainer = document.createElement("div");
  homeContainer.id = "home-video-container";
  list.forEach((item) => {
    const homeCard = document.createElement("div");
    let snippet = item.snippet;
    let id = item.id;
    homeCard.className = "home-card";
    homeCard.innerHTML = `
      <div class="thumb-img">
      <img src="${snippet.thumbnails.high.url}" alt="">
      </div>

     <div class="cardDetails">
         <div class="profile-image">
            <img src="https://yt3.ggpht.com/ytc/AOPolaT7K31tPA6en4iHqcVIJz5Dj6avNMmsSebv5vc72zKKhI7nApcEFbjw7pyOTSjF=s48-c-k-c0x00ffffff-no-rj" alt="">
        </div>
        <div>
          <p class="htitle">${snippet.title}</p>
          <p class="channelTitel">${snippet.channelTitle}</p>
        </div>
     </div>`;
    homeContainer.appendChild(homeCard);

    //  homeCard.addEventListener('click',()=>{
    //   console.log("click");
    //  })
    let localData = {
      snippet,
      id,
    };
    homeCard.addEventListener("click", () => {
      lodingBar.style.display = "block";
      setTimeout(() => {
        lodingBar.style.display = "none";
      }, 1000);
      localStorage.setItem("video", JSON.stringify(localData));
      location.href = "videoDetails.html";
    });
  });
  rightContainer.appendChild(homeContainer);
}

document.getElementById("home").addEventListener("click", () => {
  lodingBar.style.display = "block";
  setTimeout(() => {
    lodingBar.style.display = "none";
  }, 1000);
  getHomeVideos();
});

// make the side bar small and big when bar is pressed

// const smSideBar = document.getElementById('small-left-container');
// const bgSideBar = document.getElementById('bg-side-bar');
// const barBtn = document.getElementById('barLeft');
// // bgSideBar.style.display = 'block';
// barBtn.addEventListener('click', () => {

//   if (bgSideBar.style.display == 'block') {
//     bgSideBar.style.display = 'none';
//     smSideBar.style.display = 'block'
//   }
//   else {
//     bgSideBar.style.display = 'block';
//     smSideBar.style.display = 'none'
//   }
// })

//make the default search on the top bar
// when user click that tab then search for the results getSearchResults
const defaultItemBox = document.getElementsByClassName("item");
for (let i = 0; i < defaultItemBox.length; i++) {
  defaultItemBox[i].addEventListener("click", (event) => {
    lodingBar.style.display = "block";
    setTimeout(() => {
      lodingBar.style.display = "none";
    }, 1000);
    getSearchResults(event.target.innerText);
    for (let j = 0; j < defaultItemBox.length; j++) {
      defaultItemBox[j].style.background = "#222222";
      defaultItemBox[j].style.color = "white";
    }
    event.target.style.background = "white";
    event.target.style.color = "black";
  });
}

// side nav bar when cliked
const barIcon = document.getElementById("barLeft");
const SideBar = document.getElementById("left-container-side-bar");
const innerBar = document.getElementById("innerBar");
//apply that only in the 800px mobile and tab view
let mobileQuary = window.matchMedia("(max-width:800px)");
window.addEventListener("resize", sBar);
function sBar() {
  if (window.innerWidth <= 800) {
    // document.getElementById("Innerbody").style.opacity = "0.3";
    barIcon.addEventListener("click", openCloseSideBar);
  } else {
    barIcon.removeEventListener("click", openCloseSideBar);
  }
}
let openCloseSideBar = () => {
  SideBar.style.transform = "translate(0px)";
  // if (mobileQuary.matches) {
  document.getElementById("Innerbody").style.opacity = "0.4";
};
if (mobileQuary.matches) {
  barIcon.addEventListener("click", openCloseSideBar);
}
innerBar.addEventListener("click", () => {
  SideBar.style.transform = "translate(-300px)";
  document.getElementById("Innerbody").style.opacity = "1";
});

// make the themes datk and light

