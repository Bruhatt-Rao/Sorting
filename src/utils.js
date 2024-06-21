var timeout = null;
var stopped = false;

class interval {
    constructor(workFunc, interval) {
        var that = this;
        var expected;
        this.interval = interval;

        this.run = function() {
            expected = Date.now() + this.interval;
            timeout = setTimeout(step, this.interval);
            stopped = false;
            document.getElementById("status").innerText = "Status: Sorting";
        };

        this.stop = function() {
            document.getElementById("status").innerText = "Status: Sorted";
            if (!stopped) {
                console.log("timeout");
                clearTimeout(timeout);
            } else {
                console.log("no timeout");
            }
            stopped = true;
        };

        function step() {
            var drift = Date.now() - expected;
            if (drift > that.interval) {
                console.log("error");
            }
            workFunc();
            expected += that.interval;
            this.stop();
            if (!stopped) {
                timeout = setTimeout(step, Math.max(0, that.interval - drift));
            }

        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function dropdown() {
    document.getElementById("myDropdown").style.display = "block";
    console.log("dropdown clicked");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      document.getElementById("myDropdown").style.display = "none";
  }
}
