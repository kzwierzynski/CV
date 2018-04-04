let wrapper = document.querySelector('.wrapper');
let sendButton = document.getElementById("js_send");
let form_id_js = "contactForm";

let data_js = {
    "access_token": "w7t3n8h61bcuftfgna8i4f7g"
};


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

function js_onError(error) {
    // remove this to avoid redirect
    window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
}


//  Form Validation
function isOk(regEx, input, msgStr){
    if(!regEx.test(input)){				//if content that was input does not pass the validation
        alert(msgStr);
        return false;
    }else{
        return true;
    }
}
function checkName(name){
    var helpString="Please, enter a valid name";
    return isOk(/^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+(([',. -][a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ])?[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]*)*$/, name, helpString);
}
function checkCompany(company){
    var helpString="Please, enter a valid company name";
    return isOk(/^[0-9A-z -./+&]{2,20}/, company, helpString);
}
function checkPhone(phone){
    var helpString="Phone number you entered is not valid. \nEnter a valid number, eg. +48 222 222 222 or 32 2222222\nOr leave it empty.";
    return isOk(/^[\+]?[(]?[0-9]{2,4}[)]?[-\s\. ]?[0-9]{2,3}[-\s\. ]?[0-9]{2,3}[-\s\. ]?[0-9]{2,3}$/, phone, helpString);
}
function checkEmail(email){
    var helpString="Please, enter a valid email address eg. pananimals@pan-animals.pl";
    return isOk(/[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/, email, helpString);
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
    
    if ( (!msg) || (!name) || (!company) || (!email) ){
        alert("Please fill in all the required information.");
        return false;

    } else{
        if ( !checkName(name) || !checkCompany(company) || !checkEmail(email)) {
            return false;
        }
        
        if(phone){
            if (!checkPhone(phone)) return false;
        }
    }

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

sendButton.onclick = js_send;

function toParams(data_js) {
    let form_data = [];
    for ( let key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

let js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});