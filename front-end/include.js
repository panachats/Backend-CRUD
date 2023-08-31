

// $(function() {
//     $("#header").load("/front-end/startbootstrap-sb-admin-2-gh-pages/header.html")
// })
fetch("/front-end/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data
    })

fetch("/front-end/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data
    })

// fetch("/front-end/accordion.html")
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById('WrapperAccordion').innerHTML = data
//     })
