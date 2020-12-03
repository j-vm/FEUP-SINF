async function login(username, password) {
  const result = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (result.status !== 200) {
    throw new Error(`Login failed with status ${result.status}`);
  }
  const parsed = await result.json();
  return parsed.token;
}

export default login;
