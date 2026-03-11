const API_URL = "http://localhost:5000/api";

export async function fetchMemories() {
  const res = await fetch(`${API_URL}/memories`);
  return res.json();
}

export async function addMemory(data) {
  const res = await fetch(`${API_URL}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMemory(id, data) {
  const res = await fetch(`${API_URL}/memories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMemory(id) {
  const res = await fetch(`${API_URL}/memories/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

export async function fetchMilestones() {
  const res = await fetch(`${API_URL}/milestones`);
  return res.json();
}

export async function addMilestone(data) {
  const res = await fetch(`${API_URL}/milestones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateMilestone(id, data) {
  const res = await fetch(`${API_URL}/milestones/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteMilestone(id) {
  const res = await fetch(`${API_URL}/milestones/${id}`, {
    method: "DELETE",
  });
  return res.json();
}