
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const delBtn = document.getElementById("del-btn")
const ulEl = document.getElementById("ul")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render()
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render()
    })
})

function render() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
         listItems += `
            <li> 
                <a href="${myLeads[i]}"> ${myLeads[i]} </a> 
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

delBtn.addEventListener("click", function() {
    myLeads = []
    ulEl.innerHTML = ""
    render()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = "" 
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render()
})