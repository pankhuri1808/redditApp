import reddit from './redditapi';
const searchForm=document.getElementById('search-form');
const searchInput=document.getElementById('search-input');

searchForm.addEventListener('submit',e=>{
  //get search term
const searchTerm=searchInput.value;
//get sort
const sortby=document.querySelector('input[name="sortby"]:checked').value;
//get limit
const getlimit=document.getElementById('limit').value;
//check input
if(searchTerm==''){
  showMessage('Please add a search term','alert-danger');
}
//clear input
searchInput.value='';
//search reddit
reddit.search(searchTerm,getlimit,sortby).then(results=>{
  console.log(results);
  let output='<div class="card-columns">';
  results.forEach(post=>{
   const image=post.preview?post.preview.images[0].source.url:'https://mashupawards.com/wp-content/uploads/2019/06/reddit-banner.png';
    output+=`
    <div class="card">
    <img class="card-img-top"src="${image}"alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>

    <p class="card-text">${truncateText(post.selftext,100)}</p>
    <a href="${post.url}" target="_blank"class="btn btn-primary">Read more</a>
   <hr>
   <span class="badge badge-secondary">Subreddit:${post.subreddit}</span>
   
   <span class="badge badge-dark">Score:${post.score}</span>
  </div>
</div>
    `;
  });
  output+='</div>';
  document.getElementById('results').innerHTML=output;
});
  e.preventDefault();
});
// Show message
function showMessage(message,className){
  // craete div
  const div=document.createElement('div');
// add classes
div.className=`alert ${className}`;
// add the text
div.appendChild(document.createTextNode(message));
//get parent
const searchContainer=document.getElementById('search-container');
const search=document.getElementById('search');
searchContainer.insertBefore(div,search);
//timeout
setTimeout(()=>document.querySelector('.alert').remove(),3000);
}
//truncate text
function truncateText(text,lim){
  const short=text.indexOf(' ',lim);
  if(short==-1) return text;
  return text.substring(0,short);
}