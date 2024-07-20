document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".bookmark-form");
  const bookmarkInput = document.querySelector(".bookmark-url");
  const bookmarkList = document.querySelector(".bookmark-list");

  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

  function displayBookmarks() {
    bookmarkList.innerHTML = "";
    bookmarks.forEach((bookmark, index) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = bookmark;
      a.textContent = bookmark;
      a.target = "_blank";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.onclick = () => editBookmark(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => deleteBookmark(index);

      li.appendChild(a);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      bookmarkList.appendChild(li);
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = bookmarkInput.value;
    bookmarks.push(url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    bookmarkInput.value = "";
    displayBookmarks();
  });

  function editBookmark(index) {
    const newUrl = prompt("Edit URL:", bookmarks[index]);
    if (newUrl) {
      bookmarks[index] = newUrl;
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      displayBookmarks();
    }
  }

  function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
  }

  displayBookmarks();
});
