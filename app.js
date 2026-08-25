const API = "/api/employees";

async function loadEmployees() {
    const response = await fetch(API);
    const employees = await response.json();
    document.getElementById("employees").innerHTML = employees.map(e => `
        <tr>
          <td>${e.id}</td>
          <td>${e.name}</td>
          <td>${e.email}</td>
          <td>${e.department}</td>
          <td><button onclick="deleteEmployee(${e.id})">Delete</button></td>
        </tr>
    `).join("");
}

document.getElementById("employeeForm").addEventListener("submit", async event => {
    event.preventDefault();
    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(employee)
    });

    event.target.reset();
    loadEmployees();
});

async function deleteEmployee(id) {
    await fetch(`${API}/${id}`, {method: "DELETE"});
    loadEmployees();
}

loadEmployees();
