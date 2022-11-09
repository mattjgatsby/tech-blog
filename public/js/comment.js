const commentFormHandler = async function (event) {
    event.preventDefault();

    const commentText = document.querySelector('#comment-input')

    const response = await fetch('api/comments', {
        method: 'POST',
        body: JSON.stringify({
            comment: commentText.value 
        }),
        headers: {
            'content-type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.reload()
    } else {
        alert("Could not post comment")
    }
};
document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler)