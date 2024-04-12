const baseUrl = 'http://localhost:3000'; // Update with your API base URL

document.addEventListener('DOMContentLoaded', function() {
  //event listener to the search button
  const searchButton = document.querySelector('.Search-btn');
  searchButton.addEventListener('dblClick', handleDblClick);
  function handleDblClick() {
    alert ('searching...')
  }
  
  //Syntax: Adding event listeners to all "Add" buttons
  const addButtons = document.querySelectorAll('.btn-Add');
  addButtons.forEach(button => {
    button.addEventListener('click', addDestination);
  });

  //Syntax: Add event listeners to all "Remove" buttons
  const removeButtons = document.querySelectorAll('.btn-Remove');
  removeButtons.forEach(button => {
    button.addEventListener('onClick', handleOnClick);
    function handleOnClick() {
      alert ('destination removed')
    }
  });

  // event listeners to all "Edit" buttons
  const editButtons = document.querySelectorAll('.btn-Edit');
  editButtons.forEach(button => {
    button.addEventListener('click', handleClick);
    function handleClick() {
      alert ('destination edited')
    }
  });

  // Add event listener to the form for submitting feedback
  const feedbackForm = document.querySelector('.submit-btn');
  feedbackForm.addEventListener('submit', handleSubmit);
  function handleSubmit() {
    alert ('submission successful!')
  }
});

function addDestination(event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  const destinationId = card.dataset.id;
  const destinationTitle = card.querySelector('.card-title').textContent;

  //function for adding a destination
  fetch(`http://localhost:3000/destinations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: destinationId,
      name: destinationTitle,
    })
  })
  .then(response => {
    if (response.ok) {
      console.log(`Successfully added destination: ${destinationTitle}`);
      fetchData();
      alert('Destination added');
    } else {
      throw new Error('Failed to add destination');
    }
  })
  .catch(error => console.error('Error adding destination:', error));
}
//PATCH API
fetch(`http://localhost:3000/destinations`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    
  })
  .then(response => {
    if (response.ok) {
      console.log(`Successfully edited destination: ${destinationTitle}`);
      fetchData();
      alert('Destination edited');
    } else {
      throw new Error('Failed to edit destination');
    }
  })
  .catch(error => console.error('Error editting destination:', error));



function removeDestination(event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  const destinationId = card.dataset.id;

  //function for removing a destination
  fetch(`http://localhost:3000/destinations/${destinationId}`, {
    method: 'DELETE',
    header: {
      'Content-Type': 'application/json'
  },
  })
  .then(response => {
    if (response.ok) {
      console.log(`Successfully removed destination with ID: ${destinationId}`);
      fetchData();
      alert('Destination removed');
    } else {
      throw new Error('Failed to remove destination');
    }
  })
  .catch(error => console.error('Error removing destination:', error));
}

function editDestination(event) {
  event.preventDefault();
  const card = event.target.closest('.card');
  const destinationId = card.dataset.id;
  const destinationTitle = card.querySelector('.card-title').textContent;

  // Placeholder function for editing a destination
  console.log(`Editing destination: ${destinationTitle}`);
  alert('Editing destination');
}

function submitFeedback(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Placeholder function for submitting feedback
  console.log(`Submitting feedback:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
  alert('Submission successful');
}

function fetchData() {
  fetch(`http://localhost:3000/destinations`)
    .then(response => response.json())
    .then(destinations => displayDestinations(destinations))
    .catch(error => console.error('Error fetching destinations:', error));
}

function fetchData(searchInput = '') {
  let url = `http://localhost:3000/destinations`;
  if (searchInput) {
    url += `?search=${searchInput}`;
  }
  fetch(url)
    .then(response => response.json())
    .then(destinations => displayDestinations(destinations))
    .catch(error => console.error('Error fetching destinations:', error));
}

function displayDestinations(destinations) {
  const destinationList = document.getElementById('destinations');
  destinationList.innerHTML = '';

  destinations.forEach(destination => {
    const destinationCard = document.createElement('div');
    destinationCard.classList.add('card');
    destinationCard.dataset.id = destination.id;
    destinationCard.innerHTML = `
      <img class="card-image" src="${destination.image}" alt="${destination.name}">
      <div class="card-body">
        <h5 class="card-title">${destination.name}</h5>
        <p class="card-text">${destination.description}</p>
        <a href="#" class="btn-Add">Add</a>
        <a href="#" class="btn-Remove">Delete</a>
        <a href="#" class="btn-Edit">Edit</a>
      </div>
    `;
    destinationList.appendChild(destinationCard);
  });
}
