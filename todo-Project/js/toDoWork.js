const doForm = document.querySelector("#formToDos");
const doInput = doForm.querySelector("#inputToDo");
const leftList = document.querySelector("#left-list");
const doneList = document.querySelector("#done-list");

const LEFT_LS = "leftDo";
const DONE_LS = "doneDo";

let leftArray = [];
let doneArray = [];

let Id = 1;

// SAVE
function saveLeftList() {
  localStorage.setItem(LEFT_LS, JSON.stringify(leftArray));
}

function saveDoneList() {
  localStorage.setItem(DONE_LS, JSON.stringify(doneArray));
}

// DELETE
function deleteLeft(evt) {
  const left_li = evt.target.parentNode;
  leftList.removeChild(left_li);
  const cleanLeft = leftArray.filter(function(leftToDo) {
    return leftToDo.id !== parseInt(left_li.id);
  });
  leftArray = cleanLeft;
  saveLeftList();
}

function deleteDone(evt) {
  const done_li = evt.target.parentNode;
  doneList.removeChild(done_li);
  const cleanDone = doneArray.filter(function(doneToDo) {
    return doneToDo.id !== parseInt(done_li.id);
  });
  doneArray = cleanDone;
  saveDoneList();
}

// MOVE
function finishToDo(evt) {
  const left_li = evt.target.parentNode;
  const left_text = evt.target.parentNode.firstChild.innerText;
  leftList.removeChild(left_li);
  const cleanLeft = leftArray.filter(function(leftToDo) {
    return leftToDo.id !== parseInt(left_li.id);
  });
  leftArray = cleanLeft;
  paintDone(left_text);
  saveLeftList();
}

function restoreTodo(evt) {
  const done_li = evt.target.parentNode;
  const done_text = evt.target.parentNode.firstChild.innerText;
  doneList.removeChild(done_li);
  const cleanDone = doneArray.filter(function(doneToDo) {
    return doneToDo.id !== parseInt(done_li.id);
  });
  doneArray = cleanDone;
  paintLeft(done_text);
  saveDoneList();
}

// PAINT
function paintLeft(text) {
  const left_span = document.createElement("span");
  const left_li = document.createElement("li");
  const left_delBtn = document.createElement("button");
  const left_donBtn = document.createElement("button");
  const newId = Id;

  left_span.innerText = text;
  left_donBtn.innerText = "DONE";
  left_donBtn.className = 'btn btn-success btn-sm';
  left_donBtn.addEventListener("click", finishToDo);
  left_delBtn.innerText = "DELETE";
  left_delBtn.className = 'btn btn-danger btn-sm';
  left_delBtn.addEventListener("click", deleteLeft);
  left_li.appendChild(left_span);
  left_li.appendChild(left_donBtn);
  left_li.appendChild(left_delBtn);
  left_li.id = newId;
  leftList.appendChild(left_li);
  const leftObj = {
    text: text,
    id: newId
  };
  Id += 1;
  leftArray.push(leftObj);
  saveLeftList();
}

function paintDone(text) {
  const done_span = document.createElement("span");
  const done_li = document.createElement("li");
  const done_delBtn = document.createElement("button");
  const done_donBtn = document.createElement("button");
  const newId = Id;

  done_span.innerText = text;
  done_donBtn.innerText = "RESTORE";
  done_donBtn.className = 'btn btn-primary btn-sm';
  done_donBtn.addEventListener("click", restoreTodo);
  done_delBtn.innerText = "DELETE";
  done_delBtn.className = 'btn btn-danger btn-sm';
  done_delBtn.addEventListener("click", deleteDone);
  done_li.appendChild(done_span);
  done_li.appendChild(done_donBtn);
  done_li.appendChild(done_delBtn);
  done_li.id = newId;
  doneList.appendChild(done_li);
  const doneObj = {
    text: text,
    id: newId
  };
  Id += 1;
  doneArray.push(doneObj);
  saveDoneList();
}

// SUBMIT
function writeToDo(evt) {
  evt.preventDefault();
  const currentValue = doInput.value;
  paintLeft(currentValue);
  doInput.value = '';
}


// LOAD
function loadDoIt() {
  const loadedLeftList = localStorage.getItem(LEFT_LS);
  const loadedDoneList = localStorage.getItem(DONE_LS);
  if(loadedLeftList !== null && loadedDoneList === null) {
    const parsedLeft = JSON.parse(loadedLeftList);
    parsedLeft.forEach(function(leftToDo) {
      paintLeft(leftToDo.text);
    });
  } else if (loadedLeftList === null && loadedDoneList !== null) {
    const parsedDone = JSON.parse(loadedLeftList);
    parsedDone.forEach(function(doneToDo) {
      paintDone(doneToDo.text);
    });
  } else if (loadedLeftList !== null && loadedDoneList !== null) {
    const parsedLeft = JSON.parse(loadedLeftList);
    const parsedDone = JSON.parse(loadedLeftList);
    parsedLeft.forEach(function(leftToDo) {
      paintLeft(leftToDo.text);
    });
    parsedDone.forEach(function(doneToDo) {
      paintDone(doneToDo.text);
    });
  }
}

// INIT
function init() {
  loadDoIt();
  doForm.addEventListener("submit", writeToDo);
}
init();