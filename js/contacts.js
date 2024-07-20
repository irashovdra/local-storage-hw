class ContactManager {
  constructor() {
    this.form = document.querySelector(".contact-form");
    this.list = document.querySelector(".contact-list");
    this.loadContacts();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOrUpdateContact();
    });

    this.list.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit-btn")) {
        this.editContact(parseInt(e.target.dataset.index));
      } else if (e.target.classList.contains("delete-btn")) {
        this.deleteContact(parseInt(e.target.dataset.index));
      }
    });
  }

  loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    this.list.innerHTML = "";
    contacts.forEach((contact, index) => {
      this.displayContact(contact, index);
    });
  }

  displayContact(contact, index) {
    const li = document.createElement("li");
    li.innerHTML = `
            ${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
    this.list.appendChild(li);
  }

  addOrUpdateContact() {
    const firstName = this.form.querySelector(".first-name").value;
    const lastName = this.form.querySelector(".last-name").value;
    const phone = this.form.querySelector(".phone").value;
    const email = this.form.querySelector(".email").value;

    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const existingIndex = contacts.findIndex((c) => c.email === email);

    if (existingIndex > -1) {
      contacts[existingIndex] = { firstName, lastName, phone, email };
    } else {
      contacts.push({ firstName, lastName, phone, email });
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
    this.form.reset();
    this.loadContacts();
  }

  deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    this.loadContacts();
  }

  editContact(index) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contact = contacts[index];
    this.form.querySelector(".first-name").value = contact.firstName;
    this.form.querySelector(".last-name").value = contact.lastName;
    this.form.querySelector(".phone").value = contact.phone;
    this.form.querySelector(".email").value = contact.email;
    this.form.removeEventListener("submit", this.addOrUpdateContact.bind(this));
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addOrUpdateContact();
    });
  }
}

const contactManager = new ContactManager();
