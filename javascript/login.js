
const forms = document.querySelector('.forms');
const ShowHide = document.querySelectorAll('.eye-icon');
const links = document.querySelectorAll('.link');

ShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener('click', () => {
        let Fields = eyeIcon.parentElement.parentElement.querySelectorAll('.password');

        Fields.forEach(password => {
            if (password.type === 'password') {
                password.type = 'text';
                eyeIcon.classList.replace('bx-hide', 'bx-show');
                return;
            }
            password.type = 'password';
            eyeIcon.classList.replace('bx-show', 'bx-hide');
        })
    })
})

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        forms.classList.toggle('show-signup')
    })
})