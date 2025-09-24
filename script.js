// Artist data
const artistsData = {
  "DJ Aurora": {
    bio: "Renowned for her electrifying EDM sets, DJ Aurora has been dominating festival stages worldwide. Her unique blend of trance and house beats creates an unforgettable atmosphere that keeps the crowd moving all night long.",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    performance: "Day 1 • 8:00 PM • Main Stage",
  },
  "Echo Bay": {
    bio: "Echo Bay mesmerizes audiences with atmospheric indie-pop and powerful melodies. Their dreamy soundscapes combined with energetic performances have made them a festival favorite.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    performance: "Day 2 • 7:00 PM • Main Stage",
  },
  Starlite: {
    bio: "Starlite brings cosmic electro-pop with dazzling visuals for a complete sensory feast. Their innovative use of synthesizers and light shows creates an otherworldly experience.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
    performance: "Day 2 • 5:30 PM • Sunset Stage",
  },
  "River Sound": {
    bio: "Fusing world rhythms with modern jazz, River Sound radiates feel-good vibes. Their multicultural approach to music brings people together on the dance floor.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
    performance: "Day 1 • 6:30 PM • Sunset Stage",
  },
  "Neon Dreams": {
    bio: "Masters of future bass and trap, Neon Dreams delivers hard-hitting beats with melodic overtones that create an explosive dance experience.",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=600&h=400&fit=crop",
    performance: "Day 1 • 9:30 PM • Electric Arena",
  },
  "Solar Eclipse": {
    bio: "Progressive trance legends Solar Eclipse close out the festival with their signature epic build-ups and euphoric drops that send the crowd into a frenzy.",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop",
    performance: "Day 2 • 10:00 PM • Main Stage",
  },
};

let ticketPrice = 0;

// Hide loader after page loads
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 500);
  }, 1000);
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Countdown timer
function updateCountdown() {
  const eventDate = new Date("2025-12-20T18:00:00").getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(
    2,
    "0"
  );
  document.getElementById("hours").textContent = String(hours).padStart(
    2,
    "0"
  );
  document.getElementById("minutes").textContent = String(
    minutes
  ).padStart(2, "0");
  document.getElementById("seconds").textContent = String(
    seconds
  ).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Schedule tab switching
function switchDay(day) {
  document.querySelectorAll(".schedule-tab").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".schedule-content").forEach((content) => {
    content.classList.remove("active");
  });

  document
    .querySelectorAll(".schedule-tab")
    [day - 1].classList.add("active");
  document.getElementById(`day${day}-schedule`).classList.add("active");
}

// Modal functions
function openArtistModal(artistName) {
  const artist = artistsData[artistName];
  if (artist) {
    document.getElementById("modalArtistName").textContent = artistName;
    document.getElementById("modalArtistImage").src = artist.image;
    document.getElementById("modalArtistBio").textContent = artist.bio;
    document.getElementById("modalPerformanceDetails").textContent =
      artist.performance;
    document.getElementById("artistModal").style.display = "block";
  }
}

function openTicketModal(type, price) {
  document.getElementById("ticketType").value = type;
  ticketPrice = price;
  updateTotal();
  document.getElementById("ticketModal").style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function updateTotal() {
  const quantity = document.getElementById("ticketQuantity").value;
  const total = ticketPrice * quantity;
  document.getElementById("totalPrice").textContent = total;
}

function purchaseTicket(event) {
  event.preventDefault();
  alert(
    "Thank you for your purchase! Your tickets will be sent to your email."
  );
  closeModal("ticketModal");
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".artist-card, .schedule-item, .ticket-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Parallax effect for hero video
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const video = document.querySelector(".video-background");
  if (video && scrolled < window.innerHeight) {
    video.style.transform = `translateX(-50%) translateY(${
      -50 + scrolled * 0.5
    }%)`;
  }
});

// Add hover sound effect (optional - requires audio file)
document
  .querySelectorAll(".artist-card, .buy-ticket-btn, .cta-button")
  .forEach((element) => {
    element.addEventListener("mouseenter", () => {
      // Add subtle scale animation
      element.style.transition = "transform 0.2s ease";
    });
  });

// Dynamic background particles (simple version)
function createParticle() {
  const particle = document.createElement("div");
  particle.style.position = "fixed";
  particle.style.width = "4px";
  particle.style.height = "4px";
  particle.style.background = "linear-gradient(45deg, #ff6b00, #ffcc00)";
  particle.style.borderRadius = "50%";
  particle.style.pointerEvents = "none";
  particle.style.opacity = Math.random();
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";
  particle.style.zIndex = "1";
  document.body.appendChild(particle);

  const duration = Math.random() * 3000 + 2000;
  particle.animate(
    [
      {
        transform: "translateY(0) scale(1)",
        opacity: particle.style.opacity,
      },
      {
        transform: `translateY(-${window.innerHeight + 100}px) scale(0)`,
        opacity: "0",
      },
    ],
    {
      duration: duration,
      easing: "ease-out",
    }
  ).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);