document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("guestbook-form");
  const guestbookEntries = document.getElementById("guestbook-entries");

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    const formData = { name, message };

    // Send POST request to server to save data to the database

    const response = await fetch("http://localhost:4252/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    //! THIS PART WAS HELPED WITH AI

    if (response.ok) {
      // If the request was successful, clear the form and reload the guestbook entries
      form.reset();
      loadGuestbookEntries(); // Reload the entries after successful submission
    } else {
      alert("Failed to add entry. Please try again.");
    }
  });

  //!=================================

  // Function to load guestbook entries
  async function loadGuestbookEntries() {
    const response = await fetch("http://localhost:4252/guestbook");
    const data = await response.json();

    guestbookEntries.innerHTML = ""; // Clear existing entries

    // Loop through entries and display them
    data.forEach((entry) => {
      const entryElement = document.createElement("div");
      entryElement.classList.add("guestbook-entry");
      entryElement.innerHTML = `
            <p><strong>${entry.name}</strong> (${entry.created_at}):</p>
            <p>${entry.message}</p>
          `;
      guestbookEntries.appendChild(entryElement);
    });
  }

  // Load guestbook entries when the page is loaded
  loadGuestbookEntries();
});
