//Part 1 API calls & inserting the images in the container
const publicAPIKey = "eJynl6zPWeujRjd0VZwCVOjlpc8jchwfvwmF5TSdCNw";
const protectedAPIKey = "sBCG6bEmiMVrJyGNYXMeJZiTdbmqCuQGHnjXUaNrGqI"; //DOES NOT WORK

const imagesContainer = document.querySelector(".main__images-container");

let researchedImage = "random";
let pageIndex = 1;

async function callAPI() {
  try {
    const urlAPI = `https://api.unsplash.com/search/photos?query=${researchedImage}&page=${pageIndex}&per_page=30&order_by=popular&client_id=${publicAPIKey}`;

    const response = await fetch(urlAPI);
    const images = await response.json();

    insertImages(images.results);
    console.log(images);
  } catch (APIError) {
    console.error({ APIError });
  }
}

callAPI();

function insertImages(arrayOfImages) {
  for (image of arrayOfImages) {
    const { alt_description, description, urls } = image;
    const imageHTMLNode = `
       <img src="${urls.regular}" alt="${alt_description}" title="Description:${
      description === "null" ? description : ""
    } ${alt_description}" class="main__images">
    `;

    imagesContainer.innerHTML += imageHTMLNode;
  }
}

// let randomArray = [{ name: "test 1" }, { name: "test 2" }];
// insertImages(randomArray);

//Part 2 Infinite scroll with the intersection observers
// const imageCards = document.getElementsByClassName("main__images");
// const observer = new IntersectionObserver((entries) => {
//   console.log(entries);
// });

// observer.observe(imageCards[0]);

//Part 3 Research images
