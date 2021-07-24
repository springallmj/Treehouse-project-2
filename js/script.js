/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
showPage() 

*/
function showPage (list, page){
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
   let numButtons;
   if(list==-1){
      numButtons=1;
   }else{
      numButtons=list.length/9;
   }
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

   if(ul.firstElementChild){
      ul.firstElementChild.firstElementChild.className='active'
   }

   //navigation
   ul.addEventListener('click', (e) =>{
      if (event.target.tagName=='BUTTON'){
         const input=document.querySelector('input');
         const currentActive=document.querySelector('.active');
         const selected=event.target.parentNode;
         currentActive.className='';
         const filteredData=search(input.value);
         selected.firstElementChild.className='active';
         showPage(filteredData, selected.textContent);
      }
   });
}


//Function creates the search form and inserts to page through DOM manipulation.
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
   */
   function displaySearch(event, searchValue){

      //filters only searches with results
      if((search(searchValue))!=-1){
         const filteredData=search(input.value);
         showPage(filteredData, 1);
         createButtons(filteredData);
         clearSearch.className="clear-search";
         if (event.type=='submit' || event.target.parentNode.id=='search'){
            input.value='';
         }

      //displays no result list item only
      }else{
         clearSearch.className="clear-search";
         noResult();
         if (event.type=='submit' || event.target.parentNode.id=='search'){
            input.value='';
         }
      }
   }

   function defaultData(){
      clearSearch.className="";
      showPage(data, 1);
      createButtons(data);
   }

   //creates no result list item and appends to the main student list ul
   function noResult(){
      const ul=document.querySelector('.student-list')
      ul.innerHTML='';
      const li=document.createElement('li');
      li.className="student-item cf";
      let html=`<div class="student-details">
                  <h3>No Results Found</h3>
               </div>`
      li.innerHTML=html;
      ul.appendChild(li);
      createButtons(-1);
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
      }
      else{
         defaultData();
      }
   });
   form.addEventListener('click', (e) => {
      if(event.target.parentNode.id=='search' && input.value!=""){
         displaySearch(event, input.value);
      }
      if(event.target.id=='clear'){
         input.value='';
         defaultData();
      }
   });
}



//searches the data array for any properties of the name object in each index which contain the search term
function search(text){
   const filteredData=[]
   for(let i=0; i<data.length; i++){
      let person=data[i];
      let name=`${person.name.title.toUpperCase()} ${person.name.first.toUpperCase()} ${person.name.last.toUpperCase()}`;
      if(name.includes(text.toUpperCase())){
         filteredData.push(data[i]);
      }
   }
   if(filteredData.length==0){
      return -1;
   }else{
      return filteredData;
   }
}


// Main function call for page initialisation
showPage(data, 1);
createButtons(data);
createSearch();
