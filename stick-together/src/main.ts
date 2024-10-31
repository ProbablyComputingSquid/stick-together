import kaplay from "kaplay";
import "kaplay/global";

// Extend our game with multiple scenes

// Start game
kaplay();

// Load assets
loadSprite("bean", "/sprites/bean.png");
loadSprite("coin", "/sprites/coin.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("ghosty", "/sprites/ghosty.png");
loadSprite("portal", "/sprites/portal.png");
loadSound("score", "/examples/sounds/score.mp3");
loadSound("portal", "/examples/sounds/portal.mp3");

setGravity(1600);

const SPEED = 380;

// Design 2 levels
const LEVELS = [
    [
        "O@                           >  =",
        "=================================",
    ],
    [
		"==============",
        "=            =",
		"=            =",
		"=            =",
        "=O@  ^ $$   >=",
        "==============",
    ],
    [
        "O@   $   >",
        "===  ==  =",
    ],
	[
        "                    $$$$     ==",
		"               $$          > ==",
		"       =   =   ==  =  =   =====",
		"       =                    ===",
		"   =   =                  $$$==",
		"O@                     ^^^$$$==",
		"===============================",
	],
];

let totalCoins = 0;
for (const level of LEVELS) {
    for (const row of level) {
        totalCoins += (row.match(/\$/g) || []).length;
    }
}
    

// Define a scene called "game". The callback will be run when we go() to the scene
// Scenes can accept argument from go()
scene("game", ({ levelId, score }) => {
    // Use the level passed, or first level
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
                {
                    locked: false,
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
                "player2",
                {
                    locked: false,
                },
            ],
            "=": () => [
                sprite("grass"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
                offscreen({ hide: true, distance: 64 }),
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
                area(),
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
        },
    });

    // Get the player object from tag
    const player = level.get("player")[0];
    const player2 = level.get("player2")[0];
    debug.log("level: " + levelId)
    // Movements
    onKeyPress("up", () => {
        if (player.isGrounded() && !player.locked) {
            player.jump();
        } 
        if (player.locked) {
            player.locked = false;
        }
    });
    onKeyDown("left", () => {
        if (!player.locked) {
            player.move(-SPEED, 0);
            player.flipX = true;
        }
    });
    onKeyDown("right", () => {
        if (!player.locked) {
            player.move(SPEED, 0);
            player.flipX = false;
        }
    });
    onKeyPress("w", () => {
        if (player2.isGrounded() && !player2.locked) {
            player2.jump();
        }
        if (player2.locked) {
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
    player.onUpdate(() => {
        if (player.locked) {
            camPos(player2.pos);
        } else {
            camPos(player.pos)
        }
    })
    player2.onExitScreen(() => {
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
        ])
        warnText.loop(2, async () => {
            await tween(0, 1, 1, (val) => warnText.opacity = val, easings.easeInOutCubic)
        })
        wait(5, () => {
            if (player2) {
                shake(120);

            }
        })
    })
    player2.onEnterScreen(() => {
        debug.log("Player 2 entered the screen");
        destroyAll("warning");
    })
    player.onCollide("danger", () => {
        go("game", {
			levelId: levelId,
			score: score,
		})
    })
    player2.onCollide("danger", () => {
        go("game", {
            levelId: levelId,
            score: score,
        })
    })

    player.onCollide("coin", (coin) => {
        destroy(coin);
        play("score");
        coinsCollected++;
        scoreLabel.text = score + coinsCollected;
    })
    player2.onCollide("coin", (coin) => {
        destroy(coin);
        play("score");
        coinsCollected++;
        scoreLabel.text = score + coinsCollected;
    })

    // Fall death
    player.onUpdate(() => {
        if (player.pos.y >= 680) {
            go("game", {
				levelId: levelId,
				score: score,
			})
        }
        if (player.locked) {
            player.opacity = 0;
        } else {
            player.opacity = 1;
        }
    })
    player2.onUpdate(() => {
        if (player2.pos.y >= 680) {
            go("game", {
                levelId: levelId,
                score: score,
            })
        }
        if (player2.locked) {
            player2.opacity = 0;
        } else {
            player2.opacity = 1;
        }
    })
    
    // Enter the next level on portal
    player.onCollide("portal", () => {
        play("portal");
        player.portal = true;
        player.locked = true;
        if (player2.portal) {
            if (levelId < LEVELS.length - 1) {
                go("game", {
                    levelId: levelId + 1,
                    score: score + coinsCollected,
                });
            }
            else {
                go("win", { score: score + coinsCollected });
            }
        }
    });
    player2.onCollide("portal", () => {
        play("portal");
        player2.portal = true;
        player2.locked = true;
        if (player.portal) {
            if (levelId < LEVELS.length - 1) {
                go("game", {
                    levelId: levelId + 1,
                    score: score + coinsCollected,
                });
            }
            else {
                go("win", { score: score + coinsCollected });
            }
        }
    });
    // Score counter text
    const scoreLabel = add([
        text(score),
        pos(12),
        fixed(),
    ]);
});

scene("win", ({ score }) => {
    add([
        text(`You grabbed ${score} coins!!!`, {
            width: width(),
        }),
        pos(12),
    ]);

    onKeyPress(start);
});

function start() {
    // Start with the "game" scene, with initial parameters
    go("game", {
        levelId: 0,
        score: 0,
    });
}

start();