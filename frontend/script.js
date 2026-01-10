const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;

  const li = document.createElement("li");
  li.textContent = name;
  list.appendChild(li);
  form.reset();
});
