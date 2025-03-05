const nicknameInput = document.getElementById('nickname') as HTMLInputElement;
const saveButton = document.getElementById('saveButton') as HTMLButtonElement;


saveButton.addEventListener('click', () => {
  const nickname = nicknameInput.value;

  if (nickname) {
    localStorage.setItem('playerNickname', nickname);
    alert('Nickname saved successfully!');
  } else {
    alert('Please enter a nickname!');
  }
});


