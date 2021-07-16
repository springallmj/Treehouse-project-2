/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list, page){
   const liPerPage=9;
   const firstIndex=(page*liPerPage)-liPerPage;
   const lastIndex=(page*liPerPage)-1;
   const ul=document.querySelector('.student-list')
   ul.innerHTML='';

   for (let i=firstIndex; i<=lastIndex; i++){
      if(list[i]){
         const li=document.createElement('li');
         li.className="student-item cf";
         let html=`<div class="student-details">
                     <img class="avatar" src="${list[i]['picture']['large']}" alt="Profile Picture">
                     <h3>${list[i]['name']['first']} ${list[i]['name']['last']}</h3>
                     <span class="email">${list[i]['email']}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">${list[i]['registered']['date']}</span>
                  </div>`
         li.innerHTML=html;
         ul.appendChild(li)
      }
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function createButtons(list){
   const numButtons=list.length/9;
   const ul=document.querySelector('.link-list');
   ul.innerHTML='';
   for (let i=0; i<numButtons; i++){
      li=document.createElement('li');
      button=document.createElement('button');
      button.type='button';
      button.textContent=`${i+1}`;
      li.appendChild(button);
      ul.appendChild(li);
   }
   ul.firstElementChild.firstElementChild.className='active'

   ul.addEventListener('click', (e) =>{
      if (event.target.tagName=='BUTTON'){
         const currentActive=document.querySelector('.active')
         const selected=event.target.parentNode;
         currentActive.className='';
         
         selected.firstElementChild.className='active';
         showPage(data, selected.textContent);
      }
   });
}


//Function creates search form and dynamically inserts to page.
function createSearch(){
   const header=document.querySelector('header');
   const form=document.createElement('form');
   const html=`<label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>`
   form.innerHTML=html;
   header.appendChild(form); 
   form.addEventListener('submit', (e) =>{
      event.preventDefault();
      const input=form.querySelector('input');

      const filteredSearch=search(input.value);
      input.value='';

      showPage(filteredSearch, 1);
      createButtons(filteredSearch);
   });
}

function search(text){
   const filteredData=[]
   for(let i=0; i<data.length; i++){
      let title=(data[i]['name']['title']).toUpperCase();
      let firstName=(data[i]['name']['first']).toUpperCase();
      let lastName=(data[i]['name']['last']).toUpperCase();
   if(title.includes(text.toUpperCase()) ||
      firstName.includes(text.toUpperCase()) ||
      lastName.includes(text.toUpperCase())){
         filteredData.push(data[i]);
      }
   }
   return filteredData;
}

// Call functions


showPage(data, 1);
createButtons(data);
createSearch();
