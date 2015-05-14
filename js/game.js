
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
                // creates database of all variables below.
		score : 0,
                option1: "",
                option2: "",
                enemyBaseHealth: 10,
                playerBaseHealth: 10,
                enemyCreepHealth: 5,
                playerCreepHealth: 5,
                playerHealth: 10,
                enemyCreepAttack: 1,
                playerCreepAttack: 1,
                playerAttack: 1,
                playerAttackTimer: 1000,
                creepAttackTimer: 1000,            
                playerMoveSpeed: 6,
                creepMoveSpeed: 3,
                gameTimerManager: "",
                heroDeathManager: "",
                spearTimer: 15,
                player: "",
                exp: 0,
                gold: 10,
                abiltiy1: 0,
                ability2: 0,
                ability3: 0,
                skill1: 0,
                skill2: 0,
                skill3: 0,
                exp1: 0,
                exp2: 0,
                exp3: 0,
                exp4: 0,
                win: "",
                pausePos: "",
                buyscreen: "",
                buytext: "",
                pausescreen: "",
                pausetext: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        
        // sets game screens to different versions.
        me.state.SPENDEXP = 112;
        me.state.NEW = 113;
        me.state.LOAD = 114;

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
            // loads player entity.
                me.pool.register("player", game.PlayerEntity, true);
            // loads base entities.
                me.pool.register("PlayerBase", game.PlayerBaseEntity);
                me.pool.register("EnemyBase", game.EnemyBaseEntity);  
            // loads creep entities.
                me.pool.register("EnemyCreep", game.EnemyCreep, true);
                me.pool.register("PlayerCreep", game.PlayerCreep, true); 
            // loads game managers.
                me.pool.register("GameTimerManager", game.GameTimerManager);
                me.pool.register("HeroDeathManager", game.HeroDeathManager);
                me.pool.register("ExperienceManager", game.ExperienceManager);
                me.pool.register("SpendGold", game.SpendGold);
                me.pool.register("PauseManager", game.PauseManager);
            // loads throwable entities.
                me.pool.register("spear", game.SpearThrow, true);
            // creats\loads different game screens.
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.SPENDEXP, new game.SpendExp());
                me.state.set(me.state.NEW, new game.NewProfile());
                me.state.set(me.state.LOAD, new game.LoadProfile());
                me.state.set(me.state.CONTROLS, new game.ControlsScreen());



		// Start the game.
		me.state.change(me.state.MENU);
	}
};
