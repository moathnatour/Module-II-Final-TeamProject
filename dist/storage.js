const nicknameInput = document.getElementById('nickname');
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
    const nickname = nicknameInput.value;
    if (nickname) {
        localStorage.setItem('playerNickname', nickname);
        alert('Nickname saved successfully!');
    }
    else {
        alert('Please enter a nickname!');
    }
});
