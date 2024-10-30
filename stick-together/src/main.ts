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

const SPEED = 320;

// Design 2 levels
const LEVELS = [
    [
		"=============",
		"=           =",
		"=           =",
        "=@  ^ $$   >=",
        "=============",
    ],
    [
        "@   $   >",
        "==  ==  =",
    ],
	[
		"               $$     > ==",
		"       =   =   ==    =====",
		"       =               ===",
		"   =   =             $$===",
		"@                  ^ $$===",
		"=========================="
	],
];

// Define a scene called "game". The callback will be run when we go() to the scene
// Scenes can accept argument from go()
scene("game", ({ levelIdx, score }) => {
    // Use the level passed, or first level
	let coinsCollected = 0;
    const level = addLevel(LEVELS[levelIdx || 0], {
        tileWidth: 64,
        tileHeight: 64,
        pos: vec2(100, 200),
        tiles: {
            "@": () => [
                sprite("bean"),
                area(),
                body(),
                anchor("bot"),
                "player",
            ],
            "=": () => [
                sprite("grass"),
                area(),
                body({ isStatic: true }),
                anchor("bot"),
            ],
            "$": () => [
                sprite("coin"),
                area(),
                anchor("bot"),
                "coin",
            ],
            "^": () => [
                sprite("spike"),
                area(),
                anchor("bot"),
                "danger",
            ],
            ">": () => [
                sprite("portal"),
                area(),
                anchor("bot"),
                "portal",
            ],
        },
    });

    // Get the player object from tag
    const player = level.get("player")[0];

    // Movements
    onKeyPress("up", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onKeyDown("left", () => {
        player.move(-SPEED, 0);
    });

    onKeyDown("right", () => {
        player.move(SPEED, 0);
    });

    player.onCollide("danger", () => {
        go("game", {
			lexelIdx: levelIdx,
			score: score,
		});
    });

    player.onCollide("coin", (coin) => {
        destroy(coin);
        play("score");
        coinsCollected++;
        scoreLabel.text = score + coinsCollected;
    });

    // Fall death
    player.onUpdate(() => {
        if (player.pos.y >= 480) {
            go("game", {
				lexelIdx: levelIdx,
				score: score,
			});
        }
    });

    // Enter the next level on portal
    player.onCollide("portal", () => {
        play("portal");
        if (levelIdx < LEVELS.length - 1) {
            // If there's a next level, go() to the same scene but load the next level
            go("game", {
                levelIdx: levelIdx + 1,
                score: score + coinsCollected,
            });
        }
        else {
            // Otherwise we have reached the end of game, go to "win" scene!
            go("win", { score: score + coinsCollected });
        }
    });

    // Score counter text
    const scoreLabel = add([
        text(score),
        pos(12),
    ]);
});

scene("lose", () => {
    add([
        text("You Lose"),
        pos(12),
    ]);

    // Press any key to go back
    onKeyPress(start);
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
        levelIdx: 0,
        score: 0,
    });
}

start();