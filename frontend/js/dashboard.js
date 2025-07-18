const backendURL = "http://localhost:3000"; // replace if deployed

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "signin.html";
    return;
  }

  const res = await fetch(`${backendURL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();

  const container = document.getElementById("courseContainer");
  if (res.ok) {
    data.forEach((course) => {
      const div = document.createElement("div");
      div.className = "course";
      div.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <button onclick="enrollCourse('${course._id}')">Enroll</button>
      `;
      container.appendChild(div);
    });
  } else {
    container.innerText = "Failed to load courses.";
  }
});

async function enrollCourse(courseId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendURL}/buy/${courseId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (res.ok) {
    alert("Enrolled successfully!");
  } else {
    alert(data.error || "Enrollment failed");
  }
}
