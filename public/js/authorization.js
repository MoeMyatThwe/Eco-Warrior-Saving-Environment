document.addEventListener("DOMContentLoaded", function () {
    checkTokenValidity();
});

function checkTokenValidity() {
    const token = localStorage.getItem('token');
    // const user_id = localStorage.getItem('user_id');
    // const expiryDate = localStorage.getItem('expiryDate');

    // const isTokenValid = isValidToken(expiryDate);

    if (!token ) {

        window.location.href = '/login.html';
    }
}