const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;

  await fetch("http://localhost:5000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const li = document.createElement("li");
  li.textContent = name;
  list.appendChild(li);

  form.reset();
});
