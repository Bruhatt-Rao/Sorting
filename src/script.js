var area, unsorted = [], temp, count = 0, inter, sizeslider, size = 4, i2 = 0;

sort = bubble_sort;

var highend = 300 / size;

function bar(n, color) {
    this.n = n;
    this.color = color;
}

for (var i = 1; i <= highend; i++) {
    unsorted.push(new bar(i, "#f66c91"));
}

function step() {
    return (
        (
            (500 * (size / 10000)) + 0.05
        ) * 100
    )
}

function reset() {
    size = sizeslider.value;
    highend = 300 / size;
    unsorted = [];
    for (var i = 1; i <= highend; i++) {
        unsorted.push(new bar(i, "#f66c91"));
    }
    shuffle(unsorted);
    console.log(500 / (size / 1000));
    inter.stop();
    count = 0;
    i2 = 0;
    inter = new interval(function() {
        sort(unsorted);
    }, step())
    inter.run()
}

shuffle(unsorted);

function startGame() {
    area.start();
    sizeslider = document.getElementById("Size");
    size = sizeslider.value;
    sizeslider.oninput = reset;
    inter = new interval(function() {
        sort(unsorted);
    }, step())
    inter.run()
    //sort(unsorted);
}

var area = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.getElementById("display").appendChild(this.canvas);
    }
}

function draw(arr) {
    ctx = area.context;
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = "#f66c91";    
    //ctx.fillStyle = "#121212";
    ctx.lineWidth = -0.4;
    ctx.strokeStyle="#222e46";
    //ctx.strokeStyle = "#121212";
    for (i = 0; i < arr.length; i++) {
        ctx.fillStyle = arr[i].color;
        ctx.fillRect(49 + i * size, 400 - arr[i].n * size, size, arr[i].n * size);
        ctx.strokeRect(49 + i * size, 400 - arr[i].n * size, size, arr[i].n * size);
    }
}

function other(arr) {
    var count = 0;
    for (i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            count++;
            temp = arr[i];
            arr.splice(i, 1, arr[i + 1]);
            arr.splice(i + 1, 1, temp);
        }
    }
    if (count == 0) {
        console.log("ended");
        inter.stop();
    }
    draw(arr);
}

function bubble_sort(arr) {
    let n = arr.length;
    var i = i2;

    arr[i].color = "#f66c91";
    arr[i + 1].color = "#f66c91";
    if (arr[i].n < arr[i + 1].n) {
        // Swap the elements
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        arr[i + 1].color = "white";
        count++;
    }
    n--;
    draw(arr);
    if (i2 == arr.length-2) {
        i2 = 0;
        count = 0;
    } else {
        //i2 = 0;
        i2++;
    }
    if (i2 == arr.length-3 && count == 0) {
        console.log("ended");
        inter.stop();
    }
}

function insertion_sort(arr) {
    var count = 0;
    i2++;
    var key = arr[i2];
    var j = i2 - 1;
    while (j >= 0 && arr[j].n < key.n) {
        clear_color(arr);
        arr[j + 1] = arr[j];
        arr[j].color = "white";
        j = j - 1;
    }
    if (i2 < arr.length) {
        count++;
    }
    arr[j + 1] = key;
    if (count == 0) {
        console.log("ended");
        inter.stop();
        clear_color(arr);
    }
    draw(arr);
}

function selectionSort(arr) {
    scanIndex = i2;
    count = 0;
    let lowest = i2;
    console.log(arr[lowest].n)
    for (let j = arr.length-1; j > i2; j--) {
        console.log(j)
        if (arr[lowest].n < arr[j].n) {
            lowest = j;
        }
    }
    if (i2 !== lowest) {
        // swap the elements
        [arr[i2],arr[lowest]] = [arr[lowest], arr[i2]];
    }
    i2++;
    if (i2 >= arr.length) {
        console.log("ended");
        inter.stop();
    }
    draw(arr);
}

funcs = [bubble_sort, insertion_sort, selectionSort];

function switch_sort(i) {
    sort = funcs[i];
    reset();
}

function clear_color(arr) {
    for (i = 0; i < arr.length; i++) {
        arr[i].color = "#f66c91";
    }
}
