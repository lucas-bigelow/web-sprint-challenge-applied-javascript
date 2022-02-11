import axios from 'axios';

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //

  // create topics which everything will be appended to
  const topicsDiv = document.createElement("div");
  topicsDiv.classList.add("topics");

  // loop over the passed argument and add them as correct markup as we go
  topics.forEach(topic => {
    const currTopic = document.createElement("div");
    currTopic.classList.add("tab");
    currTopic.textContent = topic;

    topicsDiv.appendChild(currTopic);
  });

  // return the completed markup
  return topicsDiv;
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `http://localhost:5000/api/topics` (test it with a console.log!).
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  
  // we'll do this all in one step, but we'll make the api call, parse the data, and pass it into our tabs creator function
  axios.get("http://localhost:5000/api/topics")
    .then(resp => resp.data)
    .then(resp => {
      document.querySelector(selector).appendChild(Tabs(resp.topics));
    })
    .catch(err => console.error(err));
}

export { Tabs, tabsAppender }
