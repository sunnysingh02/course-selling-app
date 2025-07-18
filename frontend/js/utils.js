function logout() {
  localStorage.removeItem("token");
  window.location.href = "signin.html";
}
