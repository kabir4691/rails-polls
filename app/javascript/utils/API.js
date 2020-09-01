const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
}

export default {
  postNewTask: (url, bodyObject) => {
    return fetch(url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyObject)
      }
    ).then(response => {
      if (!(response.ok)) {
        throw response;
      }
      return response.json();
    })
  }
}