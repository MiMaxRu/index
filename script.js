document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
  
    var phoneInput = document.getElementById('phoneInput');
    var phoneNumber = phoneInput.value;
  
    // Отправка номера телефона на сервер
    fetch('/send_phone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: phoneNumber })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data); // Ответ от сервера
      // Дополнительные действия после получения ответа от сервера
  
      // Например, очистка поля ввода
      phoneInput.value = '';
    })
    .catch(error => {
      console.error('Ошибка:', error);
      // Обработка ошибок
    });
  });
  