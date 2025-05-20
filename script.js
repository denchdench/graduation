let students = [];

fetch("students.json")
  .then(response => {
    if (!response.ok) throw new Error("Failed to load students.json");
    return response.json();
  })
  .then(data => {
    students = data;
    console.log("Students loaded:", students);
  })
  .catch(err => {
    console.error("Error loading student data:", err);
    alert("Could not load student data. Please contact the administrator.");
  });

function searchStudent() {
  const indexInput = document.getElementById("indexInput").value.trim();
  const resultDiv = document.getElementById("result");
  const feedbackDiv = document.getElementById("feedback");

  const student = students.find(s => s["Index Number"].toString() === indexInput);

  if (student) {
    resultDiv.innerHTML = `
      <p><strong>Surname:</strong> ${student["Surname"]}</p>
      <p><strong>First Name:</strong> ${student["First Name"]}</p>
      <p><strong>Other Name:</strong> ${student["Other Names"] || "N/A"}</p>
      <p><strong>Index Number:</strong> ${student["Index Number"]}</p>
      <p><strong>Program:</strong> ${student["PROGRAM"]}</p>
    `;
    resultDiv.classList.remove("hidden");
    feedbackDiv.classList.remove("hidden");
  } else {
    resultDiv.innerHTML = "<p style='color:red;'>Student not found. Please check your Index Number and try again.</p>";
    resultDiv.classList.remove("hidden");
    feedbackDiv.classList.add("hidden");
  }
}

function submitFeedback() {
  const feedback = document.getElementById("feedbackText").value.trim();
  if (feedback) {
    alert("Thank you for your feedback!");
    document.getElementById("feedbackText").value = "";
  } else {
    alert("Please enter feedback before submitting.");
  }
}
