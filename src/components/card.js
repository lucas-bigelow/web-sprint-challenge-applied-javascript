import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // step 1 is to create all the elements
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const imgContainer = document.createElement("div");
  const authorPhoto = document.createElement("img");
  const imgCredits = document.createElement("span");

  // step 2 is to add the nonspecific data (and event listener in this case)
  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  imgContainer.classList.add("img-container");

  card.addEventListener("click", evt => {
    evt.preventDefault();
    console.log(article.headline);
  })

  // step 3 is to add the data dependent on the argument
  headline.textContent = article.headline;
  authorPhoto.src = article.authorPhoto;
  imgCredits.textContent = `By: ${article.authorName}`;

  // step 4 is to stitch it all together (in order of inheritance) and return card
  imgContainer.appendChild(authorPhoto);

  author.appendChild(imgContainer);
  author.appendChild(imgCredits);

  card.appendChild(headline);
  card.appendChild(author);

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get("http://localhost:5000/api/articles")
    .then(resp => resp.data)
    .then(resp => {
      // loop over the articles after the data has been parsed (articles is an object, so looping requires turning it into an array)
      Object.keys(resp.articles).forEach(article => {
        // now loop over the author data in each article, create a card, and append it
        resp.articles[article].forEach(author => { 
          document.querySelector(selector).appendChild(Card(author));
        })
      })
    })
    .catch(err => console.error(err));
}

export { Card, cardAppender }
