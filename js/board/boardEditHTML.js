function editBoardTaskReturn(i, s) {
    return `<div id="subtask${s}" class="subtaskClass" ondblclick="editSubtask(${s})">
      <div class="addedSubtask">
        <div class="subTastText">
          <p>&bull;</p>
          <P>${user.tasks[i].subtasks[s].name}</P>
        </div>
        <div class="subMenu">
          <img class="arrow" src="../assets/img/add_task/task_edit.svg" onclick="editBoardSubtask(${i},${s})" alt="edit_icon">
          <img src="../assets/img/add_task/task_line.svg" alt="subtasks_seperator">
          <img class="arrow" src="../assets/img/add_task/task_cross.svg" onclick="deleteBoardSubtask(${i},${s})" alt="delete_icon">
        </div>
      </div>
    </div>`;
  }
  
  function editBoardMobileTaskReturn(i) {
    return `
    <div class="divColumn">
    <div class="closeEdit">
      <img onclick="closeEditTask(${i})" src="../assets/img/board/board_cross.svg" />
    </div>
    <div class="scroll">
      <div id="taskTitleContainer">
        <p class="taskHeadline">Title</p>
        <input
          id="titelInputContainer"
          type="text"
          class="titleInputField font"
          placeholder="Enter a title"
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
      <div id="taskDueDateContainer">
        <p class="taskHeadline">Due date</p>
        <input
          id="dueDateInputContainer"
          placeholder="dd/mm/yyyy"
          type="date"
          class="dueDateInputField font"
          onfocus="setMinDate()"
        />
        <p id="dueDateRequiredContainer" class="fildIsRequiredText"></p>
      </div>
      <div id="taskPrioContainer">
        <p class="taskHeadline">Prio</p>
        <div id="prioSelectContainer">
          <div
            id="prioUrgentContainer"
            onclick="whatsPrio(${i},'Urgent')"
            class="taskSelectButton"
          >
            Urgent
            <img src="../assets/img/add_task/arrow_top_red.svg" />
          </div>
          <div
            id="prioMediumContainer"
            onclick="whatsPrio(${i},'Medium')"
            class="taskSelectButton"
          >
            Medium
            <img src="../assets/img/add_task/line_orange.svg" />
          </div>
          <div id="prioLowContainer" onclick="whatsPrio(${i},'Low')" class="taskSelectButton">
            Low
            <img src="../assets/img/add_task/arrow_bottom_green.svg" />
          </div>
        </div>
        <p class="fildIsRequiredText"></p>
      </div>
      <div id="taskAssignedContainer">
        <p class="taskHeadline">Assigned to</p>
        <div id="fullContactContainers">
        <div id="contactSelectContainer" class="categorySelect">
          <input
            class="assignToInput font"
            type="text"
            id="assignedToContainer"
            onclick="onclickInputBorder()"
            onkeyup="filterNamesforAssignedTo()"
            placeholder="Add a Contact"
          />
          <img
            id="openerAssignedTo"
            onclick="openContacts(${i})"
            class="arrow"
            src="../assets/img/add_task/arrow_drop_down.svg"
          />
        </div>
        <div id="contactList"></div></div>
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
            class="subtaskInputfield font"
            type="text"
            onkeydown="if(event.key==='Enter') addBoardSubtask(${i})"
            onkeyup="changeBoardMenu(${i})"
          />
          <div class="subTaskInputfieldMenuClass" id="subTaskInputfieldMenu">
            <img class="arrow" src="../assets/img/add_task/task_add.svg" />
          </div>
        </div>
        <div class="subTaskAddContainer" id="subTasksContainer"></div>
      </div>
    </div>
    <div class="boardEditButtonContainer">
      <div onclick="saveCurrentBoardTask(${i})" class="boardEditButton">
        <p>Ok</p>
        <img src="../assets/img/board/board_check.svg" />
      </div>
    </div>
  </div>
  
  `;
  }
  function editBoardDesktopTaskReturn(i) {
    return `
    <div class="divColumn">
    <div class="closeEdit">
    <span class="edith1">Add Task</span>
      <img class="editImg" onclick="closeEditTask(${i})" src="../assets/img/board/board_cross.svg" />
    </div>
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
        <img id="openerAssignedTo" onclick="openContacts(${i})" class="arrow" src="../assets/img/add_task/arrow_drop_down.svg" />
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
          onclick="whatsPrio(${i},'Urgent')"
          class="taskSelectButton"
        >
          Urgent
          <img src="../assets/img/add_task/arrow_top_red.svg" />
        </div>
        <div
          id="prioMediumContainer"
          onclick="whatsPrio(${i},'Medium')"
          class="taskSelectButton"
        >
          Medium
          <img src="../assets/img/add_task/line_orange.svg" />
        </div>
        <div
          id="prioLowContainer"
          onclick="whatsPrio(${i},'Low')"
          class="taskSelectButton"
        >
          Low
          <img src="../assets/img/add_task/arrow_bottom_green.svg" />
        </div>
      </div>
      <p class="fildIsRequiredText"></p>
    </div>
     <div id="taskSubtaskContainer">
      <p class="taskHeadline">Subtasks</p>
      <div class="subTaskInputcontainerClass" id="subTaskInputcontainer">
        <input
          id="subTaskInputfieldText"
          placeholder="Add new subtask"
          class="subtaskInputfield font"
          type="text"
          onkeydown="if(event.key==='Enter') addBoardSubtask(${i})"
          onkeyup="changeBoardMenu(${i})"
        />
        <div class="subTaskInputfieldMenuClass" id="subTaskInputfieldMenu">
          <img class="arrow" src="../assets/img/add_task/task_add.svg" />
        </div>
      </div>
      <div class="subTaskAddContainer" id="subTasksContainer"></div>
    </div>
    </div>
  </div>
  <div class="boardEditButtonContainer">
  <div onclick="saveCurrentBoardTask(${i})" class="boardEditButton">
    <p>Ok</p>
    <img src="../assets/img/board/board_check.svg" />
  </div>
  </div>
    `;
  }
  