const accesskey = "_BkL0u_eZYlmZf0vu7w205JcFmOYR9tw3JGqFkBPLCs";

const formElement=document.querySelector("form");
const InputElement=document.getElementById("search-input");
const SearchResults=document.querySelector(".serach-results");
const ShowMore=document.getElementById("show-more-button");


let inpuData = "";
let page = 1;

async function SearchImages() {
    inpuData = InputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inpuData}&client_id=${accesskey}`;
   // const url = `https://www.bing.com/search?pglt=41&q=unsplash&cvid=42888985d1fe41a79db256c35e2b63e7&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyBggCEAAYQDIGCAMQABhAMgYIBBAuGEAyBggFEAAYQDIGCAYQRRg8MgYIBxBFGDwyBggIEEUYPNIBCDE5MjlqMGoxqAIAsAIA&FORM=ANNTA1&PC=LCTS`
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        SearchResults.innerHTML = "";

    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("serch-result");

        const Image = document.createElement('img');
        Image.src=result.urls.small;
        Image.alt=result.alt_description;

        const ImageLink = document.createElement('a');
        ImageLink.href = result.links.html; 
        ImageLink.target = "_blank";
        ImageLink.textContent = result.alt_description;

        imageWrapper.appendChild(Image);
        imageWrapper.appendChild(ImageLink);
        SearchResults.appendChild(imageWrapper);

    });
    page++
    if(page > 1){
        ShowMore.style.display = "block";
    }
}

formElement.addEventListener("Submit", (event) => {
    event.preventDefault()
    page = 1;
    SearchImages();
})

ShowMore.addEventListener("click", ()=>{
    SearchImages();
})