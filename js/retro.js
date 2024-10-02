const loadPost = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts?category=coding');
    const data = await res.json();
    const allPost = data.posts;
    // console.log(post);
    displayPosts(allPost);
}

const displayPosts = allPost =>{
    // console.log(allPost);
    const postContainer = document.getElementById('lets-discuss-posts');
  allPost.forEach(post =>{
    console.log(post);
    // step 1: create a div
    const postCard = document.createElement('div');
    postCard.classList = `card bg-base-200 shadow-xl rounded-lg flex flex-row items-center justify-center px-3 m-2`;
    // step 3: set innerHTML
    postCard.innerHTML = `
        <div>
                <img src="${post.image}" alt="">
              </div>     

              <div class="card-body">
                <div class="flex gap-4">
                  <h5># ${post.category}</h5>
                  <h5>Author: ${post.author.name}</h5>
                </div>
                <h2 class="card-title">${post.title}</h2>
                <p class="mx-auto">${post.description}</p>
                <hr>
                
                
                <div class="flex gap-4">
                  <div class="flex justify-between items-center gap-1">
                    <i class="fa-solid fa-comment"></i>
                    <p>${post.comment_count}</p>
                  </div>
                  <div class="flex justify-between items-center gap-1">
                    <i class="fa-solid fa-eye"></i>
                    <p>${post.view_count}</p>
                  </div>
                  <div class="flex justify-between items-center gap-1">
                    <i class="fa-solid fa-clock"></i>
                    <p>${post.posted_time}min</p>
                  </div>
                </div>

              </div>
            </div>
    `;
    // step 4: append child
    postContainer.appendChild(postCard);
  })
}
loadPost();