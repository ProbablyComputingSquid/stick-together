import kaplay from "kaplay";
import "kaplay/global";

// Extend our game with multiple scenes

// Start game
kaplay();

// Load assets
loadSprite("bean", " /sprites/bean.png");
loadSprite("coin", "/sprites/coin.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("sand", "/sprites/sand.png")
loadSprite("ghosty", "/sprites/ghosty.png");
loadSprite("portal", "/sprites/portal.png");
loadSprite("button", "/sprite/button.png")
loadSound("coins", "/audio/coin.mp3");
loadSound("portal", "/audio/portal.mp3");
loadSound("alarm", "/audio/alarm.mp3");


setGravity(1600);

const SPEED = 380;

// Levels
const LEVELS = [
    // tutorial
    [
        "=                 $                 =",
        "=@      a         $             >   =",
        "=O  $ A a$    ^^  $  ^^  $$$   ^=^^^=",
        "=====================================",
    ],
    // the box
    [
		"=======================",
        "=                     =",
        "=                     =",
		"=       =====         =",
		"=@                    =",
        "=O   ^^ $$$$$ ^^     >=",
        "=======================",
    ],
    // jump for it
    [
        "                                             $$$     $         ",
        "                                            =====              ",
        "                                                               ",
        "                        ^   ^        =   =                  >  ",
        "O@    $   $     ^       =$$$=                $$$    ^^^     =  ",
        "===  ===  =   =====   =========    =   =    ===================",
    ],
    // the broken bridge
	[
        "                      $$$$       ==",
		"                 $$            > ==",
		"       =    ==   ==   =  =    =====",
		"       =                        ===",
		"   =   =                     $$$===",
		"O@        ^   ^^^     ^^  ^^ $$$===",
		"==================================",
	],
    // aMAZEng
    [
        //"===============================================================",
        "                               $$=                            =",
        " $    ==================     ^ $$=     ===================--===",
        "==                  $$$=   =======    ==      $     =$$$$$  $$=",
        " $    ======================     ====  =    ======  ======--===",
        "==                         =  $$$                =           >=",
        "      ===============-     =  ================== ==============",
        " O@            ^^^$$$-           $$       $$$^=      $ $ $ $ $=",
        "===============================================================",
    ]
];

let totalCoins = 0;
for (const level of LEVELS) {
    for (const row of level) {
        totalCoins += (row.match(/\$/g) || []).length;
    }
}

    
function restart(levelId: number, coins: number) {
    go("game", {
        levelId: levelId,
        coins: coins,
    });
}


scene("game", ({ levelId, coins }) => {
	let coinsCollected = 0;
    const level = addLevel(LEVELS[levelId || 0], {
        tileWidth: 64,
        tileHeight: 64,
        //pos: vec2(100, 200),
        tiles: {
            "@": () => [
                sprite("bean"),
                area(),
                body({jumpForce:700}),
                anchor("center"),
				pos(),
                opacity(1),
                offscreen({hide: false, destroy: false}),
                "player",
                "player1",
                {
                    locked: false,
                    dead: false,
                },
            ],
            "O": () => [
                sprite("bean"),
                area(),
                body({jumpForce:700}),
                anchor("center"),
				pos(),
                opacity(1),
                offscreen({hide: false, destroy: false}),
                "player",
                "player2",
                {
                    locked: false,
                    dead: false,
                },
            ],
            "=": () => [
                sprite("grass"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                offscreen({ hide: true, distance: 64 }),
            ],
            // secret pass-through grass
            "-": () => [
                sprite("grass"),
                area(),
                anchor("bot"),
                offscreen({hide: true, distance: 64}),
            ],
            "$": () => [
                sprite("coin"),
                area(),
                anchor("bot"),
                "coin",
                offscreen({ hide: true, distance: 64 }),
            ],
            "^": () => [
                sprite("spike"),
                area({
                    scale: 0.75,
                }),
                anchor("bot"),
                "danger",
                offscreen({ hide: true, distance: 64 }),
            ],
            ">": () => [
                sprite("portal"),
                area(),
                anchor("bot"),
                "portal",
                offscreen({ hide: true, distance: 64 }),
            ],
            "A": () => [
                sprite("button"),
                area(),
                anchor("bot"),
                pos(),
                "button",
                "buttonA",
                "A",
            ],
            "a": () => [
                sprite("sand"),
                area(),
                anchor("bot"),
                pos(),
                "door",
                "doorA",
                "A",
            ]
        },
    });

    // Get the player object from tag
    const player1 = level.get("player")[0];
    const player2 = level.get("player2")[0];
    debug.log("level: " + levelId)
    // Movements
    onKeyPress("up", () => {
        if (player1.isGrounded() && !player1.locked ) {
            player1.jump();
        } 
        if (player1.locked && !player1.dead && !player2.dead) {
            player1.locked = false;
        }
    });
    onKeyDown("left", () => {
        if (!player1.locked) {
            player1.move(-SPEED, 0);
            player1.flipX = true;
        }
    });
    onKeyDown("right", () => {
        if (!player1.locked) {
            player1.move(SPEED, 0);
            player1.flipX = false;
        }
    });
    onKeyPress("w", () => {
        if (player2.isGrounded() && !player2.locked) {
            player2.jump();
        }
        if (player2.locked && !player1.dead && !player2.dead) {
            player2.locked = false;
        }
    });
    onKeyDown("a", () => {
        if (!player2.locked) {
            player2.move(-SPEED, 0);
            player2.flipX = true;
        }
    });
    onKeyDown("d", () => {
        if (!player2.locked) {
            player2.move(SPEED, 0);
            player2.flipX = false;
        }
    });
    player1.onUpdate(() => {
        if (player1.locked) {
            camPos(player2.pos);
        } else {
            camPos(player1.pos)
        }
    })
    let player2InViewport = true;
    
    player2.onExitScreen(() => {
        player2InViewport = false;
        debug.log("Player 2 left the screen");
        const warnText = add([
            text("Stick together!"),
            pos(center().x, center().y - 50),
            anchor("center"),
            color(RED),
            outline(4, BLACK),
            "warning",
            fixed(),
            opacity(0),
            timer(),
            scale(3),
        ])
        const warnLoop = warnText.loop(2, async () => {
            play("alarm");
            await tween(0, 1, 1, (val) => warnText.opacity = val, easings.easeInOutCubic)
            if (player2InViewport) {warnLoop.cancel()}
        })
        wait(5, () => {
            if (!player2InViewport) {
                shake(72);
                debug.log("You couldn't stick together!");
                player1.dead = true; player1.locked = true;
                player2.dead = true; player2.locked = true;
                wait(2, () => {
                    go("lose");
                })
                
            }
            warnLoop.cancel();
        })
    })
    player2.onEnterScreen(() => {
        player2InViewport = true;
        debug.log("Player 2 entered the screen");
        destroyAll("warning");
    })
    player1.onCollide("danger", () => {
        restart(levelId, coins);
    })
    player2.onCollide("danger", () => {
        restart(levelId, coins)
    })
    onCollide("player", "buttonA", (player, button) => {
        destroyAll("A");
    })

    onCollide("player", "coin", (player, coin) => {
        destroy(coin);
        play("coins");
        coinsCollected++;
        coinsLabel.text = coins + coinsCollected;
    })

    // Fall death
    player1.onUpdate(() => {
        if (player1.pos.y >= 600 || player2.pos.y >= 680) {
            restart(levelId, coins)
        }
        if (player1.locked) {
            player1.opacity = 0;
        } else {
            player1.opacity = 1;
        }
        if (player2.locked) {
            player2.opacity = 0;
        } else {
            player2.opacity = 1;
        }
    })
    
    // Enter the next level on portal

    onCollide("player", "portal", (player, portal) => {
        play("portal");
        player.portal = true;
        player.locked = true;
        if (player1.portal && player2.portal) {
            if (levelId < LEVELS.length - 1) {
                go("game", {
                    levelId: levelId + 1,
                    coins: coins + coinsCollected,
                });
            }
            else {
                go("win", { coins: coins + coinsCollected });
            }
        }
    });
    // coins counter text
    const coinsLabel = add([
        text(coins),
        outline(4, BLACK),
        pos(12),
        fixed(),
    ]);
});
scene("lose", () => {
    add([
        text("You lost!"),
        scale(3),
        outline(12, BLACK),
        anchor("center"),
        pos(center()),
    ]);
    onKeyPress(start);
})
scene("win", ({ coins }) => {
    add([
        text(`You won!\nYou grabbed ${coins} out of ${totalCoins}coins!!!`, {
            width: width(),
        }),
        scale(3),
        color(WHITE),
        outline(12, BLACK),
        pos(width()/2, height()/2 - height()/4),
        anchor("center",)
    ]);
    onKeyPress(start);
});

function start() {
    go("game", {
        levelId: 0,
        coins: 0,
    });
}

start();