let items;
fetch(`data.json`)
    .then(response => response.json())
    .then(data => {
        items = data;
        setup();
    })
    .catch(error => console.error('Error fetching JSON:', error));

function setup() {

}