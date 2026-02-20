//import API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("qr-form");
    const addLinkBtn = document.getElementById("add-link-btn");
    const linksContainer = document.getElementById("links-container");

    // ADD SOCIAL LINK----------
    addLinkBtn.addEventListener("click", function () {
        const div = document.createElement("div");
        div.className = "link-group";

        div.innerHTML = `
            <input type="text" name="socialTitle[]" placeholder="Platform" required>
            <input type="url" name="socialLink[]" placeholder="https://example.com" required>
            <button type="button" class="remove">Remove</button>
        `;

        linksContainer.appendChild(div);
        div.querySelector(".remove").onclick = () => div.remove();
    });

    // FORM SUBMIT
   form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
       const res = await fetch(
  "https://digital-profile-backend-production-aa53.up.railway.app/api/profile",
  {
    method: "POST",
    body: formData////////
  }
);

        if (!res.ok) throw new Error("Backend error");

        const data = await res.json();

        localStorage.setItem("qrImage", data.qrCode);
        window.location.href = "qr.html";

    } catch (err) {
        console.error(err);
        alert("QR generation failed");
    }
});


    // ADD CONTACT
    const addBtn = document.getElementById("add-contact");
    const container = document.getElementById("contacts-container");

    addBtn.addEventListener("click", () => {
        const div = document.createElement("div");
        div.className = "contact-row";

        div.innerHTML = `
            <input type="text" name="contactTitle[]" placeholder="Title (Phone / Email)" required>
            <input type="text" name="contactValue[]" placeholder="Enter value" required>
            <button type="button" class="remove-contact">❌</button>
        `;

        container.appendChild(div);
        div.querySelector(".remove-contact").onclick = () => div.remove();
    });

});
