game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                
                // Loads levels from Tiled.
                me.levelDirector.loadLevel("level01");
                // resets player position.
                this.resetPlayer(0, 10);
                // resets Game Time Manager.
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                // resets Hero Death Manager.
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                // resets Experience Manager.
                var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
                me.game.world.addChild(experienceManager, 0);
                // resets Spand Gold Manager.
                var spendGold = me.pool.pull("SpendGold", 0, 0, {});
                me.game.world.addChild(spendGold, 0);
                // resets Pause Manager.
                var pauseManager = me.pool.pull("PauseManager", 0, 0, {});
                me.game.world.addChild(pauseManager, 0);
                            
                //resets selection keys.
                me.input.bindKey(me.input.KEY.B, "buy");                               
                me.input.bindKey(me.input.KEY.S, "skill1");
                me.input.bindKey(me.input.KEY.D, "skill2");
                me.input.bindKey(me.input.KEY.F, "skill3");
                // resets pause key.
                me.input.bindKey(me.input.KEY.V, "pause");
                //resets movement keys.
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.UP, "up");
                me.input.bindKey(me.input.KEY.DOWN, "down");
                me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        
        
        
        
        
        resetPlayer: function(x, y) {
            // on reset, reset player location.
            game.data.player = me.pool.pull("player", x, y, {});
                me.game.world.addChild(game.data.player, 10);            
        }
});
