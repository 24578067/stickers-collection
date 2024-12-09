// SWIPER
const swiper = new Swiper(".new-stickers__slider", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

new Swiper(".new-stickers__slider--mobile", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

new Swiper(".auction__slider", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// FOR AUTHORS FORM
const fileInput = document.getElementById("file-input");
const fileLabel = document.getElementById("file-label");
const dropZone = document.getElementById("attach-file");
const previewContainer = document.getElementById("preview-container");
const plusIcon = document.getElementById("plus-icon");

fileInput.addEventListener("focus", () => {
  fileLabel.classList.add("focus");
});

fileInput.addEventListener("blur", () => {
  fileLabel.classList.remove("focus");
});

dropZone.addEventListener("click", () => {
  fileInput.click();
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropZone.addEventListener("drag", preventDefaults, false);
dropZone.addEventListener("dragstart", preventDefaults, false);
dropZone.addEventListener("dragend", preventDefaults, false);
dropZone.addEventListener("dragover", preventDefaults, false);
dropZone.addEventListener("dragenter", preventDefaults, false);
dropZone.addEventListener("dragleave", preventDefaults, false);
dropZone.addEventListener("drop", preventDefaults, false);

function handleDragOver(e) {
  e.preventDefault();
  dropZone.classList.add("dragover");
}

function handleDragLeave() {
  dropZone.classList.remove("dragover");
}

dropZone.addEventListener("dragover", handleDragOver);
dropZone.addEventListener("dragenter", handleDragOver);
dropZone.addEventListener("dragleave", handleDragLeave);

dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  dropZone.classList.remove("dragover");

  var files = e.dataTransfer.files;
  displayPreviews(files);
  sendFiles(files);
});

document.getElementById("file-input").addEventListener("change", function () {
  let files = this.files;
  displayPreviews(files);
  sendFiles(files);
});

function displayPreviews(files) {
  previewContainer.innerHTML = "";

  let imageCount = 0;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (
      file.size <= 5242880 &&
      (file.type === "image/png" || file.type === "image/jpeg") &&
      imageCount < 5
    ) {
      imageCount++;

      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.classList.add("preview-image");

      previewContainer.appendChild(img);
    }
  }

  if (imageCount > 0) {
    plusIcon.style.display = "none";
    fileLabel.style.display = "none";
  } else {
    plusIcon.style.display = "block";
    fileLabel.style.display = "block";
  }
}

function sendFiles(files) {
  let maxFileSize = 5242880;
  let data = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    if (
      file.size <= maxFileSize &&
      (file.type === "image/png" || file.type === "image/jpeg")
    ) {
      data.append("images[]", file);
    }
  }
  sendFormData(dropZone, data);
}

function sendFormData(dropZone, data) {
  const xhr = new XMLHttpRequest();
  const url = dropZone.getAttribute("action");
  const method = dropZone.getAttribute("method");

  xhr.open(method, url, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      alert("Файлы были успешно загружены");
    } else {
      console.error("Ошибка загрузки файлов:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Ошибка сети");
  };

  xhr.send(data);
}
