const postsContainer = document.querySelector('#post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 3;
let page = 1;

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await response.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
}

showPosts();
