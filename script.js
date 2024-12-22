// Formun submit olmasını engellemek ve validasyonu yapmak
document.querySelector('form').addEventListener('submit', function(e) {
    // Formdaki input ve textarea elemanlarını seç
    let name = document.querySelector('input[type="text"]');
    let email = document.querySelector('input[type="email"]');
    let message = document.querySelector('textarea');

    // Boş alanları kontrol et
    if (!name.value || !email.value || !message.value) {
        e.preventDefault(); // Formun gönderilmesini engelle
        alert("Lütfen tüm alanları doldurun!"); // Uyarı mesajı
    } else {
        // E-posta adresi formatını kontrol et
        if (!validateEmail(email.value)) {
            e.preventDefault(); // Formun gönderilmesini engelle
            alert("Lütfen geçerli bir e-posta adresi girin.");
        }
    }
});

// E-posta adresinin geçerli olup olmadığını kontrol eden fonksiyon
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
