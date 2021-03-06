const apiURL = window.location.origin;
const postBody = document.querySelector(".body-posts");
const createBody = document.querySelector(".body-create");
const bodyDashboard = document.querySelector('.body-dashboard');

//only the dashboard HTML body will appear when page initially runs
$(postBody).hide();
$(createBody).hide();

//Buttons for the nav-bar
const postsBtn = document.querySelector('#posts');
const dashBtn = document.querySelector('#dashboard');
const createBtn = document.querySelector('#create');

//When clicking on "view all posts"
$(postsBtn).click(function(){
    $(postBody).empty();
    $(bodyDashboard).hide();
    $(createBody).hide();
    $(postBody).show();
    getAll();
})

//When clicking on "dashboard"
$(dashBtn).click(function(){
    $(postBody).hide();
    $(createBody).hide();
    $(bodyDashboard).show();
})

//When clicking on "create a post"
$(createBtn).click(function(){
    $(postBody).hide();
    $(bodyDashboard).hide();
    $(createBody).show();
})

// //get requests for both of our APIs
// userReturn()

// function userReturn() {
// $.get("http://localhost:3000/api/users", function(data) {
//     for (var x = 0; x < data.length; x++) {
//         console.log(data);
//         }
//     });
//     $.get("http://localhost:3000/api/posts", function(data) {
//     })
// }

// postReturn();

// function postReturn() {
// $.get("http://localhost:3000/api/posts", function(data) {
//     for (var x = 0; x < data.length; x++) {
//     console.log(data);
//     }
// });
// }

//----------------------------------------------------//

async function getAll() {
        const data = await fetch("https://quiet-harbor-24229.herokuapp.com/api/users");
        const res = await data.json();
        console.log(res);
        res.forEach(element => {
            appendPosts(element);
        });
    
}

function appendPosts(res) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('postdiv');
    postDiv.classList.add(res.id)
    postBody.appendChild(postDiv);
    const name = document.createElement('div');
    const post = document.createElement('div');
    post.id = `post-content ${res.id}`;
    name.classList.add('text');
    post.classList.add('text');
    postDiv.appendChild(name);
    postDiv.appendChild(post);
    const nameValue = res.name;
    const postValue = res.post;
    name.textContent = nameValue;
    post.textContent = postValue;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList = res.id;
    deleteBtn.textContent = "I don't like this";
    postDiv.appendChild(deleteBtn);

    const updateBtn = document.createElement('button');
    updateBtn.textContent = "Change their opinion";
    updateBtn.classList.add(res.id);
    postDiv.appendChild(updateBtn);

    updateBtn.addEventListener('click', (e) => {
        updatePost(e)
    })

    deleteBtn.addEventListener('click', (e) => {
        deletePost(e)
    });
    
}

const createPostBtn = document.querySelector('#Create-Post');
createPostBtn.addEventListener('click', postCreate);

 async function postCreate() {
    let name = document.querySelector('#name-box').value;
    let post = document.querySelector('#post-block').value;
    let postRequest = {
        post: post,
        name: name
    }
    window.alert('Post Created!');
    name.value = '';
    post.value = '';
    fetch("https://quiet-harbor-24229.herokuapp.com/api/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(postRequest),
          })
        }



function deletePost(e) {
    const divToBeDeleted = {
        postid: parseInt(e.target.classList[0])
    }
    var elements = document.getElementsByClassName(e.target.classList);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    console.log(divToBeDeleted);
    // const divToBeDeleted = document.querySelector(postDiv);
    fetch("https://quiet-harbor-24229.herokuapp.com/api/users/", {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(divToBeDeleted)
          })
}


function updatePost(e) {
    const Alert = window.prompt('What would you like it to say?');
    if (Alert.length === 0) {
        return undefined;
    }
    const updateDiv = document.getElementById(`post-content ${e.target.classList}`);
    updateDiv.textContent = Alert;
    const divToBeUpdated = {
        postid: parseInt(e.target.classList[0]),
        post: Alert
    }
    console.log(divToBeUpdated);
    fetch("https://quiet-harbor-24229.herokuapp.com/api/users/", {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify(divToBeUpdated)
          })
}