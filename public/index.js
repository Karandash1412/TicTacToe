// begining of the game
$("#start").on("click", handleClick);

function handleClick() {
    $(".start-game").css("display", "none");
    $(".game").removeClass("game");
    circle();
}


const score = {
    xMarkSide: [],
    circleSide: []
}
const winCombination = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
]

let finishGameXmark = false;
let finishGameCircle = false;
let count = 0;

const topLeftSide = $("div.top-light").eq(1);
const topRightSide = $("div.top-light").first();
const mainCard = $("div.main-card");

// circle functionality
function circle() {
    if ($("div.top-light").hasClass("left-side")) {
        $("div.top-light").removeClass("left-side");
        topLeftSide.addClass("right-side");
    }

    $("div.main-card").hover(function () {
        let detectDiv = $(this).attr("data-index");
        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {
            $(this).children('i').eq(1).removeClass("circle")
        }
    }, function () {
        let detectDiv = $(this).attr("data-index");
        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {
            $(this).children('i').eq(1).addClass("circle");
        }
    })

    $("div.main-card").on("click", function () {
        let detectDiv = $(this).attr("data-index");
        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {


            $("#card" + detectDiv).addClass("background-circle");
            $(this).children('i').eq(1).addClass("color");

            score.circleSide.push(detectDiv);

            count++;
            middleStep(count);

            topLeftSide.removeClass("right-side");
            topRightSide.addClass("left-side");
        }
    })
}

// xMark functionality
function xMark() {
    $("div.main-card").hover(function () {
        let detectDiv = $(this).attr("data-index");
        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {
            $(this).children('i').first().removeClass("xmark")
        }
    }, function () {
        let detectDiv = $(this).attr("data-index");
        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {
            $(this).children('i').first().addClass("xmark");
        }
    })
    $("div.main-card").on("click", function () {
        let detectDiv = $(this).attr("data-index");

        if (score.xMarkSide.includes(detectDiv) === false && score.circleSide.includes(detectDiv) === false) {

            $("#card" + detectDiv).addClass("background-xmark");
            $(this).children('i').first().addClass("color");

            score.xMarkSide.push(detectDiv);

            count++;
            middleStep(count);

            topRightSide.removeClass("left-side");
            topLeftSide.addClass("right-side");
        }
    })
}


function middleStep(count) {
    mainCard.unbind("mouseenter mouseleave");
    mainCard.unbind("click");

    winCheck();

    if (finishGameXmark === true) {
        $(".start-game").css("display", "flex");
        $(".start-game").css("background-color", "orange");
        $(".finish").addClass("game");
        $("button").css("color", "black");
        $("h1.large-h").addClass("small-h");
        $(".large-h").removeClass("large-h");
        $(".finish-word").text("PLAYER 2 WINS");
        $("button").text("Restart");
        restart();
    } else if (finishGameCircle === true) {
        $(".start-game").css("display", "flex");
        $(".start-game").css("background-color", "rgb(95, 95, 255)");
        $(".finish").addClass("game");
        $("button").css("color", "black");
        $("h1.large-h").addClass("small-h");
        $(".large-h").removeClass("large-h");
        $(".finish-word").text("PLAYER 1 WINS");
        $("button").text("Restart");
        restart();
    }
    else if (count === 9) {
        $(".start-game").css("display", "flex");
        $(".start-game").css("background-color", "#54D17A");
        $(".finish").addClass("game");
        $("button").css("color", "black");
        $("h1.large-h").addClass("small-h");
        $(".large-h").removeClass("large-h");
        $(".finish-word").text("It's Draw, nobody win");
        $("button").text("Restart");
        restart();
    } else if (count % 2 == 0) {
        circle()
    } else {
        xMark();
    }
}

function winCheck() {
    if (count < 5) {
        return;
    }
    for (let i = 0; i < winCombination.length; i++) {
        let isWinningCombinationXmark = winCombination[i].every(element => score.xMarkSide.includes(element));
        let isWinningCombinationCirle = winCombination[i].every(element => score.circleSide.includes(element));
        if (isWinningCombinationXmark) {
            finishGameXmark = true;
            break;
        } else if (isWinningCombinationCirle) {
            finishGameCircle = true;
            break;
        }
    }
    return;
}

function restart() {
    count = 0;
    for (let i = 0; i <= 9; i++) {
        $("#card" + i).removeClass("background-circle");
        $("#card" + i).children('i').first().removeClass("color");
        $("#card" + i).removeClass("background-xmark");
        $("#card" + i).children('i').eq(1).removeClass("color");
        $("#card" + i).children('i').first().addClass("xmark");
        $("#card" + i).children('i').eq(1).addClass("circle");
    }
    score.circleSide = [];
    score.xMarkSide = [];

    finishGameCircle = false;
    finishGameXmark = false;

    circle();
}