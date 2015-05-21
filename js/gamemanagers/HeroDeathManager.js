game.HeroDeathManager = Object.extend({
    
    init: function(x, y, settings) {
        // initializes updates.
        this.alwayeUpdate = true;
    },
    
    update: function() {
        if (game.data.player.dead) {
            // If hero is dead, remove player and miniplayer and reset.
            me.game.world.removeChild(game.data.player);
            me.game.world.removeChild(game.data.miniPlayer);            
            me.state.current().resetPlayer(0, 620);
        }
    }
});



