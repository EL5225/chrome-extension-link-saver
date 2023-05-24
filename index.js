let myLeads = [];
const saveBtn = document.getElementById("save-btn");
const inputEl = document.getElementById("input-el");
const ulEL = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("savetab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
  
})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})


saveBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads);

    //console.log( localStorage.getItem("myLeads") );
   
})


function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems +=`
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`; 
    }
    ulEL.innerHTML = listItems;
}

