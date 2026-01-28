document.addEventListener("DOMContentLoaded", () => {
  // Utility to get image ID from wrapper
  const getId = (item) => item.dataset.id;

  // Load saved data
  const loadState = () => {
    document.querySelectorAll(".gallery-item").forEach((item) => {
      const id = getId(item);

      // Load Captions
      const savedCaption = localStorage.getItem(`caption_${id}`);
      if (savedCaption) {
        item.querySelector(".caption").innerText = savedCaption;
      }

      // Load Votes
      const savedVote = parseInt(localStorage.getItem(`vote_${id}`)) || 0;
      item.querySelector(".vote-count").textContent = savedVote;
    });
  };

  // Save state
  const saveCaption = (id, text) => {
    localStorage.setItem(`caption_${id}`, text);
  };

  const saveVote = (id, count) => {
    localStorage.setItem(`vote_${id}`, count);
  };

  // Initialize
  loadState();

  // Event Listeners for Captions
  document.querySelectorAll(".caption").forEach((caption) => {
    caption.addEventListener("input", (e) => {
      const item = e.target.closest(".gallery-item");
      const id = getId(item);
      saveCaption(id, e.target.innerText);
    });

    // Prevent new lines on Enter
    caption.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
      }
    });
  });

  // Event Listeners for Buttons
  document.querySelectorAll(".gallery-item").forEach((item) => {
    const id = getId(item);
    const countSpan = item.querySelector(".vote-count");
    const upBtn = item.querySelector(".upvote");
    const downBtn = item.querySelector(".downvote");

    const updateCount = (change) => {
      let current = parseInt(countSpan.textContent);
      const newCount = current + change;
      countSpan.textContent = newCount;
      saveVote(id, newCount);

      // Simple animation
      countSpan.style.transform = "scale(1.2)";
      setTimeout(() => (countSpan.style.transform = "scale(1)"), 150);
    };

    upBtn.addEventListener("click", () => updateCount(1));
    downBtn.addEventListener("click", () => updateCount(-1));
  });

  // Lightbox Logic
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Open Lightbox
  document.querySelectorAll(".image-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      lightboxImg.src = img.src;
      lightbox.style.display = "flex"; // Use flex to center
      // Small delay to allow display:flex to apply before opacity transition
      setTimeout(() => {
        lightbox.classList.add("show");
      }, 10);
    });
  });

  // Close Lightbox functions
  const closeLightbox = () => {
    lightbox.classList.remove("show");
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 300); // Match transition duration
  };

  closeBtn.addEventListener("click", closeLightbox);

  // Close on clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });

  // Navigation Menu Logic
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});
