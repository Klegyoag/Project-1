let tasks = JSON.parse(localStorage.getItem('pd-tasks')) || [];

/* ===== SPLASH ===== */
function launchApp(){
  document.getElementById("splash").style.display="none";
  document.getElementById("app").style.opacity="1";
  renderTasks();
  updateDash();
}

/* ===== NAV ===== */
function nav(page,el){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));

  document.getElementById("page-"+page).classList.add('active');
  el.classList.add('active');
}

/* ===== ADD TASK ===== */
function addTask(){
  let text = document.getElementById("taskInput").value;
  if(!text) return;

  tasks.push({
    id:Date.now(),
    text:text,
    done:false,
    due:document.getElementById("taskDue").value,
    priority:document.getElementById("taskPri").value
  });

  save();
  renderTasks();
  updateDash();
}

/* ===== TOGGLE ===== */
function toggleTask(id){
  tasks = tasks.map(t=>{
    if(t.id===id) t.done=!t.done;
    return t;
  });

  save();
  renderTasks();
  updateDash();
}

/* ===== DELETE ===== */
function deleteTask(id){
  tasks = tasks.filter(t=>t.id!==id);
  save();
  renderTasks();
  updateDash();
}

/* ===== RENDER ===== */
function renderTasks(){
  let list = document.getElementById("taskList");

  list.innerHTML = tasks.map(t=>`
    <div class="card">
      <span style="${t.done?'text-decoration:line-through':''}">
        ${t.text}
      </span>

      <button onclick="toggleTask(${t.id})">✔</button>
      <button onclick="deleteTask(${t.id})">❌</button>
    </div>
  `).join("");

  document.getElementById("taskBadge").innerText =
    tasks.filter(t=>!t.done).length;
}

/* ===== DASHBOARD ===== */
function updateDash(){
  let total = tasks.length;
  let done = tasks.filter(t=>t.done).length;

  document.getElementById("s-total").innerText = total;
  document.getElementById("s-done").innerText = done;
  document.getElementById("s-pending").innerText = total-done;
  document.getElementById("s-pct").innerText =
    total ? Math.round((done/total)*100)+"%" : "0%";
}

/* ===== SAVE ===== */
function save(){
  localStorage.setItem("pd-tasks",JSON.stringify(tasks));
}