/*-----------------------------------------------------------------------------------------*/
//FUNCTIONS FOR 'ABOUT ME' SECTION
//returns skill card for the list of skills
function skillsList(el, skills) {
    for (skill of skills) {

        var imagePath = 'assets/logo_' + skill.toLowerCase().replaceAll(' ', '_') + '.png';
        el.innerHTML += `<div class="skill-card">
                                    <img src="${imagePath}" class="logo" onerror="this.src='assets/logo_default_skill.png'; this.onerror=null;"  ></img>
                                    <span class="skill">${skill}</span>
                                </div>`


    }
}
const skillsUiUx = [
    'Figma', 'User Research', 'Wireframing', 'Prototyping', 'User Centered Designs'
];
const skillsAndroidDev = [
    'Flutter and Dart', 'Responsive Application', 'State Management'
];
const skillsWebDev = [
    'HTML', 'CSS', 'Javascript'
];
const skillsBackend = [
    'Firebase', 'GraphQL', 'Supabase'
];
const skillsOthers = [
    'C++ Programming', 'Java Programming',
];
skillsList(document.getElementById('skills-ui-ux'), skillsUiUx);
skillsList(document.getElementById('skills-android-dev'), skillsAndroidDev);
skillsList(document.getElementById('skills-web-dev'), skillsWebDev);
skillsList(document.getElementById('skills-backend'), skillsBackend);
skillsList(document.getElementById('skills-others'), skillsOthers);

/*-----------------------------------------------------------------------------------------*/
//FUNCTIONS FOR 'MY PROJECTS' SECTION
//function for my projects Tabbar
const projects = [
    {
        type: 'Personal',
        title: 'UI/UX Case Study - TTMM',
        description: `TTMM, or "Tera Tu, Mera Me" (You pay yours, I pay mine), revolutionizes expense splitting
                        among friends in three straightforward steps. This case study showcases how TTMM eases
                        expense tracking, promoting fairness and simplicity in financial interactions, ultimately
                        enhancing friendships.`,
        link: `https://www.behance.net/gallery/168516273/TTMM-UIUX-Case-Study`,
        image: 'assets/ttmm_project_cover.jpeg',
    }
]
//returns project-card html for the given map
function getProjectCard(value) {
    return `<div class="project-card">
                                <img src="${value.image}" alt="">
                                <div class="project-card-content">
                                    <h2 class="project-card-title">
                                        ${value.title}
                                    </h2>
                                    <p class="project-card-description">
                                        ${value.description}
                                    </p>
                                    <a class="see-more-btn see-more-btn-small" id="see-more-btn"
                                        href="${value.link}" target="_blank">
                                        <span>View Project</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 31" fill="none">
                                            <path
                                                d="M2.85547 13.3012C1.7509 13.3012 0.855469 14.1966 0.855469 15.3012C0.855469 16.4058 1.7509 17.3012 2.85547 17.3012V13.3012ZM26.5588 16.7154C27.3399 15.9344 27.3399 14.668 26.5588 13.887L13.8309 1.15907C13.0499 0.378024 11.7835 0.378024 11.0025 1.15907C10.2214 1.94012 10.2214 3.20645 11.0025 3.9875L22.3162 15.3012L11.0025 26.6149C10.2214 27.396 10.2214 28.6623 11.0025 29.4433C11.7835 30.2244 13.0499 30.2244 13.8309 29.4433L26.5588 16.7154ZM2.85547 17.3012H25.1446V13.3012H2.85547V17.3012Z"
                                                fill="#ffffff" />
                                        </svg>
                                    </a>
                                </div>
                            </div>`;
}
//function to display all projects when web page is loaded
function defaultAllProjects() {
    var myProjectsList = document.getElementById('my-projects-list');
    projects.forEach((value, index) => {
        myProjectsList.innerHTML += getProjectCard(value);
    })
}
defaultAllProjects();

//listens tab click and shows list of projects accordingly
Array.from(document.getElementsByClassName('nav-item-small')).forEach(function (element, index) {
    element.addEventListener('click', function () {
        var navDivider = this.getElementsByClassName('hDivider-small');

        if (!navDivider[0].className.includes(' active')) {
            Array.from(document.getElementsByClassName('hDivider-small')).forEach(function (element, index) {
                element.classList.remove('active');
            });
            navDivider[0].className += ' active';
            var projectsToShow = document.getElementById('my-projects-list');
            projectsToShow.innerHTML = '';
            if (this.getElementsByTagName('a')[0].innerHTML == 'All') {
                projects.forEach((value, index) => {
                    projectsToShow.innerHTML += getProjectCard(value);
                });
            }
            else {
                projects.forEach((value, index) => {
                    if (value.type == this.getElementsByTagName('a')[0].innerHTML) {
                        projectsToShow.innerHTML += getProjectCard(value);
                    }
                });
            }
            //if theres no project to show
            if (projectsToShow.innerHTML == '') {
                projectsToShow.innerHTML = `<p class="my-projects-empty-text">No Projects Yet.</p>`;
            }
        }

    });
},);

/*-----------------------------------------------------------------------------------------*/
//FUNCTIONS FOR 'CONTACT ME' SECTION
//function to Submit the form
document.getElementById('contact-me-form')
    .addEventListener('submit', function (event) {

        let btn = document.getElementById('cotact-me-send-btn');
        let root = document.querySelector(':root');
        let showStatus = document.getElementById('submit-status-message');
        //if resubmitting the form, then clear the sent status if already displayed
        showStatus.innerHTML = '';
        event.preventDefault();
        //disables button
        btn.disabled = true;
        //injects loader in the button
        btn.innerHTML =
            `<div class="loader">
                <div class="spin"></div>
                <div class="bounce"></div>
            </div>`;
        setTimeout(() => {
            var params = {
                client_name: document.getElementById('contact-me-name'),
                email: document.getElementById('contact-me-email'),
                phone_number: document.getElementById('contact-me-phone'),
                message: document.getElementById('contact-me-message'),
            }
            const serviceID = "service_zcxbeis";
            const templateID = 'template_bw62ave';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    showStatus.innerHTML =
                        `<svg xmlns="http://www.w3.org/2000/svg" id="icon-success" fill="currentColor" class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <span class="submit-status" id="submit-status-text"></span>`;

                    showStatus.style.color = getComputedStyle(root).getPropertyValue('--success-color');
                    this.reset();
                    StartWriter(document.getElementById('submit-status-text'), ['Your message has been sent.'], 0, 50, 10, 19999999, 1000);
                    
                }, (err) => {
                    showStatus.innerHTML =
                        ` <svg xmlns="http://www.w3.org/2000/svg" id="icon-error" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                              </svg>
                        <span class="submit-status" id="submit-status-text"></span>`;
                    showStatus.style.color = getComputedStyle(root).getPropertyValue('--error-color');
                    StartWriter(document.getElementById('submit-status-text'), ['An error occured. Please try again.'], 0, 50, 10, 19999999, 1000);
                });
            showStatus.style.display = 'flex';
            btn.innerHTML = 'Send';
            btn.disabled = false;
        }, 2000);
    });
/*-----------------------------------------------------------------------------------------*/
//FUNCTIONS FOR 'GENERAL FUNCTIONS' SECTION
// function to generate the backspace effect 
function delWriter(element, text, i, cb, typingTime, deleteTime, startDeleteTimer, restartTime) {
    if (i >= 0) {
        element.innerHTML = text.substring(0, i--);
        // generate a random Number to emulate backspace hitting.

        setTimeout(function () {
            delWriter(element, text, i, cb, typingTime, deleteTime, startDeleteTimer, restartTime);
        }, deleteTime);
    } else if (typeof cb == 'function') {
        setTimeout(cb, restartTime);
    }
};

// function to generate the keyhitting effect
function typeWriter(element, text, i, cb, typingTime, deleteTime, startDeleteTimer, restartTime) {
    if (i < text.length + 1) {
        element.innerHTML = text.substring(0, i++);
        setTimeout(function () {
            typeWriter(element, text, i++, cb, typingTime, deleteTime, startDeleteTimer, restartTime)
        }, typingTime);
    } else if (i === text.length + 1) {
        setTimeout(function () {
            delWriter(element, text, i, cb, typingTime, deleteTime, startDeleteTimer, restartTime)
        }, startDeleteTimer);
    }
};

// the main writer function
function StartWriter(element, textArray, i, typingTime, deleteTime, startDeleteTimer, restartTime) {
    if (typeof textArray[i] == "undefined") {
        setTimeout(function () {
            StartWriter(element, textArray, 0, typingTime, deleteTime, startDeleteTimer, restartTime);
        }, typingTime);
    } else if (i < textArray[i].length + 1) {
        typeWriter(element, textArray[i], 0, function () {
            StartWriter(element, textArray, i + 1, typingTime, deleteTime, startDeleteTimer, restartTime);
        }, typingTime, deleteTime, startDeleteTimer, restartTime);
    }
};
var subtitleDoc = document.getElementById('home-bottom');
var subtitleArray = ["Flutter Developer", "Web Developer", "UI/UX Designer"];
var headingDoc = document.getElementById('sm-name');
var headingAray = ["Sanket More"];
// wait one second then start the typewriter
setTimeout(function () {
    StartWriter(headingDoc, headingAray, 0, 80, 0, 10000, 0);
    StartWriter(subtitleDoc, subtitleArray, 0, 80, 10, 2000, 1000);
}, 1000);








