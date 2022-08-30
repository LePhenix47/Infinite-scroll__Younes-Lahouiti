//Part 1 inserting the images in the container with an infinite scroll
const publicAPIKey = "eJynl6zPWeujRjd0VZwCVOjlpc8jchwfvwmF5TSdCNw";
const protectedAPIKey = "sBCG6bEmiMVrJyGNYXMeJZiTdbmqCuQGHnjXUaNrGqI"; //DOES NOT WORK

const imagesContainer = document.querySelector(".main__images-container");

const errorMessageParagraph = document.querySelector(".error-message");

const inputElement = document.querySelector(".main__input");

let researchedImage = "random";
let pageIndex = 1;

const imageCards = document.getElementsByClassName("main__images");

function addNewImagesAfterScroll(entries) {
  console.log("Entry", entries[0]);
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    callAPI();
  }
}
const observer = new IntersectionObserver(addNewImagesAfterScroll, {
  rootMargin: "25%",
});

observer.observe(errorMessageParagraph);

async function callAPI() {
  try {
    const urlAPI = `https://api.unsplash.com/search/photos?query=${researchedImage}&page=${pageIndex}&per_page=30&order_by=popular&client_id=${publicAPIKey}`;

    const response = await fetch(urlAPI);
    const images = await response.json();

    if (inputElement.value !== "" && images.total === 0) {
      errorMessageParagraph.textContent = `Couldn't find any images for the query "${inputElement.value}", sorry ¯\\_(ツ)_/¯`;
      return;
    }

    insertImages(images.results);
    console.log("Images: ", images);
    console.log(
      "%cAmount of images in container = ",
      "background: red;",
      imageCards.length === undefined ? "Empty" : imageCards.length
    );
  } catch (APIError) {
    console.error({ APIError });
    errorMessageParagraph.textContent = `Error found! ${APIError.message} (╯°□°）╯︵ ┻━┻`;
  }
}
callAPI();

function insertImages(arrayOfImages) {
  for (image of arrayOfImages) {
    const { alt_description, urls } = image;
    const imageHTMLNode = `
       <img src="${
         urls.regular
       }" alt="${alt_description}" title="Description: ${
      alt_description === "null"
        ? " [No description was provided by the author]"
        : alt_description
    }" class="main__images" loading="lazy">
    `;

    imagesContainer.innerHTML += imageHTMLNode;
  }
}

//Part 2 Research images
inputElement.addEventListener("change", handleSearchRequest);

function handleSearchRequest(e) {
  if (this.value === "") {
    console.log("The vaue of the input element is empty!");
    imagesContainer.innerHTML = "";
    pageIndex = 1;
    researchedImage = "random";
    callAPI();
    return;
  }
  console.log(e.target.value);
  researchedImage = e.target.value;

  imagesContainer.innerHTML = "";
  callAPI();
}
