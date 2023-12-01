function saveToLocalStorage(event) {
    event.preventDefault();
  
    let name = event.target.Username.value;
    let email = event.target.emailId.value;
    let phoneNumber = event.target.phonenumber.value;
    let dob = event.target.dob.value;
  
  
  
    if (localStorage.getItem(email)) {
      // If the email exists, show an error message or handle it as per your requirement
      console.log("User with this email already exists!");
      return;
    }
  
  
    let obj = {
      name,
      email,
      phoneNumber,
      dob
    };
  
    // Save the object to the API using Axios
    axios.post("https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp", obj)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Save the object to local storage
    localStorage.setItem(obj.email, JSON.stringify(obj));
  
    // Show the new user on the screen
    showDisplay(obj);
  
    // Clear the input fields after saving
    event.target.reset();
  }
  
  // Event listener for form submission
  document.getElementById("userForm").addEventListener("submit", saveToLocalStorage);
  
  // Load data from local storage and display it on the screen
  document.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp")
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          let userDetailsObj = response.data[i];
          showDisplay(userDetailsObj);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  // Function to display the user object on the screen
  function showDisplay(obj) {
    let parentItem = document.getElementById("AddItem");
    let li = document.createElement('li');
    li.textContent = obj.name + ' ' + obj.email + ' ' + obj.phoneNumber + ' ' + obj.dob;
  
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      removeFromLocalStorage(obj.email);
      parentItem.removeChild(li);
    });
  
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      populateFormWithUser(obj);
    });
  
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    parentItem.appendChild(li);
  }
  function deleteFromCrudCrud(userId) {
    axios.delete(`https://crudcrud.com/api/5ba135b43e9049419b5d68257381d317/BookingappointmentApp/${userId}`)
      .then((response) => {
        console.log("User deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // Function to remove a user from localStorage based on their email
  function removeFromLocalStorage(email) {
    localStorage.removeItem(email);
  }
  
  // Function to populate the form with user details for editing
  function populateFormWithUser(obj) {
    document.getElementById("userForm").elements.Username.value = obj.name;
    document.getElementById("userForm").elements.emailId.value = obj.email;
    document.getElementById("userForm").elements.phonenumber.value = obj.phoneNumber;
    document.getElementById("userForm").elements.dob.value = obj.dob;
  }