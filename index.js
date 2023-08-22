'use strict';
var names = [];

const saveBtn = document.querySelector("#saveBtn");
const deleteBtn = document.querySelector("#deleteAll");
const saveTab = document.querySelector("#saveTab");
const Uname = document.getElementById("Uname");
var listElem = document.getElementById("listElem");
let nameFromLocalStorage = JSON.parse(localStorage.getItem("names"));

//to add the items into the array after fetching from the local storage....
if (nameFromLocalStorage) {
    names = nameFromLocalStorage;
    showNames(names);
}

//to add the items into the localstorage...
saveBtn.addEventListener("click", function () {
    names.push(Uname.value);
    Uname.value = "";
    localStorage.setItem("names", JSON.stringify(names));
    showNames(names);
});

function showNames(array) {
    var listItems = "";
    for (let i = 0; i < array.length; i++) {
        listItems += `
        <li>
            <a href='#'> ${array[i]} </a> 
        </li>`;
    }
    listElem.innerHTML = listItems;
}

//to clear the items from the local storage...
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    names = [];
    showNames(names);
});


//on the click of savetAB BUTTON

saveTab.addEventListener("click", function () {

    chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {
        names.push(tabs[0].url)
        localStorage.setItem("names", JSON.stringify(names));
        showNames(names)
    });   
})
