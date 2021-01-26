// fetch('http://puzzle.mead.io/puzzle').then((data) => {
//     data.json().then(data => {
//         console.log(data);
//     })
// })

// fetch('http://192.168.1.15:3000/weather?address=zzz').then((data) => {
//     data.json().then(data => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const showData = document.querySelector('.show-data');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;

    fetch(`http://192.168.1.15:3000/weather?address=${address}`).then((data) => {
        data.json().then(data => {
            console.log(data);
            const sendData = JSON.stringify(data);
            showData.innerHTML = `Location : ${data.location} <br>
                                    Forecast : ${data.forecast} <br>
                                    Temperature : ${data.Temperature} <br>
                                    Day : ${data.isDayTime}
                                    `
        })
    })

    weatherForm.reset();
})
