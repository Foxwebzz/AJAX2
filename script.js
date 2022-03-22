let navLinks = document.querySelectorAll('.nav-link')
let mainDisplay = document.querySelector('#main-display')
let mainH = document.querySelector('#main-h')

navLinks.forEach(link => {
    link.addEventListener('click', getData)
})

function getData(e) {
    e.preventDefault()
    loading()
    mainH.innerHTML = this.innerHTML
    let link = this.getAttribute('href')

    let xml = new XMLHttpRequest()
    xml.open("GET", link)
    xml.onreadystatechange = function() {
        if (xml.readyState === 4 && xml.status === 200) {
            displaySet(JSON.parse(xml.responseText))
        }
    }
    xml.send()
}

function loading() {
    mainDisplay.innerHTML = `<img src="images/spinner.gif" alt="" />`
}

function displaySet(set) {
    let first = set[0]
    let text = ``
    text += `<table class="table">`
    text += `<thead>`
    text += `<tr>`
        for (const key in first) {
            text += `<th>${key}</th>`
        }
    text += `</tr>`
    text += `</head>`

    text += `<tbody>`
    set.forEach(obj => {
        text+= `<tr>`
            for (const key in obj) {
                text+= `<td>${obj[key]}</td>`
            }
        text+= `</tr>`
    })
    text += `</tbody>`
    text += `</table>`

    mainDisplay.innerHTML = text
}
