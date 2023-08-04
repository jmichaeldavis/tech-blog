const logoutBtn = document.getElementById("logout");
const homeBtn = document.getElementById("home");
const dashboardBtn = document.getElementById("dashboard");


const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/login");
  } else {
    alert("Failed to log out");
  }
};

const home = () => {
  document.location.replace("/");
};

const dashboard = () => {
  document.location.replace("/blog-post/dashboard");
};

logoutBtn.addEventListener("click", logout);
homeBtn.addEventListener("click", home);
dashboardBtn.addEventListener("click", dashboard);

