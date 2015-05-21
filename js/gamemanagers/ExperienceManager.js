game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        // initializes functions.
        this.alwaysUpdtae = true;
        this.gameover = false;
    },
    
    update: function() {
        if (game.data.win === true && !this.gameover) {
            // If win is true, then alert player.
            this.gameOver(true);
            alert("YOU HAVE WON");
        } else if (game.data.win === false && !this.gameover) {
            // If win is false, then alert player.
            this.gameOver(false);
            alert("YOU HAVE LOST");

        }
        // returns false.
        return false;
    },
    
    gameOver: function(win) {
        if (win) {
            // If wins, then gain +10 exp.
            game.data.exp += 10;
        } else {
            // If not wins, then gain +1 exp.
            game.data.exp += 1;
        }
        // game is over, and save exp functions.
        this.gameover = true;
        me.save.exp = game.data.exp;

        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                // save exp functions.
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4

            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        // change screen to MENU.
                        me.state.change(me.state.MENU);
                    } else {
                        // else, alert player.
                        alert(response);
                    }
                })
                // If fails, then alert player.
                .fail(function(response) {
                    alert("FAIL");
                });

    }
});



