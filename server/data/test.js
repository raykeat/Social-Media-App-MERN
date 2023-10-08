const data = {
    firstname: "Ray",
    lastname: "Teoh",
    email: "teohraykeat@gmail.com",
    password: "cummingonsavannah",
    picturepath: "",
    friends: [],
    location: "San Francisco",
    occupation: "Software Engineer"
  };
  
  fetch('http://localhost:3001/auth/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Specify the content type as JSON
    },
    body: JSON.stringify(data) // Convert data to JSON format
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  