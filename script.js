// ========= DATA =========
const works = [
  {
    name: "Youtube clone",
    status: false,
    info: "My first finished project, after learning the basics of HTML, CSS, and JS.",
    tags: ["web", "design", "Front-end"],
    img: "images/yt-clone.png",
    dataType: "web",
    gallery: ["images/yt-1.png", "images/yt-2.png", "images/yt-3.png"],
    detailInfo:
      "This is a more detailed info about the project. I will explain what I used, what I learned, and the time it took me to finish it from the start.",
  },
  {
    name: "Extension filtering",
    status: true,
    info: "A simple DOM project to practice my JS",
    tags: ["web", "design", "Front-end"],
    img: "C:/Users/mamuka.chidrashvili/Pictures/Screenshots/Skärmbild 2026-02-17 124708.png",
    dataType: "web",
    gallery: [],
    detailInfo:
      "This is a more detailed info about the project. I will explain what I used, what I learned, and the time it took me to finish it from the start."
  },
  {
    name: "A local AI chatbot",
    status: true,
    info: "My first AI-related work. A fully functional chatbot, run locally that can make google maps API calls.",
    tags: ["web", "Back-end", "AI", "API"],
    img: "images/chidra.png",
    dataType: "web",
    gallery: [
      "images/chidra-1.png",
      "images/chidra-2.png",
      "images/chidra-3.png",
    ],
    detailInfo:
      "This is a more detailed info about the project. I will explain what I used, what I learned, and the time it took me to finish it from the start.",
  },
  {
    name: "3D Snowman",
    status: false,
    info: "My first 3D model with textures and particles. ",
    tags: ["3D", "Art", "Blender"],
    img: "images/snowman_Final.png",
    dataType: "art",
    gallery: [
      "images/snowman-1.png",
      "images/snowman-2.png",
      "images/snowman-3.png",
    ],
    detailInfo:
      "This is a more detailed info about the project. I will explain what I used, what I learned, and the time it took me to finish it from the start.",
  },
  {
    name: "2D flying game",
    status: true,
    info: "My first 2D game in Unity ",
    tags: ["2D", "Art", "Unity"],
    img: "images/game1.avif",
    dataType: "game",
    gallery: ["images/fhero-1.png", "images/fhero-2.png", "images/fhero-3.png"],
    detailInfo:
      "This is a more detailed info about the project. I will explain what I used, what I learned, and the time it took me to finish it from the start.",
  },
];

// ========= PROJECT GRID CREATION =========
function makeProject(work) {
  const div_project = document.createElement("div");
  div_project.classList.add("project");
  div_project.dataset.type = work.dataType;

  const img = document.createElement("img");
  img.src = work.img;
  img.alt = work.name;

  const description_section = document.createElement("section");
  description_section.classList.add("description");

  const div_name = document.createElement("div");
  div_name.classList.add("name");

  const span_projectName = document.createElement("span");
  span_projectName.classList.add("project-name");
  span_projectName.textContent = work.name;

  const span_status = document.createElement("span");
  span_status.classList.add("status");
  if (work.status) {
    span_status.textContent = "✓";
    span_status.classList.add("done");
  } else {
    span_status.textContent = "X";
  }

  const p_info = document.createElement("p");
  p_info.classList.add("info");
  p_info.textContent = work.info;

  const div_tags = document.createElement("div");
  div_tags.classList.add("tags");

  for (let i = 0; i < work.tags.length; i++) {
    const button_tag = document.createElement("button");
    button_tag.type = "button";
    button_tag.textContent = work.tags[i];
    div_tags.appendChild(button_tag);
  }

  div_name.append(span_projectName, span_status);
  description_section.append(div_name, p_info, div_tags);
  div_project.append(img, description_section);

  document.getElementById("projects").appendChild(div_project);
}

works.forEach((work) => makeProject(work));

// ========= FILTERS =========
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

function setupFilter() {
  const filterButtons = document.querySelectorAll(".banner .filters button");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const projects = document.querySelectorAll(".project");

      let found = false;

      projects.forEach((project) => {
        const projectType = project.dataset.type;
        const show = type === "all" || projectType === type;

        project.style.display = show ? "block" : "none";
        if (show && type !== "all") found = true;
      });

      if (!found && type !== "all" && btn.id !== "clear") {
        showPopup("No projects found for: " + type);
      }
    });
  });
}

setupFilter();

document.getElementById("clear").addEventListener("click", () => {
  document.querySelectorAll(".project").forEach((project) => {
    project.style.display = "block";
  });
});

// ========= THEME TOGGLE =========
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// ========= PROJECT POPUP CARD =========
let currentGallery = [];
let currentProject = null;
let currentIndex = 0;

function closeOverlay() {
  const overlay = document.querySelector(".card-overlay");
  if (overlay) overlay.remove();
}

function displayProject(work) {
  currentProject = work;

  // Remove old overlay if any
  closeOverlay();

  // Build gallery: main image first + gallery after, remove duplicates
  const allImgs = [work.img, ...(work.gallery || [])].filter(Boolean);
  currentGallery = [...new Set(allImgs)];
  currentIndex = 0;

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "card-overlay";

  // Close when clicking outside the card
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  // Card container
  const card = document.createElement("div");
  card.className = "card";

  // Image container
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  const image = document.createElement("img");
  image.id = "main-image";
  image.src = currentGallery[currentIndex] || work.img;
  image.alt = work.name;
  imageContainer.appendChild(image);

  // Content container
  const content = document.createElement("div");
  content.className = "content";

  // Title
  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = work.name;
  content.appendChild(title);

  // Info (short)
  const info = document.createElement("p");
  info.className = "info";
  info.textContent = work.info;
  content.appendChild(info);

  // Optional detail text
  if (work.detailInfo) {
    const detail = document.createElement("p");
    detail.className = "detail";
    detail.textContent = work.detailInfo;
    content.appendChild(detail);
  }

  // Tags
  const tags = document.createElement("div");
  tags.className = "tags";
  (work.tags || []).forEach((tagText) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    tags.appendChild(tag);
  });
  content.appendChild(tags);

  // Status line
  const status = document.createElement("div");
  status.className = "status-line";
  status.textContent = work.status ? "Status: ✓ Done" : "Status: X In progress";
  content.appendChild(status);

  // Thumbnails row (under status)
  const thumbs = document.createElement("div");
  thumbs.className = "thumbs";

  currentGallery.forEach((src, i) => {
    const t = document.createElement("img");
    t.className = "thumb";
    t.src = src;
    t.alt = `${work.name} ${i + 1}`;
    t.addEventListener("click", () => switchImage(i));
    thumbs.appendChild(t);
  });

  content.appendChild(thumbs);

  // Prev/Next buttons
  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const prevBtn = document.createElement("button");
  prevBtn.className = "btn nav-btn";
  prevBtn.type = "button";
  prevBtn.textContent = "Prev";

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn nav-btn";
  nextBtn.type = "button";
  nextBtn.textContent = "Next";

  prevBtn.addEventListener("click", () => switchImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => switchImage(currentIndex + 1));

  buttons.append(prevBtn, nextBtn);
  content.appendChild(buttons);

  // Optional: Close button (nice UX)
  const closeBtn = document.createElement("button");
  closeBtn.className = "btn nav-btn";
  closeBtn.type = "button";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", closeOverlay);
  buttons.appendChild(closeBtn);

  // Build card
  card.appendChild(imageContainer);
  card.appendChild(content);

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  // Init highlight + disable state
  function updateNavState() {
    const canMove = currentGallery.length > 1;

    prevBtn.disabled = !canMove;
    nextBtn.disabled = !canMove;

    prevBtn.classList.toggle("disabled", !canMove);
    nextBtn.classList.toggle("disabled", !canMove);
  }

  updateNavState();
  switchImage(0); // highlight first thumb
}

function switchImage(index) {
  if (!currentGallery.length) return;

  // clamp index
  if (index < 0) index = 0;
  if (index > currentGallery.length - 1) index = currentGallery.length - 1;

  currentIndex = index;

  const image = document.getElementById("main-image");
  if (image) image.src = currentGallery[currentIndex];

  // highlight active thumb
  document.querySelectorAll(".thumb").forEach((t, i) => {
    t.classList.toggle("active", i === currentIndex);
  });
}

// ========= CLICK EACH PROJECT TO OPEN POPUP =========
function setupProjectClicks() {
  const projectEls = document.querySelectorAll(".project");
  projectEls.forEach((el, index) => {
    el.addEventListener("click", () => displayProject(works[index]));
  });
}

setupProjectClicks();
