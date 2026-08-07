/* ======================================================
Website Profil Desa Kotasan
====================================================== */

/* ======================================================
SELECTOR
====================================================== */

const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-menu a");

/* ======================================================
STICKY NAVBAR
====================================================== */

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

/* ======================================================
MOBILE MENU
====================================================== */

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

document.addEventListener("click",(e)=>{

    if(
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ){
        navMenu.classList.remove("show");
    }

});

/* ======================================================
TUTUP MENU SETELAH DIKLIK
====================================================== */

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});

/* ======================================================
BACK TO TOP
====================================================== */

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        backToTop.classList.add("active");
    } else {
        backToTop.classList.remove("active");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ======================================================
ACTIVE NAVBAR
====================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ==========================================
HERO SLIDESHOW
========================================== */

const heroBackground = document.getElementById("heroBackground");
const heroImages=[
"assets/images/hero/hero1.jpg",
"assets/images/hero/hero2.jpg",
"assets/images/hero/hero3.jpg",
"assets/images/hero/hero4.jpg",
"assets/images/hero/hero5.jpg"
];

let heroIndex=0;

heroBackground.style.backgroundImage = `url(${heroImages[0]})`;

setInterval(()=>{

heroIndex++;

if(heroIndex>=heroImages.length){
heroIndex=0;
}

heroBackground.style.opacity=0;

setTimeout(()=>{

heroBackground.style.backgroundImage=

`url(${heroImages[heroIndex]})`;

heroBackground.style.opacity=1;

},500);

},5000);

/* ==========================================
GALLERY ANIMATION
========================================== */

const galleryImages=document.querySelectorAll(".gallery-track img");
const prevBtn=document.querySelector(".gallery-btn.prev");
const nextBtn=document.querySelector(".gallery-btn.next");
const dotsContainer=document.querySelector(".gallery-dots");

let galleryIndex=0;

galleryImages.forEach((img,index)=>{

    img.onclick=()=>{

        viewer.classList.add("show");
        showImage(index);

    };

});

const dots=document.querySelectorAll(".gallery-dots span");

function showGallery(){

    galleryImages.forEach(img=>img.classList.remove("active"));
    dots.forEach(dot=>dot.classList.remove("active"));

    galleryImages[galleryIndex].classList.add("active");
    dots[galleryIndex].classList.add("active");

}

nextBtn.onclick=()=>{

    galleryIndex++;

    if(galleryIndex>=galleryImages.length)
        galleryIndex=0;

    showGallery();

};

prevBtn.onclick=()=>{

    galleryIndex--;

    if(galleryIndex<0)
        galleryIndex=galleryImages.length-1;

    showGallery();

};

setInterval(()=>{

    galleryIndex++;

    if(galleryIndex>=galleryImages.length)
        galleryIndex=0;

    showGallery();

},5000);

/* ==========================================
COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounter() {
    if (counterStarted) return;
    const section = document.querySelector("#statistics");
    const triggerPoint = section.offsetTop - window.innerHeight + 100;

    if (window.scrollY < triggerPoint) return;
    counterStarted = true;
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const suffix = counter.dataset.suffix || "";

        let current = 0;

        const duration = 1800;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            counter.textContent =
                Math.floor(current).toLocaleString("id-ID") + suffix;
        }, stepTime);
    });
}

window.addEventListener("scroll", startCounter);

/* ==========================================
STAT CARD ANIMATION
========================================== */

const statCards = document.querySelectorAll(".stat-card");
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);
        }
    });

}, {
    threshold: 0.3
});

statCards.forEach(card => {
    statObserver.observe(card);

});

/* ==========================================
IMAGE VIEWER
========================================== */

const viewer = document.getElementById("imageViewer");
const viewerImg = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");
const viewerCounter = document.getElementById("viewerCounter");

const images = document.querySelectorAll(".gallery .preview-image");
const governmentImage = document.querySelector(".government-preview");

let currentImage = 0;

function showImage(index){

    currentImage=index;

    viewerImg.src=galleryImages[index].src;

    viewerImg.style.width="auto";
    viewerImg.style.height="auto";
    viewerImg.style.maxWidth="90%";
    viewerImg.style.maxHeight="85vh";

    viewerCounter.textContent=
        `${index+1} / ${galleryImages.length}`;

}

if(viewer && viewerImg){
    images.forEach((image,index)=>{
        image.addEventListener("click",()=>{
            viewer.classList.add("show");
            prevImage.style.display = "block";
            nextImage.style.display = "block";
            viewerCounter.style.display = "block";
            showImage(index);
        });
    });

    closeViewer.onclick=()=>{
        viewer.classList.remove("show");
    };

    viewer.onclick=(e)=>{
        if(e.target===viewer){
            viewer.classList.remove("show");
        }
    };

    nextImage.onclick=()=>{
        currentImage++;

        if(currentImage>=images.length){
            currentImage=0;
        }

        showImage(currentImage);
    };

    prevImage.onclick=()=>{
        currentImage--;

        if(currentImage<0){
            currentImage=images.length-1;
        }

        showImage(currentImage);
    };

    document.addEventListener("keydown",(e)=>{
        if(!viewer.classList.contains("show")) return;

        if(e.key==="Escape"){
            viewer.classList.remove("show");
        }

        if(e.key==="ArrowRight"){
            nextImage.click();
        }

        if(e.key==="ArrowLeft"){
            prevImage.click();
        }
    });
}

/* ==========================================
AUTO YEAR
========================================== */

const year=document.getElementById("year");
if(year){
    year.textContent=new Date().getFullYear();
}

/* ==========================================
LOADER
========================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    if (sessionStorage.getItem("loaderShown")) {
        loader.style.display = "none";
        return;
    }

    sessionStorage.setItem("loaderShown", "true");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 900);

});

/* ==========================================
SCROLL REVEAL
========================================== */

const reveals=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
    
},{
    threshold:.15
});

reveals.forEach(section=>{
    revealObserver.observe(section);
});

/* ==========================================
PAGE TRANSITION
========================================== */

if (location.protocol !== "file:") {

    document.querySelectorAll('a[href$=".html"]').forEach(link => {

        link.addEventListener("click", function (e) {

            if (e.ctrlKey || e.metaKey || e.shiftKey) return;

            e.preventDefault();

            document.body.classList.add("page-transition");

            setTimeout(() => {
                window.location.href = this.href;
            }, 300);

        });

    });

    window.addEventListener("pageshow", () => {
        document.body.classList.remove("page-transition");
    });

}