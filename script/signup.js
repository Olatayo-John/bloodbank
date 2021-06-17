const signUpBtn = document.getElementById('submit');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const gender = document.getElementById('gender');
const Errorfirst_name = document.getElementById('first_nameError');
const Errorlast_name = document.getElementById('last_nameError');
const Erroremail = document.getElementById('emailError');
const inValidemail = document.getElementById('emailInvalidError');
const Errorpassword = document.getElementById('passwordError');
const invalidpassword = document.getElementById('passwordInvalidError');
const Errorgender = document.getElementById('genderError');
const error = document.getElementsByClassName('error');


signUpBtn.addEventListener('click', registerUser)


const validateInput = async () => {
    let isValid = true
    const first_nameError = {};
    const last_nameError = {};
    const emailError = {};
    const passwordError = {};
    const genderError = {};
    const formData = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
        gender: gender.value,
    }
    if (formData.first_name === '') {
        first_nameError.empty = 'First name is empty';
        isValid = false
    }
    if (formData.last_name === '') {
        last_nameError.empty = 'Last name is empty';
        isValid = false
    }
    if (formData.email === '') {
        emailError.empty = 'Email is empty';
        isValid = false
    }
    if (!formData.email.includes('@')) {
        emailError.valid = 'Email is invalid';
        isValid = false
    }
    if (formData.password === '') {
        passwordError.empty = 'Password is empty';
        isValid = false
    }
    if (formData.password === '') {
        passwordError.valid = 'Password should be more than 8 characters long';
        isValid = false
    }
    if (formData.gender === '') {
        genderError.empty = 'Gender is empty';
        isValid = false
    }
    return {
        isValid: isValid,
        first_nameError,
        last_nameError,
        emailError,
        passwordError,
        genderError,
    }
}

async function registerUser(event) {
    event.preventDefault();

    const { isValid, first_nameError, last_nameError, emailError, passwordError, genderError } = await validateInput();
    if (isValid === false) {
        // return false
        Object.keys(first_nameError).map(item => {
            Errorfirst_name.innerHTML = first_nameError[item]
        })
        Object.keys(last_nameError).map(item => {
            Errorlast_name.innerHTML = last_nameError[item]
        })
        Object.keys(emailError).map(item => {
            Erroremail.innerHTML = emailError[item]
        })

        Erroremail.innerHTML = emailError.empty
        inValidemail.innerHTML = emailError.valid

        Errorpassword.innerHTML = passwordError.empty
        invalidpassword.innerHTML = passwordError.valid
        Object.keys(genderError).map(item => {
            Errorgender.innerHTML = genderError[item]
        })
    }
    else {
        // const xhr = new XMLHttpRequest();
        // const apiURl = `controller/signup.controller.php`
        // const apiURl = `controller/signup.controller.php`
        // const headers = {
        //     "Content-Type": "application/json",
        //     "Accept": "application/json",
        // }
        // const body = {
        //     first_name: first_name,
        //     last_name: last_name,
        //     email: email,
        //     password: password,
        //     gender: gender,
        // };
        // xhr.open('POST', `${apiURl}`, true)
        // xhr.setRequestHeader("content-type", "application/x-www-form-encoded")
        // xhr.setRequestHeader('headers', `${headers}`);
        // xhr.send(body)
        // xhr.onload = function () {
        //     console.log('users', this.responseText)
        // }

        var apiURl = 'controller/signup.controller.php';
        var fname_v = $("#first_name").val();
        var lname_v = $("#last_name").val();
        var email_v = $("#email").val();
        var pwd_v = $("#password").val();
        var gender_v = $("#gender").val();

        $.ajax({
            method: "post",
            url: apiURl,
            dataType: 'json',
            data: {
                fname_v: fname_v,
                lname_v: lname_v,
                email_v: email_v,
                pwd_v: pwd_v,
                gender_v: gender_v,
            },
            success: function (data) {
                console.log(data);

                // if (data.status === "error") {
                //     console.log('error');
                // } else if (data.status === "invalid") {
                //     console.log("success");
                // }
            }
        });

    }
    // const first_name = $("#first_name").val();
    // const last_name = $("#last_name").val();
    // const email = $("#email").val();
    // const password = $("#password").val();
    // const gender = $("#gender").val();
}
