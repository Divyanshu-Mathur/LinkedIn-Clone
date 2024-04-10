// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select all like buttons
    const likeButtons = document.querySelectorAll('.post-actions .list-post-option:first-child a');

    // Attach click event listeners to each like button
    likeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Prevent the default anchor action
            event.preventDefault();

            // Toggle the class of the like button to switch between thumbs-up and thumbs-down icons
            const likeIcon = this.querySelector('i');
            if (likeIcon.classList.contains('fa-regular')) {
                likeIcon.classList.remove('fa-regular');
                likeIcon.classList.add('fa-solid');
                // Increment the number of likes
                const postDetails = this.closest('.post').querySelector('.post-details');
                const likesCountSpan = postDetails.querySelector('.post-reactions span');
                likesCountSpan.textContent = parseInt(likesCountSpan.textContent) + 1;
            } else {
                likeIcon.classList.remove('fa-solid');
                likeIcon.classList.add('fa-regular');
                // Decrement the number of likes if the button is unliked
                const postDetails = this.closest('.post').querySelector('.post-details');
                const likesCountSpan = postDetails.querySelector('.post-reactions span');
                likesCountSpan.textContent = parseInt(likesCountSpan.textContent) - 1;
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', function () {
    // Select all comment buttons
    const commentButtons = document.querySelectorAll('.post-actions .list-post-option:nth-child(2) a');

    // Attach click event listeners to each comment button
    commentButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Prevent the default anchor action
            event.preventDefault();

            // Find the closest post
            const post = this.closest('.post');

            // Create an input field for entering a comment
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.placeholder = 'Add a comment...';
            commentInput.classList.add('comment-input');

            // Append the input field to the post
            post.appendChild(commentInput);

            // Focus on the input field
            commentInput.focus();

            // Add event listener to the input field to handle comment submission
            commentInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    const userComment = e.target.value.trim();
                    if (userComment !== '') {
                        // Find the post's comment display container
                        const commentDisplay = post.querySelector('.post-comments-display');

                        // Create a new div for the comment
                        const newComment = document.createElement('div');
                        newComment.classList.add('user-comment');
                        newComment.textContent = userComment;

                        // If there are no existing comments, append the new comment directly
                        if (commentDisplay.children.length === 0) {
                            commentDisplay.appendChild(newComment);
                        } else {
                            // Store the new comment in an array
                            const commentsArray = Array.from(commentDisplay.children);
                            commentsArray.push(newComment);

                            // Clear the comment display container
                            commentDisplay.innerHTML = '';

                            // Append comments from the array in reverse order
                            for (let i = commentsArray.length - 1; i >= 0; i--) {
                                commentDisplay.appendChild(commentsArray[i]);
                            }
                        }

                        // Clear the input field
                        e.target.value = '';

                        // Remove the input field from the post
                        post.removeChild(commentInput);
                    }
                }
            });
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const postPictureBtn = document.querySelector('.post-picture-btn');
    const postPictureModal = document.querySelector('.post-picture-modal');
    const postContent = document.querySelector('.post-content');

    postPictureBtn.addEventListener('click', function () {
        postPictureModal.style.display = 'block';
    });

    const imageInput = document.querySelector('.image-input');
    const textInput = document.querySelector('.text-input');
    const postButton = document.querySelector('.post-button');

    postButton.addEventListener('click', function () {
        const enteredText = textInput.value.trim();
        const file = imageInput.files[0];

        if (enteredText !== '' || file) {
            if (enteredText !== '') {
                const textElement = document.createElement('p');
                textElement.textContent = enteredText;
                postContent.appendChild(textElement);
                textInput.value = '';
            }

            if (file) {
                const imgElement = document.createElement('img');
                const reader = new FileReader();
                reader.onload = function () {
                    imgElement.src = reader.result;
                    postContent.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
                imageInput.value = '';
            }

            postPictureModal.style.display = 'none';
        } else {
            alert('Please enter text or upload an image.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.querySelector('.post-button');
    const textInput = document.querySelector('.text-input');
    const imageInput = document.querySelector('.image-input');
    const postForm = document.querySelector('.post-form');

    postButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Check if text input or image input is not empty
        if (textInput.value.trim() !== '' || imageInput.value.trim() !== '') {
            // Create a new post element
            const newPost = document.createElement('section');
            newPost.classList.add('post');

            // Create elements for post content
            const postText = document.createElement('p');
            postText.textContent = textInput.value.trim();
            const postImage = document.createElement('img');
            postImage.src = imageInput.value.trim();

            // Append post content to new post element
            newPost.appendChild(postText);
            newPost.appendChild(postImage);

            // Insert new post element at the beginning of post form
            postForm.insertBefore(newPost, postForm.firstChild);

            // Clear input fields
            textInput.value = '';
            imageInput.value = '';
        } else {
            // Show error message if both text and image inputs are empty
            alert('Please enter text or upload an image.');
        }
    });
});
