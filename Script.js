import API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("qr-form");
    const addLinkBtn = document.getElementById("add-link-btn");
    const linksContainer = document.getElementById("links-container");

    // ADD SOCIAL LINK
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
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch(API_BASE_URL, {
            method: "POST",
            body: formData
        })
        .then(res => {
            if (!res.ok) throw new Error("Server error");
            return res.json();
        })
        .then(data => {
            const img = document.createElement("img");
            img.src = "data:image/png;base64," + data.qrCode;
            img.style.width = "200px";

            const result = document.getElementById("qr-result");
            result.innerHTML = "";
            result.appendChild(img);
        })
        .catch(err => alert(err.message));
        fetch(BACKEND_URL + "/generate-qr", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(profileData)
})
.then(res => res.json())
.then(data => {
  // assuming backend sends { qr: "data:image/png;base64,..." }
  localStorage.setItem("qrImage", data.qr);

  // redirect to new page
  window.location.href = "qr.html";
})
.catch(err => {
  console.error(err);
  alert("QR generation failed");
});

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
