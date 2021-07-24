/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

let filteredData=data;
/*
showPage() 
*/
function showPage(list, page){
   const liPerPage=9;
   const firstIndex=(page*liPerPage)-liPerPage;
   const lastIndex=(page*liPerPage)-1;
   const ul=document.querySelector('.student-list')
   ul.innerHTML='';

   for (let i=0; i<=list.length; i++){
      if(i>=firstIndex && i<=lastIndex){
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
            ul.appendChild(li);
         }
      }
   }  
}

/*
createButtons() will create and insert/append to the DOM the elements needed for the 
required number of pagination buttons
*/
function createButtons(list){
   const ul=document.querySelector('.link-list');
   ul.innerHTML='';
   let numButtons=list.length/9;

   for (let i=0; i<numButtons; i++){
      li=document.createElement('li');
      button=document.createElement('button');
      button.type='button';
      button.textContent=`${i+1}`;
      li.appendChild(button);
      ul.appendChild(li);
   }

   if(ul.firstElementChild){
      ul.firstElementChild.firstElementChild.className='active'
   }
   //pagination button navigation
   ul.addEventListener('click', (e) =>{
      if (event.target.tagName=='BUTTON'){
         if(filteredData!='undefined'){
            const input=document.querySelector('input');
            const prevActive=document.querySelector('.active');
            const nextActive=event.target.parentNode;
            prevActive.className='';
            nextActive.firstElementChild.className='active';

            showPage(filteredData, nextActive.textContent);
         }
      }
   });
}


//Function creates the search form and inserts to page through DOM manipulation.
//createSearch() holds all search functionality and event listeners to action user searches and filter Data array.
function createSearch(){
   const header=document.querySelector('header');
   const form=document.createElement('form');
   const html=`<label for="search" class="student-search">
                  <span>Search by name</span>
                  <input id="search" placeholder="Search by name...">
                  <button type="button" id="search"><img src="img/icn-search.svg" alt="Search icon"></button>
                  <button type="button" id="clear">Clear Search</button>
               </label>`
   form.innerHTML=html;
   header.appendChild(form); 
   const input=form.querySelector('input');
   const clearSearch=form.querySelector('#clear');

   /*displaySearch() is called within the Event handler for all 3 types of 'search' submission.
   This constitutes the main search parameters and displays the inserts the correct search filtered data 
   to the page and relative data pagination page numbers.
   Primary search function search(text) is located outside of createSearch scope as brief identifies it as a seperate step
   */
   function displaySearch(event, searchValue){
      //filters only searches with results
      if((search(searchValue))!='undefined'){
         filteredData=search(input.value);
         showPage(filteredData, 1);
         createButtons(filteredData);
         clearSearch.className="clear-search";
         if (event.type=='submit' || event.target.parentNode.id=='search'){
            input.value='';
         }
      //displays no result list item only when search(text) function returns 'undefined'
      }else{
         clearSearch.className="clear-search";
         noResult();
         //reset input field value when click or submit on no result search
         if (event.type=='submit' || event.target.parentNode.id=='search'){
            input.value='';
         }
      }
   }

   //re-initialises filteredData array and resets page display
   function defaultData(){
      filteredData=data;
      clearSearch.className="";
      showPage(filteredData, 1);
      createButtons(filteredData);
   }

   //creates 'no result found' list item and appends to the main student ul
   function noResult(){
      const ul=document.querySelector('.student-list')
      filteredData=[];
      ul.innerHTML='';
      const li=document.createElement('li');
      li.className="student-item cf";
      let html=`<div class="student-details">
                  <h3>No Results Found</h3>
               </div>`
      li.innerHTML=html;
      ul.appendChild(li);
      createButtons(filteredData);
   }

   form.addEventListener('submit', (e) => {
      event.preventDefault();
      if(input.value!=""){
         displaySearch(event, input.value);
      }
   });
   form.addEventListener('input', (e) => {
      if(input.value!=""){
         displaySearch(event, input.value);
      }else{
         defaultData();
      }
   });
   form.addEventListener('click', (e) => {
      if(event.target.parentNode.id=='search' && input.value!=""){
         displaySearch(event, input.value);
      }
      if(event.target.id=='clear' && filteredData.length!=data.length){
         input.value='';
         filteredData=data;
         defaultData();
      }
   });
}

/*
searches the main data array for matches to search term.
Search is conducted on a string of combined name properties of each index within data array.
Search is not case sensitive - search terms and name string converted to uppercase.
*/
function search(text){
   const filteredArray=[];
   for(let i=0; i<data.length; i++){
      let person=data[i];
      let name=`${person.name.title.toUpperCase()} ${person.name.first.toUpperCase()} ${person.name.last.toUpperCase()}`;
      if(name.includes(text.toUpperCase())){
         filteredArray.push(data[i]);
      }
   }
   if(filteredArray.length==0){
      return 'undefined';
   }else{
      return filteredArray;
   }
}

// Main function call for page initialisation
showPage(filteredData, 1);
createButtons(filteredData);
createSearch();
