var socket = io('http://localhost:3000');
socket.on('graphUpdate', function (data) {
    populateTable(data);
    populateGraph(data);
});

function populateTable(data) {
    $('#data > tbody').empty();

    for (let i = 0; i < data.length; i++) {
        $('#data > tbody').append(`<tr><td>${data[i].x}</td><td>${data[i].y}</td></tr>`);
    }
}

/******* CHART *******/
function populateGraph(data) {
    let dataset = genDataset(data);

    var ctx = document.getElementById('myChart').getContext('2d');
    var scatterChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Dataset',
                data: dataset,
                backgroundColor: genRandomColor(dataset)
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
}

function genDataset(data) {
    let dataset = [];
    data.forEach(element => {
        dataset.push({
            x: element.x,
            y: element.y,
            r: 10,
        });
    });

    return dataset;
}

function genRandomColor(dataset) {
    let colors = [];
    for (let i = 0; i < dataset.length; i++) {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);

        colors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
    }

    return colors;
}