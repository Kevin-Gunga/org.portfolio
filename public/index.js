const message = document.getElementById('dev-title')

const messages = [
    "software developer",
    "web developer",
    "frontend web developer",
    "backend web developer",
];

let index = 0;

function changeMessage() {
    index = (index + 1) % messages.length;
    document.getElementById("dev-title").textContent = messages[index];
}

// Change message every 3 seconds
setInterval(changeMessage, 3000);


const portfolioButtons = document.querySelectorAll('.portfolio-details button');
const portfolioMoreDetails = document.querySelectorAll('.view-details');  

function displayPortfolio (index) {
   if (portfolioMoreDetails[index].style.display === 'block') {
        portfolioMoreDetails[index].style.display = 'none';
   } else {
        portfolioMoreDetails[index].style.display = 'block'
   }
}

for (let i = 0; i < portfolioButtons.length; i++) {
    portfolioButtons[i].addEventListener('click', (function() {   
       displayPortfolio(i);
     }));
};

// portfolio
const portfolioDetailsItems = document.querySelectorAll('.portfolio-details ul li'); // Selecting all li items
const viewDetails = document.querySelectorAll('.view-details');
const portfolioDetailsImage = document.querySelectorAll('.portfolio-details li img');

function showDetails(index) {
    portfolioDetailsImage[index].style.display = 'none';
    viewDetails[index].style.display = 'block';
}

function hideDetails(index) {
    portfolioDetailsImage[index].style.display = 'block';
    viewDetails[index].style.display = 'none';
}

portfolioDetailsItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => showDetails(index));
    item.addEventListener('mouseleave', () => hideDetails(index));
});
// 

const technicalSkillsHeadingElement = document.querySelector('#technical-skills');
const nonTechnicalSkillsHeadingElement = document.querySelector('#non-technical-skills'); 

const technicalSkillsListElement = document.querySelector('#list-1');
const nonTechnicalSkillsListElement = document.querySelector('#list-2'); 

function displayList(element) {
    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

technicalSkillsHeadingElement.addEventListener('click', function() {
    displayList(technicalSkillsListElement);
});

nonTechnicalSkillsHeadingElement.addEventListener('click', function() {
    displayList(nonTechnicalSkillsListElement);
});


//connect to backend code
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        // const username = formData.get('username');
        // const password = formData.get('password');
        const name = document.getElementById('full_name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const authMsg = document.getElementById('auth-msg');

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });
            if(!response.ok) {
                 authMsg.textContent = "check email or name information!"
                // console.error();
            }else if (name === null || message === null) {
                authMsg.textContent = "name or message information is blank!"
            }else {
                authMsg.textContent = "message submitted successfully"
            }

        } catch (err) {
            authMsg.textContent = 'An error occured'
            // console.error(err);
            // console.error()
        }
    });
});
