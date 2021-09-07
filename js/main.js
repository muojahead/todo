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

// adding New Items
addItem.onclick = outputDataFunc;
// // window.onload = () => {
// //     const newDataList = localStorage.getItem("dataList");
// //     var result = [];

// //     for (var i in newDataList) {
// //         result.push(newDataList[i]);
// //     }
// //     console.log(result);
// // };
// // Save DataList In Local stroge
// function addToLocalStorage() {
//     const dataListFormated = JSON.stringify(Object.assign({}, dataList));
//     localStorage.setItem("dataList", dataListFormated);
// }
// create Data Box Which data outputted in and Add To The DOM
function boxItemCreator(text, id) {
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

    actions.appendChild(delButton);
    actions.appendChild(eidtButton);
    box.appendChild(textEle);
    box.appendChild(actions);
    outputData.appendChild(box);
}

//Check the validity of the entered data and make sure that it does not exist before
function addAndChickDataItem(text) {
    let data = {
        id: Math.floor(Math.random() * 10000),
        textMsg: text,
    };
    const exist = dataList.find((item) => item.textMsg === text);
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
    outputData.innerHTML = "";
    for (let i = 0; i < dataList.length; i++) {
        boxItemCreator(dataList[i].textMsg, dataList[i].id);
    }
    clearData();
}

// Clearing Input Field
function clearData() {
    inputData.value = "";
    inputData.focus();
}

//  Delete Items From Data List
function deleteItem(id) {
    const deletedItem = dataList.filter((item) => item.id !== id);
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
        boxItemCreator(dataList[i].textMsg, dataList[i].id);
    }
}

//  Eidt Item From Data List
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
    if (dataList.length == 0) {
        searchResultsOutput.innerHTML = `
        <div class="box">
        <div class="text">Enter what You search about in the Input above</div>
    </div>
            `;
    }
    if (inputData.value !== "") {
        alert("please Finsh adding Before Search or clear input");
    } else if (dataList.length == 0) {
        alert("you Have no items to search in Please add One");
    } else {
        searchBox.classList.add("active");
    }
};
searchBoxCloser.onclick = () => searchBox.classList.remove("active");
searchInput.onkeyup = getSearchResults;

function getSearchResults() {
    const searchWord = searchInput.value.trim();
    searchResultsOutput.innerHTML = "";
    for (let i = 0; i < dataList.length; i++) {
        if (dataList[i].textMsg.toLowerCase().includes(searchWord.toLowerCase())) {
            searchResultsOutput.innerHTML = `
            <div class="box">
            <p class="text">${dataList[i].textMsg}</p>
            <div class="actions">
            <button class="btn-reg del" onclick="editItem(${dataList[i].id})">Edit</button>
                <button class="btn-reg del" onclick="deleteItem(${dataList[i].id})">Delete</button>
            </div>
        </div>
                `;
        } else if (searchWord == " ") {
            searchResultsOutput.innerHTML = `
            <div class="box">
            <div class="text">Enter what You search about in the Input above</div>
        </div>
                `;
        } else {
            searchResultsOutput.innerHTML = `
            <div class="box">
            <p class="text">No thing matching Your input text</p>
        </div>
                `;
        }
    }
    outputData.innerHTML = "";

    for (let i = 0; i < dataList.length; i++) {
        boxItemCreator(dataList[i].textMsg, dataList[i].id);
    }
}