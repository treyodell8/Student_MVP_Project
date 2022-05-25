console.log("hello")
const postBody = document.querySelector(".body-posts");
$(postBody).hide();
//Buttons for the nav-bar
const bodyDashboard = document.querySelector('.body-dashboard');
const postsBtn = document.querySelector('#posts');
$(postsBtn).click(function(){
    $(bodyDashboard).hide();
})

$(postsBtn).click(function(){
    $(postBody).show();
})


dataReturn()

function dataReturn() {
$.get("http://localhost:3000/api/users", function(data) {
    console.log(data[0].name);
})
}