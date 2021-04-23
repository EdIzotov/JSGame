window.addEventListener("load", function() {
    const host = "http://localhost:4000";
    const apiURL = "/api/game";
    let result = document.querySelector("#result");
    let el = document.querySelector("#number-value");   
    document.querySelector("#post-number").addEventListener("click", function () {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", host + apiURL, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                result.innerText = JSON.parse(xhr.responseText).result;
            }            
        }
        xhr.send(JSON.stringify({answer: el.value}));
    });
    document.querySelector("#show-numbers").addEventListener("click", function() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", host + apiURL, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                result.innerText = JSON.parse(xhr.responseText).numbers;
            }            
        }
        xhr.send(JSON.stringify({answer: el.value}));
    });
});
