game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        // initializes creep entity.
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    
    update: function() {
        // update functions and timers.
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();
        // returns true.
        return true;
    },
    
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 1000)) {
            // If 
            game.data.gold += (game.data.exp1 + 1);
        }
    },
    
    creepTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            //If been mmre than alloted time, then spawn enemy creep.
                this.lastCreep = this.now;
                var creepe = me.pool.pull("EnemyCreep", 3360, 0, {});
                me.game.world.addChild(creepe, 10);
                var creepp = me.pool.pull("PlayerCreep", 10, 0, {});
                me.game.world.addChild(creepp, 10);
            // returns true.
            return true;
        }
    }
});




