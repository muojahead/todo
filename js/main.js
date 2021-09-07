const inputData = selectEle("newItem");
const outputData = selectEle("outputData");
const addItem = selectEle("addItem");
const openSearchBtn = selectEle("searchEng");
const searchBox = selectEle("searchBox");
const searchBoxCloser = selectEle("closer");
const searchInput = selectEle("serachInput");
const searchResultsOutput = selectEle("searchResults");
let dataList = [];

//clear Input Field and Focus on it
clearData();

//  Get Elements By ID
function selectEle(id) {
    return document.getElementById(id);
}

// Load Data From LocalStorage
window.onload = () => {
    const jsonData = localStorage.getItem("dataList");

    const bacledData = JSON.parse(jsonData);

    if (bacledData) {
        dataList = bacledData;

        outputDataFunc();
    }
};

// add Data To LocalStorage
function localStorageProcess() {
    const fromatedDataLis = JSON.stringify(dataList);

    localStorage.setItem("dataList", fromatedDataLis);
}

// run adding New Items
addItem.onclick = outputDataFunc;

// create Data Box Which data outputted in and Add To The DOM
function boxItemCreator(text, id, ele) {
    let box = document.createElement("div");

    box.setAttribute("class", "box");

    let textEle = document.createElement("p");

    textEle.setAttribute("class", "text");

    textEle.innerText = text;

    let delButton = document.createElement("button");

    delButton.setAttribute("class", "btn-reg del");

    delButton.setAttribute("onclick", `deleteItem(${id})`);

    delButton.innerText = "Delete";

    let eidtButton = document.createElement("button");

    eidtButton.setAttribute("class", "btn-reg edit");

    eidtButton.setAttribute("onclick", `editItem(${id})`);

    eidtButton.innerText = "Edit";

    let actions = document.createElement("div");

    actions.setAttribute("class", "actions");

    actions.appendChild(eidtButton);

    actions.appendChild(delButton);

    box.appendChild(textEle);

    box.appendChild(actions);

    ele.appendChild(box);
}

//Check the validity of the entered data and make sure that it does not exist before

function addAndChickDataItem(text) {
    let data = {
        id: Math.floor(Math.random() * 10000),

        textMsg: text,
    };

    const exist = dataList.find((item) => item.textMsg === text);

    if (text == "") {
        return;
    }

    if (exist) {
        alert("Sorry, This Item Added Before!");

        clearData();
    } else {
        dataList.push(data);

        clearData();
    }
}

// Loop on Data Items and Outpuing Them To The DOM

function outputDataFunc() {
    addAndChickDataItem(inputData.value.trim());

    if (dataList.length != 0) {
        outputData.innerHTML = "";
    }

    for (let i = 0; i < dataList.length; i++) {
        boxItemCreator(dataList[i].textMsg, dataList[i].id, outputData);
    }

    clearData();

    localStorageProcess();
}

// Clearing Input Field
function clearData() {
    inputData.value = "";

    inputData.focus();
}

//  Delete Items From Data List and Localstorage
function deleteItem(id) {
    const deletedItem = dataList.filter((item) => item.id !== id);

    const JsondeletedItem = JSON.stringify(deletedItem);

    localStorage.setItem("dataList", JsondeletedItem);

    dataList = deletedItem;

    if (dataList.length == 0) {
        outputData.innerHTML = `                    
        <div class="box empty active">
            <p class="text">
                Please Add an Item From The Input above, Thank You.
            </p>
        </div>`;
    } else {
        outputData.innerHTML = "";
    }

    searchInput.value = "";

    searchBox.classList.remove("active");

    for (let i = 0; i < dataList.length; i++) {
        boxItemCreator(dataList[i].textMsg, dataList[i].id, outputData);
    }
}

//  Eidt Item From Data List and Localstorage
function editItem(id) {
    const editedItem = dataList.find((item) => item.id === id);

    inputData.value = editedItem.textMsg;

    deleteItem(editedItem.id);

    searchBox.classList.remove("active");

    inputData.focus();

    searchInput.value = "";
}

// open and Close Search Box
openSearchBtn.onclick = () => {
    searchInput.value = "";

    searchResultsOutput.innerHTML = `
        <div class="box">
            <div class="text">Enter what You search about in the Input above</div>
        </div>`;

    if (inputData.value !== "") {
        alert("please Finish adding Before Search or clear input");
    } else if (dataList.length == 0) {
        alert("you Have no items to search in Please add One");
    } else {
        searchBox.classList.add("active");
    }
};

searchBoxCloser.onclick = () => searchBox.classList.remove("active");

// output search Results

searchInput.onkeyup = getSearchResults;

function getSearchResults() {
    const searchWord = searchInput.value.trim();

    searchResultsOutput.innerHTML = "";

    dataList.forEach((item) => {
        if (item.textMsg.toLowerCase().match(searchWord.toLowerCase())) {
            boxItemCreator(item.textMsg, item.id, searchResultsOutput);
            outputData.innerHTML = "";

            for (let i = 0; i < dataList.length; i++) {
                boxItemCreator(dataList[i].textMsg, dataList[i].id, outputData);
            }
        }
    });
    if (dataList.filter((text) => text.textMsg === searchWord)) {
        return;
    } else {
        searchResultsOutput.innerHTML = `
<div class="box">
    <div class="text">Enter what You search about in the Input above</div>
</div>`;
    }
}