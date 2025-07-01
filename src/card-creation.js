const container = document.getElementById("content");

const Priority = {
    None: 0,
    Low: 1,
    Medium: 2,
    High: 3
};

class Project {
  constructor(name) {
      this.name = name;
      this.tasks = []
  }

  addTask(task){
    this.tasks.push(task)
  }

  removeTask(task){
    const index = this.tasks.indexOf(task);
    if (index > -1) { 
      this.tasks.splice(index, 1);
    }
  }
}

class Task {
    constructor(title, project, dueDate, priority) {
        this.title = title;
        this.project = project
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

let cards = []
let projects = []

const displayCards = () => {
  console.log("here")
  container.innerHTML = "";

  projects.forEach(project => {
    displayProject(project);

    project.tasks.forEach(card => {
      displayCard(card)
    })
  });
}

const displayProject = (project) => {
  let name = document.createElement("div");
  name.className = 'projName';
  name.textContent = project.name

  container.append(name);
}

const displayCard = (task) => {
    let card = document.createElement("div");
    card.className = 'card';

    let completeSwitch = document.createElement("label")
    completeSwitch.className = 'container'

    let input = document.createElement("input");
    input.type = 'checkbox'

    let checkmark = document.createElement("div");
    checkmark.className = 'checkmark'

    let infoContainer = document.createElement("div");
    infoContainer.className = 'info';

    let titleContainer = document.createElement("div");
    titleContainer.className = 'titleContainer';

    let title = document.createElement("div");
    title.className = 'title';
    title.textContent = task.title;

    let priorityIndicator = document.createElement("div");
    priorityIndicator.className = 'priority';

    switch (task.priority) {
        case Priority.High:
            priorityIndicator.style.backgroundColor = "#ff1313";
            break;
        case Priority.Medium:
            priorityIndicator.style.backgroundColor = "#ff9292";
            break;
        case Priority.Low:
            priorityIndicator.style.backgroundColor = "#ffcccc";
            break;
        default:
            priorityIndicator.style.backgroundColor = "#ffffff";
    }

    let dueDate = document.createElement("div");
    dueDate.className = 'dueDate';
    dueDate.textContent = task.dueDate;

    let deleteBtn = document.createElement("button");
    deleteBtn.className = 'delBtn';
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener("click", () => {
      const index = cards.indexOf(task);
      if (index > -1) { // only splice array when item is found
        cards.splice(index, 1); // 2nd parameter means remove one item only
      }

      displayCards();
    });

    let expandBtn = document.createElement("button");
    expandBtn.className = 'expandBtn';
    expandBtn.textContent = '\/';
    expandBtn.addEventListener("click", () => {
    });

    container.append(card);
    card.append(completeSwitch);
    card.append(infoContainer);
    card.append(deleteBtn);
    card.append(expandBtn);

    completeSwitch.append(input);
    completeSwitch.append(checkmark);

    infoContainer.append(titleContainer);
    titleContainer.append(title);
    titleContainer.append(priorityIndicator);
    infoContainer.append(dueDate);
}

let defaultProject = new Project("default")

projects.push(defaultProject)

let testCard1 = new Task("Wash clothes", defaultProject, "05/05/05", Priority.High)
let testCard2 = new Task("Tidy desk", defaultProject, "05/05/05", Priority.Low)
let testCard3 = new Task("Plan for next week", defaultProject, "05/05/05", Priority.Medium)
let testCard4 = new Task("Do 30 minutes of exercise", defaultProject, "05/05/05", Priority.None)
defaultProject.addTask(testCard1)
defaultProject.addTask(testCard2)
defaultProject.addTask(testCard3)
defaultProject.addTask(testCard4)
cards.push(testCard1);
cards.push(testCard2);
cards.push(testCard3);
cards.push(testCard4);

displayCards(testCard1);
displayCards(testCard2);
displayCards(testCard3);
displayCards(testCard4);

const openTaskModalBtn = document.getElementById("openModalBtnTask");
const closeTaskModalBtn = document.getElementById("closeModalBtnTask");
const taskModal = document.getElementById("modal-task");
const taskForm = document.getElementById("taskForm");

const openProjModalBtn = document.getElementById("openModalBtnProj");
const closeProjModalBtn = document.getElementById("closeModalBtnProj");
const projModal = document.getElementById("modal-project");
const projForm = document.getElementById("projForm");

openTaskModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("hidden");
});

closeTaskModalBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden");
});

openProjModalBtn.addEventListener("click", () => {
  projModal.classList.remove("hidden");
});

closeProjModalBtn.addEventListener("click", () => {
  projModal.classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
    const taskDate = document.getElementById("taskDate");
  
    const today = new Date().toISOString().split("T")[0];
    taskDate.value = today;

    updateProjectDropdown();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value;
  const projectName = document.getElementById("taskProject").value;
  const dueDate = document.getElementById("taskDate").value;
  const priority = parseInt(document.getElementById("taskPriority").value);

  const project = projects.find(p => p.name === projectName);
  if (!project) {
    alert("Project not found!");
    return;
  }

  const newTask = new Task(title, project, dueDate, priority);

  cards.push(newTask);
  project.addTask(newTask);

  displayCards(newTask);

  taskForm.reset();
  taskModal.classList.add("hidden");
});

projForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const projName = document.getElementById("projName").value;

  const newProj = new Project(projName);
  projects.push(newProj);

  updateProjectDropdown();

  projForm.reset();
  projModal.classList.add("hidden");
});

const updateProjectDropdown = () => {
  const projectSelect = document.getElementById("taskProject");

  projectSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select a Project --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  projectSelect.appendChild(defaultOption);

  projects.forEach(project => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
};

const allDayBtn = document.getElementById("allDayBtn");
const customTimeBtn = document.getElementById("customTimeBtn");
const taskTime = document.getElementById("taskTime");

allDayBtn.addEventListener("click", () => {
  allDayBtn.classList.add("active");
  customTimeBtn.classList.remove("active");
  taskTime.style.display = "none";
  taskTime.value = "";
});

customTimeBtn.addEventListener("click", () => {
  customTimeBtn.classList.add("active");
  allDayBtn.classList.remove("active");
  taskTime.style.display = "block";
});