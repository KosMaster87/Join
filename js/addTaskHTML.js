function renderAddTaskMobileHTML() {
  return `
  <div class="divColumn">
  <h1>Add Task</h1>
  <div id="taskTitleContainer">
        <p class="taskHeadline">
          Title
          <span class="requiredStar">*</span>
        </p>
        <input
          id="titelInputContainer"
          type="text"
          class="titleInputField font"
          placeholder="Enter a title"
          oninput="checkInputs()"
        />
        <p id="inputRequiredContainer" class="fildIsRequiredText"></p>
      </div>
      <div id="taskDescriptionContainer">
        <p class="taskHeadline">Description</p>
        <textarea
          id="descriptionInput"
          placeholder="Enter a Descripton"
          class="descriptionInputField font"
        ></textarea>
        <p class="fildIsRequiredText"></p>
      </div>
      <div id="taskPrioContainer">
        <p class="taskHeadline">Prio</p>
        <div id="prioSelectContainer">
          <div
            id="prioUrgentContainer"
            onclick="whatsPrio(prioUrgentContainer)"
            class="taskSelectButton"
          >
            Urgent
            <img src="../assets/img/add_task/arrow_top_red.svg" />
          </div>
          <div
            id="prioMediumContainer"
            onclick="whatsPrio(prioMediumContainer)"
            class="taskSelectButton"
          >
            Medium
            <img src="../assets/img/add_task/line_orange.svg" />
          </div>
          <div
            id="prioLowContainer"
            onclick="whatsPrio(prioLowContainer)"
            class="taskSelectButton"
          >
            Low
            <img src="../assets/img/add_task/arrow_bottom_green.svg" />
          </div>
        </div>
        <p class="fildIsRequiredText"></p>
      </div>
      <div id="taskDueDateContainer">
        <p class="taskHeadline">
          Due date
          <span class="requiredStar">*</span>
        </p>
        <input
          id="dueDateInputContainer"
          placeholder="dd/mm/yyyy"
          type="date"
          class="dueDateInputField font"
          onfocus="setMinDate()"
          oninput="checkInputs()"
        />
        <p id="dueDateRequiredContainer" class="fildIsRequiredText"></p>
      </div>

      <div id="taskCategoryContainer">
        <p class="taskHeadline">
          Category
          <span class="requiredStar">*</span>
        </p>
        <div
          id="categorySelectContainer"
          onclick="openCategorySelect()"
          class="categorySelect"
        >
          <span id="categoryText">Select task category</span
          ><img
          class="arrow"
            id="categoryImage"
            src="../assets/img/add_task/arrow_drop_down.svg"
          />
        </div>
        <div class="categorySelectOptions" id="categoryMenu"></div>
        <p id="categoryRequiredContainer" class="fildIsRequiredText"></p>
      </div>
      <div id="taskAssignedContainer">
    <p class="taskHeadline">Assigned to</p>
    <div id="fullContactContainers">
    <div
      id="contactSelectContainer"
      class="categorySelect"
    >
    <input class="assignToInput font" type="text" id="assignedToContainer" onclick="onclickInputBorder()" onkeyup="filterNamesforAssignedTo()" placeholder="Add a Contact">
      <img id="openerAssignedTo" onclick="loadContacts()" class="arrow" src="../assets/img/add_task/arrow_drop_down.svg" />
    </div>
    <div id="contactList">
    </div></div>
    <div id="contactListIcons">
      <div id="contactListIconsLine"></div>
    </div>
    <p id="contacRequired" class="fildIsRequiredText"></p>
  </div>

      <div id="taskSubtaskContainer">
        <p class="taskHeadline">Subtasks</p>
        <div class="subTaskInputcontainerClass" id="subTaskInputcontainer">
          <input
            id="subTaskInputfieldText"
            placeholder="Add new subtask"
            class="subtaskInputfield  font"
            type="text"
            onkeydown="if(event.key==='Enter') addSubtask()"
            onkeyup="changemenu()"
          />
          <div class="subTaskInputfieldMenuClass" id="subTaskInputfieldMenu">
            <img class="arrow"
              src="../assets/img/add_task/task_add.svg"
            />
          </div>
        </div>
        <div class="subTaskAddContainer" id="subTasksContainer">
        <p class="fildIsRequiredText"></p>
        </div>
      </div>
      </div>
  `;
}

function renderAddTaskHTML() {
  return `
  <div class="divColumn">
  <h1>Add Task</h1>
  <div class="leftAndRightMainContainer">
  <div id="leftTaskContainer">
  <div id="taskTitleContainer">
    <p class="taskHeadline">
      Title
      <span class="requiredStar">*</span>
    </p>
    <input
      id="titelInputContainer"
      type="text"
      class="titleInputField font"
      placeholder="Enter a title"
      oninput="checkInputs()"
    />
    <p id="inputRequiredContainer" class="fildIsRequiredText"></p>
  </div>
  <div id="taskDescriptionContainer">
    <p class="taskHeadline">Description</p>
    <textarea
      id="descriptionInput"
      placeholder="Enter a Descripton"
      class="descriptionInputField font"
    ></textarea>
    <p class="fildIsRequiredText"></p>
  </div>
  <div id="taskAssignedContainer">
    <p class="taskHeadline">Assigned to</p>
    <div id="fullContactContainers">
    <div
      id="contactSelectContainer"
      class="categorySelect"
    >
    <input class="assignToInput font" type="text" id="assignedToContainer" onclick="onclickInputBorder()" onkeyup="filterNamesforAssignedTo()" placeholder="Add a Contact">
      <img id="openerAssignedTo" onclick="loadContacts()" class="arrow" src="../assets/img/add_task/arrow_drop_down.svg" />
    </div>
    <div id="contactList">
    </div></div>
    <div id="contactListIcons">
      <div id="contactListIconsLine"></div>
    </div>
    <p id="contacRequired" class="fildIsRequiredText"></p>
  </div>
</div>
<div class="seperatorContainer"></div>
<div id="rightTaskContainer">
  <div id="taskDueDateContainer">
    <p class="taskHeadline">
      Due date
      <span class="requiredStar">*</span>
    </p>
    <input
      id="dueDateInputContainer"
      placeholder="dd/mm/yyyy"
      type="date"
      class="dueDateInputField font"
      onfocus="setMinDate()"
      oninput="checkInputs()"
    />
    <p id="dueDateRequiredContainer" class="fildIsRequiredText"></p>
  </div>
  <div id="taskPrioContainer">
    <p class="taskHeadline">Prio</p>
    <div id="prioSelectContainer">
      <div
        id="prioUrgentContainer"
        onclick="whatsPrio(prioUrgentContainer)"
        class="taskSelectButton"
      >
        Urgent
        <img src="../assets/img/add_task/arrow_top_red.svg" />
      </div>
      <div
        id="prioMediumContainer"
        onclick="whatsPrio(prioMediumContainer)"
        class="taskSelectButton"
      >
        Medium
        <img src="../assets/img/add_task/line_orange.svg" />
      </div>
      <div
        id="prioLowContainer"
        onclick="whatsPrio(prioLowContainer)"
        class="taskSelectButton"
      >
        Low
        <img src="../assets/img/add_task/arrow_bottom_green.svg" />
      </div>
    </div>
    <p class="fildIsRequiredText"></p>
  </div>
  <div id="taskCategoryContainer">
    <p class="taskHeadline">
      Category
      <span class="requiredStar">*</span>
    </p>
    <div
      id="categorySelectContainer"
      onclick="openCategorySelect()"

      class="categorySelect"
    >
      <span  id="categoryText">Select task category</span
      ><img
      class="arrow"
        id="categoryImage"
        src="../assets/img/add_task/arrow_drop_down.svg"
      />
    </div>
    <div class="categorySelectOptions" id="categoryMenu"></div>
    <p id="categoryRequiredContainer" class="fildIsRequiredText"></p>
  </div>

  <div id="taskSubtaskContainer">
    <p class="taskHeadline">Subtasks</p>
    <div class="subTaskInputcontainerClass" id="subTaskInputcontainer">
      <input
        id="subTaskInputfieldText"
        placeholder="Add new subtask"
        class="subtaskInputfield font"
        type="text"
        onkeydown="if(event.key==='Enter') addSubtask()"
        onkeyup="changemenu()"
      />
      <div class="subTaskInputfieldMenuClass" id="subTaskInputfieldMenu">
        <img class="arrow" src="../assets/img/add_task/task_add.svg" />
      </div>
    </div>
    <div class="subTaskAddContainer" id="subTasksContainer"></div>
  </div>
</div>
</div>
`;
}

function openCategorySelectReturn() {
  return `<div onclick="selectCategory('Technical Task')" class="categorySelectOption">Technical Task</div>
    <div onclick="selectCategory('User Story')" class="categorySelectOption">User Story</div>`;
}

function subtastwindowReturn() {
  return `<img src="../assets/img/add_task/task_line.svg" />
    <img class="arrow" onclick="back()" src="../assets/img/add_task/task_check.svg" />`;
}

function changemenuReturn() {
  return `
    <img class="arrow" src="../assets/img/add_task/task_cross.svg" onclick="clearSubtaskInputfield()"/>
    <img src="../assets/img/add_task/task_line.svg"/>
    <img class="arrow" onclick="addSubtask()" src="../assets/img/add_task/task_check.svg"/>`;
}

function renderSubtasksReturn(subtasks, i) {
  return `<div id="subtask${i}" class="subtaskClass" ondblclick="editSubtask(${i})">
    <div class="addedSubtask">
      <div class="subTastText">
        <p>&bull;</p>
        <P id="subTastTextfield${i}">${subtasks[i].name}</P>
      </div>
      <div class="subMenu">
        <img class="arrow" src="../assets/img/add_task/task_edit.svg" onclick="editSubtask(${i})" alt="edit_icon">
        <img src="../assets/img/add_task/task_line.svg" alt="subtasks_seperator">
        <img class="arrow" src="../assets/img/add_task/task_cross.svg" onclick="deleteSubtask(${i})" alt="delete_icon">
      </div>
    </div>
  </div>`;
}

function editSubtaskReturn(subtasks, i) {
  return `<div class="subtaskEdit" id="subtaskEdit">
    <input type="text" id="editSubtask${i}" value="${subtasks[i]}">
    <div class="subtastEditMenu">
      <img class="arrow" src="../assets/img/add_task/task_bin.svg" onclick="deleteSubtask(${i})" alt="delete_icon">
      <img src="../assets/img/add_task/task_line.svg" alt="subtasks_seperator">
      <img class="arrow" src="../assets/img/add_task/task_check.svg" onclick="editSubtaskDone(${i})" alt="done_icon">
    </div>
  </div>`;
}

function loadContactsReturn(i) {
  return `
  <div
      id="assignedContactContainer${i}"
      onclick="assignedtoContactBg(${i}, '${contactName}')"
      class="assignedContactContainer"
    >
      <div class="assignedContactLeftSide">
        <div id="ContactSignatureIcon${i}" class="assignedContactLeftSideIcon">${contactSignature}</div>
        <p class="assignedContactNameClass">${contactName}</p>
      </div>
      <img
        id="assignedContactImage${i}"
        src="../assets/img/add_task/task_box.svg"
      />
    </div>
  `;
}

function loadContactsAssignedReturn(i) {
  return `
  <div
      id="assignedContactContainer${i}"
      onclick="removeassignedtoContactBg(${i}, '${contactName}')"
      class="assignedContactContainer"
    >
      <div class="assignedContactLeftSide">
        <div id="ContactSignatureIcon${i}" class="assignedContactLeftSideIcon">${contactSignature}</div>
        <p class="assignedContactNameClass">${contactName}</p>
      </div>
      <img
        id="assignedContactImage${i}"
        src="../assets/img/add_task/task_box.svg"
      />
    </div>
  `;
}

function footerReturn() {
  return `
  <footer>
  <div id="finishTaskContainer">
    <div class="finishTaskText">
      <span class="requiredStar">*</span>
      <span>This field is required</span>
    </div>
    <div class="footerFlex">
    <div class="clearAll font" onclick="clearInputs()">
      Clear
      <img class="clearImage" src="../assets/img/add_task/task_cross.svg" />
    </div>
    <div id="placeholder" class="placeholder"></div>
    <div id="createTaskButton" class="createTask  font" onclick="requiredFields()">
      Create Task
      <img src="../assets/img/add_task/task_check_white.svg" />
    </div>
    </div>
    </footer>`;
}

function footerMobileReturn() {
  return `
  <footer>
  <div id="finishTaskContainer">
    <div class="finishTaskText">
      <span class="requiredStar">*</span>
      <span class="requiredStarText">This field is required</span>
    </div>
    <div id="placeholder"></div>
    <div id="createTaskButton" class="createTask  font" onclick="requiredFields()">
      Create Task
      <img src="../assets/img/add_task/task_check_white.svg" />
    </div>
    </footer>`;
}

function filterNamesforAssignedToReturn(i) {
  return `
  <div id="assignedContactContainer${i}" onclick="assignedtoContactBg(${i}, '${contacts[i].name}')" class="assignedContactContainer">
      <div class="assignedContactLeftSide">
          <div id="ContactSignatureIcon${i}" class="assignedContactLeftSideIcon">${contacts[i].signature}</div>
          <p class="assignedContactNameClass">${contacts[i].name}</p>
      </div>
      <img id="assignedContactImage${i}" src="../assets/img/add_task/task_box.svg"/>
  </div>
`;
}
