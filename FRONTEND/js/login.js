// Endpotint Call
export function getUser(user) {
  return fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((user) => {
      console.log(user);
      localStorage.setItem("keyUser", JSON.stringify(user));
      return user;
    });
}
