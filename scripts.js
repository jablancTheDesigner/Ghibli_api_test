var theRequest = new XMLHttpRequest();
var mainUrl = 'https://ghibliapi.herokuapp.com/';
var root = document.getElementById('root');
var container = document.createElement('div');
var movies = [];
container.classList.add('container');

window.onload = function () {
    theRequest.open('GET', mainUrl + 'films', true)
    theRequest.onload = function () {
        var data = JSON.parse(this.response);
        if (theRequest.status >= 200 && theRequest.status < 400) {
            data.forEach(film => {
                movies.push(film)
            });
            console.log(movies)
            buildBoxes(data)
        } else {
            console.log('error');
        }
    }
    theRequest.send()
};

function buildBoxes(arr) {
    var str = '';
    var container = document.createElement('div');
    var row = document.createElement('div');
    root.innerHTML = '';
    container.className = 'container my-5 fade';
    row.className = 'row mx-0';
    arr.forEach(obj => {

        console.log(obj);
        // create stuff
        var filmCol = document.createElement('div');
        var filmInner = document.createElement('div');

        // give classes
        filmCol.id = 'film_' + obj.id
        filmCol.className = 'col-lg-3 col-md-4 col-sm-6 col-12 text-center d-flex p-0';
        filmInner.className = 'border w-100 m-2 shadow rounded card d-flex';

        // fill stuff
        filmInner.innerHTML = getBoxInner(obj)

        // append stuff
        filmCol.appendChild(filmInner)
        row.appendChild(filmCol)

    })
    container.appendChild(row)
    root.appendChild(container);
    container.classList.add('show')
}

function getBoxInner(arr) {
    var str = `
        <div class="cardImg p-3 bg-light shadow-sm" style="min-height">1</div>
        <div class="cardHeader p-3 d-flex align-items-center" style="flex: 1 auto;">
            <h5 class="font-weight-bold w-100 m-0">
            <small class="text-muted d-block mb-1 "> `+ arr.release_date + `</small>
            `+ arr.title + `
            <small class="text-muted d-block mt-1 ">by: `+ arr.director + `</small></h5>
        </div>
        <div class="cardBody mt-auto border-top">
        <div class="p-3 ">
            <p class="w-100 crop-text-2 small m-0">`+ arr.description + `</p>
            </div>
        </div>
    `;
    return str;
}



