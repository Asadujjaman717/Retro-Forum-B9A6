const loadPost = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const allPost = data.posts;
    // console.log(post);
    displayPosts(allPost);
    
}

const displayPosts = allPost =>{
    // console.log(allPost);
    const postContainer = document.getElementById('lets-discuss-posts');
    // clear post container cards before adding new cards
    postContainer.textContent = '';
// <div class="">
        //         <img class="w-12 h-auto rounded-xl " src="${post.image}" alt="">
        // </div>
  allPost.forEach(post =>{
    console.log(post);
    // step 1: create a div
    const postCard = document.createElement('div');
    postCard.classList = `card bg-base-200 shadow-md rounded-lg flex flex-row justify-center lg:p-4 lg:m-4 p-2 m-2`;
    // step 3: set innerHTML
    postCard.innerHTML = `
            <div class="lg:pt-8">
                <img class="w-12 h-auto rounded-xl " src="${post.image}" alt="">
            </div>

               <div class="card-body">
                <div class="flex gap-4">
                  <h5># ${post.category}</h5>
                  <h5>Author: ${post.author.name}</h5>
                </div>
                <div class="">
                    <h2 class="card-title">${post.title}</h2>
                    <p class="mx-auto">${post.description}</p>
                </div>
                <hr>
                
                <div class="flex justify-between">

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

                 <div>
                    <button onclick="markAsRead('${post.id}')" class="btn btn-circle justify-center items-center bg-green-300">
                <i class="fa-solid fa-message"></i>
              </button>
                 </div>
                </div>

              </div>
            </div>
    `;
    // step 4: append child
    postContainer.appendChild(postCard);
  });

    // hide loading spinner
    toggleLoadingSpinner(false);

}

// mark as read section
const markAsRead = async (id) => {
    console.log('clicked mark as read', id);
    // Fetch the posts data
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?id=${id}`);
    const data = await res.json();

    // Filter to find the post by its 'id'
    const post = data.posts.find(post => post.id == id);
    console.log(post);

   displayPosts2(post);
     
};

const displayPosts2 = post =>{
    
    const postHighlightContainer = document.getElementById('message-highlights');
    // postHighlightContainer.textContent = '';
    
    const highlightCard = document.createElement('div');

    highlightCard.innerHTML = `
        <div class="flex flex-row justify-between items-start card bg-white shadow-md rounded-lg lg:p-4 mb-2">
            <p>${post.title}</p>
            <div class="flex justify-center items-center gap-1">
                <i class="fa-solid fa-eye"></i>
                <p>${post.view_count}</p>
            </div>
        </div>
    `;
    console.log(post.title);
    console.log(post.view_count);

    // Append the highlight card to the container
    postHighlightContainer.appendChild(highlightCard);
};

//display latest post
const latestPost = async () => {
    const res =await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    console.log(data);
    // console.log(data.cover_image);
    displayLatest(data);
}
const displayLatest = posts =>{
    const latestContainer = document.getElementById('latest-post-cards-container');

    posts.forEach(post =>{
        console.log(post);
        const latestCard = document.createElement('div');
        latestCard.classList = `card shadow-xl border-2 lg:col-span-1 col-span-3`;
    
     latestCard.innerHTML = ` 

            <div>
                <img class="p-2 rounded-2xl" src="${post.cover_image}" alt="">
            </div>    

            <div class="card-body">
              <div class="flex gap-1 justify-center items-center">
                <i class="fa-solid fa-calendar-days"> </i>
                <p>${post.author?.posted_date}</p>
              </div>
              <h5 class="font-semibold">${post?.title}</h5>
              <p>${post?.description}</p>
              <div class="flex gap-2">
                <div>
                  <img class="w-12 h-auto rounded-2xl" src="${post.profile_image}" alt="">
                </div>
                <div>
                  <h5>${post.author?.name}</h5>
                  <p>${post.author?.designation}</p>
                </div>
              </div>
            </div>
          </div>
    `;
    latestContainer.appendChild(latestCard);
});
}


// handle search
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    // console.log('search handle');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPost(searchText);
    
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

loadPost();
// latestPost();