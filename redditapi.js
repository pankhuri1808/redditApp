export default{
  search:function(searchTerm,getlimit,sortby){
   return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortby}&limit=${getlimit}`)
  
  .then(res=>res.json())
  .then(data=>data.data.children.map(data=>data.data))
  .catch(err=>console.log(err));
  }
}