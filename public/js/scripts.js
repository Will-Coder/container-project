const homepage = () => {
  fetch(`api/containers`)
    .then(response => response.json())
    .then(containers => renderStories(containers));

  const renderStories = containers => {
    console.log(containers);
    containers.forEach(container => {
      containerEl = document.createElement('div');
      containerEl.innerHTML = `
    <img src="img/${container.image}" />
    <h3><a href="detail.html?container=${container._id}">${container.title}</a></h3>
    <p>${container.description}</p>
    <a class="del" data-id=${container._id} href="#">Delete</a>
    `;
      document.querySelector('#root').append(containerEl);
    });

    const deleteBtns = document.querySelectorAll('.del');
    console.log(deleteBtns);
    const delBtns = Array.from(deleteBtns);
    console.log(delBtns);
    delBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        fetch(`api/containers/${btn.dataset.id}`, {
          method: 'DELETE'
        });
        e.preventDefault();
        location.reload();
      });
    });
  };
};

const detail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const containerId = urlParams.get('container');
  console.log(containerId);
  fetch(`api/containers/${containerId}`)
    .then(response => response.json())
    .then(container => renderStory(container));

  const renderStory = container => {
    containerEl = document.createElement('div');

    containerEl.innerHTML = `
      <img src="img/${container.image}" />
      <h3>${container.title}</h3>
      <p>${container.description}</p>
      <h4>Ingredients</h4>
      <ul>
        ${container.ingredients
          .map(ingredient => `<li>${ingredient}</li>`)
          .join('')}
      </ul>
      <h4>Preparation</h4>
      <ul>
        ${container.preparation.map(prep => `<li>${prep.step}</li>`).join('')}
      </ul>
      <a href="/">Back</a>
  `;
    document.querySelector('#root').append(containerEl);
    // NEW
    const editForm = document.querySelector('form');
    editForm.title.value = container.title;
    editForm.image.value = container.image;
    editForm.description.value = container.description;
    // console.log(editForm.description);
    // END NEW
  };
};

const updateContainer = () => {
  const editForm = document.querySelector('form');
  const urlParams = new URLSearchParams(window.location.search);
  const containerId = urlParams.get('container');

  const updatedContainer = {
    title: editForm.title.value,
    image: editForm.image.value,
    description: editForm.description.value
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(updatedContainer),
    headers: { 'Content-Type': 'application/json' }
  };

  fetch(`api/containers/${containerId}`, options)
    .then(response => console.log(response))
    .then(() => location.reload()),
    event.preventDefault();
};
