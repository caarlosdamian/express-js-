const output = document.querySelector('#output');
const button = document.querySelector('#get-post-btn');
const form = document.querySelector('#add-post-form');

// get and show posts
async function showPosts() {
  try {
    const res = await fetch('http://localhost:8000/api/posts');
    if (!res.ok) {
      throw new Error('Failt to fetch posts');
    }
    const posts = await res.json();
    output.innerHTML = '';
    posts.forEach((element) => {
      const postElement = document.createElement('div');
      postElement.textContent = element.title;
      output.appendChild(postElement);
    });
  } catch (error) {
    console.log(error);
  }
}

async function addPost(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const title = formData.get('title');
  try {
    const res = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error('Fail to add post ');
    }
    const newPost = await res.json();
    const postel = document.createElement('div');
    postel.textContent = newPost.title;
    output.appendChild(postel);
    showPosts();
  } catch (error) {
    console.log(error);
  }
}
// event listener
form.addEventListener('submit', addPost);
button.addEventListener('click', showPosts);
