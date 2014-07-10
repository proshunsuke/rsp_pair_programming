$(function(){

    var winCount = 0;
    var loseCount = 0;
    var drawCount = 0;

    var startflag = false;

    "use strict";
    var HAND_TYPE = {
        ROCK : 0,
        SCISSORS : 1,
        PAPER : 2,
    };
    var RSP_RESULT_CODE = {
        DRAW : 0,
        WIN : 1,
        LOSE : 2,
    };

    $("#start").click(function(){
        $("#te").show();
        $("#janken").show();
        startflag = true;
    });

    $(".rsp-btn").click(function(){
        if(startflag){
            var bobhand = bobHand();
            var result = judge(
                myHand($(this).attr("id")),
                bobhand
            );

            showResult(result,myHand($(this).attr("id")),bobhand);
        }
    });
    function myHand(handType) {
        var hand;
        if (handType == "rock") {
            $("#myrspimg").attr("src", "img/rock.png");
            hand = HAND_TYPE.ROCK;
        } else if (handType == "scissors") {
            $("#myrspimg").attr("src", "img/scissors.png");
            hand = HAND_TYPE.SCISSORS;
        } else {
            $("#myrspimg").attr("src", "img/paper.png");
            hand = HAND_TYPE.PAPER;
        }
        return hand;
    }
    function bobHand() {
        var hand = Math.floor(Math.random() * 3);
        if (hand === HAND_TYPE.ROCK) {
            $("#bobrspimg").attr("src", "img/rock.png");
        } else if (hand === HAND_TYPE.SCISSORS) {
            $("#bobrspimg").attr("src", "img/scissors.png");
        } else {
            $("#bobrspimg").attr("src", "img/paper.png");
        }
        return hand;
    }
    function judge(myHand, otherHand) {
        var result;
        console.log("myhand: " + myHand + ",otherHand: " + otherHand);
        if (myHand === otherHand) { // draw
            result = RSP_RESULT_CODE.DRAW;
            drawCount++;
        } else if ((myHand === HAND_TYPE.ROCK && otherHand === HAND_TYPE.SCISSORS) || (myHand === HAND_TYPE.SCISSORS && otherHand === HAND_TYPE.PAPER) || (myHand === HAND_TYPE.PAPER && otherHand === HAND_TYPE.ROCK)) {
            result = RSP_RESULT_CODE.WIN;
            winCount++;
        }else {
            result = RSP_RESULT_CODE.LOSE;
            loseCount++;
        }
        return result;
    }
    function showResult(result,myhand,bobhand) {
        var myhandshow = "";
        var bobhandshow = "";
        if(myhand == 0){ // ぐー
            myhandshow = "グー";
        }else if(myhand == 1){ // ちょき
            myhandshow = "チョキ";
        }else{ // パー
            myhandshow = "パー";
        }
        if(bobhand == 0){ // ぐー
            bobhandshow = "グー";
        }else if(bobhand == 1){ // ちょき
            bobhandshow = "チョキ";
        }else{ // パー
            bobhandshow = "パー";
        }

        if (result === RSP_RESULT_CODE.DRAW) {
            $("#result").text("draw.");
            $("#rireki").text("自分の手: " + myhandshow + ",相手の手: " + bobhandshow + "勝敗: 引き分け");
        } else if (result === RSP_RESULT_CODE.WIN) {
            $("#result").text("You win!");
            $("#rireki").text("自分の手: " + myhandshow + ",相手の手: " + bobhandshow + "勝敗: 勝ち");
        } else {
            $("#result").text("You lose!");
            $("#rireki").text("自分の手: " + myhandshow + ",相手の手: " + bobhandshow + "勝敗: 負け");
        }
        $("#summary").text(winCount + "勝" + loseCount + "負" + drawCount + "分け");
    }
});
