var userForm = document.getElementById('userForm');
var userDetailsDiv = document.getElementById('userDetails');
var editButton = document.getElementById('editButton');
var userToEdit = null; // Reference to the user being edited

userForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  if (userToEdit) {
    // Update existing user details
    userToEdit.querySelector('.name').textContent = name;
    userToEdit.querySelector('.email').textContent = email;
    userToEdit.querySelector('.phone').textContent = phone;

    userToEdit = null;
    editButton.style.display = 'none';
  } else {
    // Create user object
    var user = {
      name: name,
      email: email,
      phone: phone
    };

    // Store user details in local storage
    localStorage.setItem('userDetails', JSON.stringify(user));

    // Display user details on the screen
    userDetailsDiv.innerHTML += `
      <div class="user">
        <h2>User Details:</h2>
        <p>Name: <span class="name">${user.name}</span></p>
        <p>Email: <span class="email">${user.email}</span></p>
        <p>Phone: <span class="phone">${user.phone}</span></p>
        <br/>
        <span>
          <button class="delete">Delete</button>
          <button class="edit">Edit</button>
        </span>
      </div>
    `;
  }

  // Reset the form
  userForm.reset();
});

// Handle delete and edit button click
userDetailsDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    var userDiv = e.target.parentNode.parentNode;
    userDiv.remove();
  }

  if (e.target.classList.contains('edit')) {
    var userDiv = e.target.parentNode.parentNode;
    var name = userDiv.querySelector('.name').textContent;
    var email = userDiv.querySelector('.email').textContent;
    var phone = userDiv.querySelector('.phone').textContent;

    // Populate the form with the existing values
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;

    userToEdit = userDiv;
    editButton.style.display = 'inline-block';
  }
});

editButton.addEventListener('click', function() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  // Update the displayed user details
  userToEdit.querySelector('.name').textContent = name;
  userToEdit.querySelector('.email').textContent = email;
  userToEdit.querySelector('.phone').textContent = phone;

  // Hide the edit button
  editButton.style.display = 'none';
  userToEdit = null;

  // Reset the form
  userForm.reset();
});
