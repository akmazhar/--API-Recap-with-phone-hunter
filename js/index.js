// console.log('Phone Hunting');
// const loadPhone = async (searchText='a', isShowAll) =>{
const loadPhone = async (searchText, isShowAll) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phone = data.data
  // console.log(phone);
  displayPhone(phone, isShowAll);
  }
  
  
  
  const displayPhone = (phone, isShowAll) =>{
  // console.log(phone)
  
  const phoneContainer = document.getElementById('phone-container');
  //clear sear box for new search
  phoneContainer.textContent = '';
  
  //display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if(phone.length > 12  && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }
  console.log('is show all', isShowAll);
  //display first 10 phone if not show all
  if(!isShowAll)
  phone = phone.slice(0,12);
  
  phone.forEach(phone =>{
      // console.log(phone);
      //create a div
      const phoneCard = document.createElement('div')
      phoneCard.classList = `card bg-gray-150 p-4 shadow-2xl`
      //set inner html
      phoneCard.innerHTML = `
      <figure><img src="${phone.image}" /></figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onClick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
        </div>
      </div>
      `;
  
      //appened child pls
      phoneContainer.appendChild(phoneCard);   
  })
  //hide loading spinner
  toggleLoadingSpinner(false);
  }
  //
  const handleShowDetail = async (id) =>{
  console.log('clicked show detail',id)
    //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  // console.log(data);
  showPhoneDetails(phone)
  }
  
  const showPhoneDetails = (phone) =>{
   console.log(phone);
   const phoneName = document.getElementById('show-details-phone-name');
   phoneName.innerText = phone.name;
   
   const showDetailsContainer = document.getElementById('show-details-container');
   
   showDetailsContainer.innerHTML = `
   <img src="${phone.image}"  alt="" />
   <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
   <P><span>${phone?.others?.GPS}</span></P>
   `
    //show the modal
    show_details_modal.showModal();
   

  }


  //handle search
  const handleSearch = (isShowAll) =>{
    // console.log('search handle');
    toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
  }
  
  // handle search
  // const handleSearch2 = () =>{
  //   // console.log('search handle');
  // const searchField = document.getElementById('search-field2');
  // const searchText = searchField.value;
  // console.log(searchText);
  // loadPhone(searchText);
  // }
  
  const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    
    if(isLoading){
      loadingSpinner.classList.remove('hidden')
    }
    else{
      loadingSpinner.classList.add('hidden');
    }
  }
  
  //handle show all
  const handleShowAll = () =>{
    handleSearch(true)
  }
  
  // loadPhone();
  