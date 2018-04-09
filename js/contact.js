let wrapper = document.querySelector('.wrapper');
let sendButton = document.getElementById("js_send");
let form_id_js = "contactForm";
let data_js = {
    "access_token": "w7t3n8h61bcuftfgna8i4f7g"
};


//  Form Validation
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                form.classList.add('was-validated');
                if (form.checkValidity() === false) {
                event.stopPropagation();
                return false;
                } else {
                    js_send();
                    form.classList.remove('was-validated');
                }
            }, false);
        });
    }, false);    
})();

// when successfully sent email
function js_onSuccess() {
    $(".wrapper").addClass("bounceOutRight");
    setTimeout(function(){
        sendButton.value = 'Send';
        sendButton.setAttribute("title", "You have just sent an email, please wait 2 minutes.");
        clearData();
        $(".wrapper").removeClass("bounceOutRight"); 
    }, 2000);

    setTimeout(function(){
        sendButton.disabled = false;
        sendButton.removeAttribute("title");
    }, 120000);
}

// when problem with sending an email
function js_onError(error) {
    $("#limitReached").removeClass("d-none");
    //redirect
    // window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}

// clear form after being sent
function clearData(){
    document.querySelector("#" + form_id_js + " [name='message']").value = "";
    document.querySelector("#" + form_id_js + " [name='name']").value = "";
    document.querySelector("#" + form_id_js + " [name='company']").value = "";
    document.querySelector("#" + form_id_js + " [name='email']").value = "";
    document.querySelector("#" + form_id_js + " [name='phone']").value = "";
    return false;
}

// send Email
function js_send() {
    let msg = document.querySelector("#" + form_id_js + " [name='message']").value;
    let name = document.querySelector("#" + form_id_js + " [name='name']").value;
    let company = document.querySelector("#" + form_id_js + " [name='company']").value;
    let email = document.querySelector("#" + form_id_js + " [name='email']").value;
    let phone = document.querySelector("#" + form_id_js + " [name='phone']").value;
    

    sendButton.value='Sending…';
    sendButton.disabled=true;
    
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };

    
    data_js['subject'] = `Contact by Website from ${name} from ${company}`;
    data_js['text'] = `Contact data:
        email: ${email}
        tel: ${phone}
        Message:
            ${msg}`;
    let params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

function toParams(data_js) {
    let form_data = [];
    for ( let key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}