var audio = new Audio('./assets/sounds/heartbeat.mp3'),
    tick = new Audio('./assets/sounds/clocktick.mp3');

var events = [
        new Date("May 4, 2021 10:00:00").getTime(),
        new Date("July 6, 2021 14:00:00").getTime()
    ],
    countDownDate = events[0];

if (countDownDate - (new Date().getTime()) <= 0) {
    countDownDate = events[1];
    document.getElementById("text").innerHTML = "UNTIL THE MATHS BAGRUT EXAM";
}

var animate = true,
    playTick = false;

var tF = function() {
        playTick = !playTick;

        animate = !animate;

        var days, hours, minutes, seconds, distance,
            calc = function() {

                distance = countDownDate - (new Date().getTime());

                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                days = (days.toString().length == 1) ? "0" + days : days;

                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                hours = (hours.toString().length == 1) ? "0" + hours : hours;

                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                minutes = (minutes.toString().length == 1) ? "0" + minutes : minutes;

                seconds = Math.floor((distance % (1000 * 60)) / 1000);
                seconds = (seconds.toString().length == 1) ? "0" + seconds : seconds;

            };

        calc();

        var con = true;

        if (distance <= 0) {
            if (events[1] - (new Date().getTime()) > 0) {
                countDownDate = events[1];
                document.getElementById("text").innerHTML = "UNTIL THE MATHS BAGRUT EXAM";
                calc();
            } else {
                clearInterval(x);
                document.getElementById("text").outerHTML = "";
                document.getElementById("demo").innerHTML = "GOOD LUCK!";
                con = false;
            }
        }

        if (con)
            document.getElementById("demo").innerHTML = `${days}:${hours}:${minutes}:${seconds}`;

        if (playTick) {
            tick.pause();
            tick.currentTime = 0;
            tick.play();
        }
    },
    x, y, clicked = function() {
        document.getElementById("start").outerHTML = '';
        document.getElementById("con").style.opacity = null;
        document.getElementById("con").style.position = null;
        document.getElementById("con").style.pointerEvents = null;
        x = setInterval(tF, 1000);
        y = setInterval(function() {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            setTimeout(function() {
                document.getElementById("firstBeat").classList.add("animate");
            }, 10);
            setTimeout(function() {
                document.getElementById("firstBeat").classList.remove("animate");
                document.getElementById("secondBeat").classList.add("animate");
                setTimeout(function() {
                    document.getElementById("secondBeat").classList.remove("animate");
                }, 800);
            }, 400);
        }, 1500);
        tF();

    };

document.getElementById("start").addEventListener("mouseup", clicked);
//document.getElementById("start").addEventListener("touchstart", clicked);

document.onreadystatechange = function() {
    if (document.readyState === "complete")
        setTimeout(function() {
            document.body.style.opacity = null;
        }, 100);
};