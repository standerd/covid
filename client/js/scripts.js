const submitForm = (event) => {
  event.preventDefault();
//   console.log(event.target.elements.fname.value);
  fetch("http://localhost:3000/post", {
      method : 'post'
  })
  .then(res => res.json())
  .then(result => console.log(result))
  .catch(err => console.log(err))
};
