const { default: axios } = require("axios")

console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}
const baseURL = 'http://localhost:4000'

function getAllChars(){
  clearCharacters()
  axios.get(`${baseURL}/characters`)
  .then(function(res){
    //returns a promise that we are calling res
    //loop over res and call the crateCharacterCard on each element in the array
    for(let i=0; i < res.data.length; i++){
      createCharacterCard(res.data[i])
    }

  })
  .catch(error => console.log(error))
}

getAllBtn.addEventListener('click', getAllChars)


//get a single character
function getOneChar(){
  clearCharacters()
  console.log(event.target)
  axios.get(`${baseURL}/character/`)
  
}

for(let i=0; i < charBtns.length; i++){
 charBtns[i].addEventListener('click',getOneChar)
}

//get characters above a certain age
function getOldChars(event){
  event.preventDefault()
  clearCharacters()
  console.log(ageInput.value)
  axios
  
}
//create new character
function createNewChar(event){
  event.preventDefault()
  clearCharacters()

  //getting the comma separated input and turning it into an array
  let newLikes = [...newLikesText.value.split(',')]

  //creating a body to send with the request
  let body = {
    firstName:newFirstInput.value,
    lastName:newLastInput.value,
    gender:newGenderDropDown.value,
    age:newAgeInput.value,
    likes:newLikes
  }
  axios.post(`${baseURL}/character`,body)
  .then(res =>{
    res.data.map(char =>createCharacterCard(char))
  })
  .catch(err => console.error(err))

  //clear out inout fields for the form
  newFirstInput.value = ''
  newLastInput.value = ''
  newGenderDropDown.value = ''
  newAgeInput.value = ''
  newLikesText.value = ''
}
createForm.ATTRIBUTE_NODE.addEventListener('submit', createNewChar)