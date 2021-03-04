document.addEventListener('DOMContentLoaded', function(){
    // Variables
    var txtPasswordNew      = document.getElementById('password-new');
    var txtPasswordConfirm  = document.getElementById('password-confirm');
    var btnSubmitPass       = document.getElementById('btn-submit');
    var resetPasswordForm   = document.getElementById('reset-password-form');
    var alertContainer      = document.querySelector('.alert-container');
    var cardLogin           = document.querySelector('.card.login');
    var passMessages        = document.querySelectorAll('.pass-message>.form-text');
    
    var redirectTime = 5;
    var spanTime;
    var redirectInterval;
    var redirectLink = "login.html";

    // Functions
    function setMessage(element, message=null){
        // if element contains all children, then set message value to all children.
        // if element only target one spesific children, then set message value to only that children.

        // passMessages[0] --> element below "password baru" field
        // passMessages[1] --> element below "konfirmasi password" field

        if (element === passMessages) {
            element.forEach(function(el){
                el.textContent = message;
            })
        } else {
            if (message !== null) {
                element.textContent = message;
            } else {
                element.textContent = "";
            }
        } 
    }

    function disableSubmitBtn(disable){
        if (disable) {
            btnSubmitPass.setAttribute("disabled", "true");
        } else {
            btnSubmitPass.removeAttribute("disabled");
        }
    }

    function handlePassword(){
        var password1 = txtPasswordNew.value;
        var password2 = txtPasswordConfirm.value;

        if (password1.length >= 5) {
            setMessage(passMessages[0],null);

            if (password2.length) {
                    if (password1 === password2) {
                        setMessage(passMessages, null);
                        disableSubmitBtn(false);
                    } else {
                        setMessage(passMessages[1], "• Password tidak sama");
                        disableSubmitBtn(true);
                    }
            } else { 
                setMessage(passMessages[1], null);
                disableSubmitBtn(true);
            }
                
        } else if (password1.length < 1) {
            setMessage(passMessages, null);
            disableSubmitBtn(true);
        } else {
            setMessage(passMessages[0], "• Password terlalu pendek (min. 5 karakter)");
            disableSubmitBtn(true);
        }
    }

    function handleSubmitPassword(){
        cardLogin.remove();
        alertContainer.innerHTML = `<div class="alert alert-info alert-dismissible mx-auto" role="alert">
            <b>Password berhasil direset.</b>
            <br> Anda akan diarahkan ke halaman login dalam <span class="redirect-time">${redirectTime}</span> detik.
        </div>`;
        spanTime = document.querySelector('.redirect-time');

        redirectInterval = setInterval(function(){
                                redirectTime--;
                                if (redirectTime < 0) {
                                    clearInterval(redirectInterval);
                                    window.location.href = redirectLink;
                                } else {
                                    spanTime.textContent = redirectTime;
                                }
                            }, 1000);
    }

    // Event Listeners
    txtPasswordNew.addEventListener('keyup', handlePassword)
    txtPasswordConfirm.addEventListener('keyup', handlePassword)
    resetPasswordForm.addEventListener('submit', function(e){
        e.preventDefault();
        e.stopPropagation();
        handleSubmitPassword();
    } )
});
