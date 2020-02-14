import "./sass/style.scss";

("use strict");

const form = document.querySelector(".form");
const input = form.querySelector("input");
const button = document.querySelector(".form-button");
const container = document.querySelector(".image-container");
const images = document.querySelector(".images");

// Info button click
images.addEventListener("click", handleClick);

function handleClick(e) {
  e.preventDefault();
  if (e.target.nodeName === "BUTTON") {
    const par = e.target.parentNode.parentNode.children[3];
    const link = e.target.parentNode.parentNode.children[4].firstElementChild;
    const div = e.target.parentNode.parentNode.firstElementChild;

    div.classList.toggle("overlay");
    par.classList.toggle("active");
    link.classList.toggle("active");
  }
}

// Fetch request

button.addEventListener("click", handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();

  const text = input.value;

  fetch(
    `http://api.giphy.com/v1/stickers/search?q=${text}&api_key=O3iJIz4KNHqyrwfM88y7Abn9WA2607z0&limit=8`
  )
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("Error while fetching " + response.statusText);
    })
    .then(data => {
      let res;
      data.data.forEach(arr => {
        res = `
          <div class="image-container__wrapper ">
         <div> </div>
          <img src=${arr.images.downsized_large.url} alt="some"  width="200" class="image-container__gif"/>
          <div class="image-container__par">
          <p class="paragraph">${arr.title}</p>
          <button class="img-button" type="button"></button>
          </div>
         
          <p class="overlay-par">${arr.images.original.width}x${arr.images.original.height}</p>
           <div>
          <input type="button" value="original" class="overlay-btn" onclick="window.open('${arr.images.original.url}')" />
           </div>
           </div>
          `;

        container.insertAdjacentHTML("afterend", res);
        form.reset();
      });
    })
    .catch(error => {
      console.log(error);
    });
}
