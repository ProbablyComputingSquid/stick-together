import kaplay, { AreaComp } from "kaplay";
import "kaplay/global";


// Start game
kaplay();


// Load assets
// after further discovery, you have to update the url below every time new assets get added
// i will try to find a way to automate this
// so after some deliberation, I realized that changing this string to the sha-1 hash of the files would actually change the files, thus changing the hash, so it would create an infinite loop...

const hash = "dd35cae654f235f5a0441b10cc5a62eb45cefac4";

loadSprite("title-icon","https://raw.githubusercontent.com/ProbablyComputingSquid/stick-together/7a1d9ebac8a7087721f12b9f17e17793c2ad46c8/stick-together-logo-final.png" )
loadRoot("https://raw.githubusercontent.com/ProbablyComputingSquid/stick-together/" + hash + "/stick-together/public/")
loadSprite("bean", "/sprites/bean.png");
loadSprite("bean2", "/sprites/bean2-alt.png");
loadSprite("coin", "/sprites/coin.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("sand", "/sprites/sand.png")
loadSprite("snow", "/sprites/snow.png");
loadSprite("steel", "/sprites/steel.png");
loadSprite("crate", "/sprites/crate.png");
loadSprite("ghosty", "/sprites/ghosty.png");
loadSprite("portal", "/sprites/portal.png");
loadSprite("button", "/sprites/button.png");
loadSprite("buttonB", "/sprites/buttonB.png");
loadSprite("buttonC", "/sprites/buttonC.png");
loadSprite("buttonD", "/sprites/buttonD.png");
loadSprite("jumpy", "/sprites/jumpy.png");
loadSprite("cloud", "/sprites/cloud.png");
loadSound("coins", "/audio/coin.mp3");
loadSound("portal", "/audio/portal.mp3");
loadSound("alarm", "/audio/alarm.mp3");
loadSound("vine-boom", "/audio/vine-boom.mp3");
loadSound("stick-together", "/audio/music/stick_together.mp3");
loadSound("stick-together-2", "/audio/music/stick_together_2.mp3");
loadMusic("stick-together-3", "/audio/music/stick_together_guys.mp3");
loadMusic("stick-together-4", "audio/music/always_stick_together.mp3")

setGravity(1600);

// player speed
const SPEED = 380;
const JUMPFORCE = 700;

/*
Level 1: tested, easy, works
Level 2, tested, repeated spike jumps are annoying, but it works
Level 3, tested, the spike fall is mean, but it works
Level 4, tested, needs more gimmicks 
Level 5, tested, works, teaches some important mechanics. It needs another gimmick though
Level 6, tested, but it might be confusing how to get up to the top. add a sign of some sort?
Level 7, semitested, works, the jumps are tight, and the final part needs more gimmicks
Level 8, untested, the maze is a bit confusing
Level 9, untested, the stairs are also a bit confusing
Level 10, untested, final level, needs to be epic
*/ 
const LEVELS = [
    // test level
    [
        "                                     ",
        "     =====                           ",
        "      VVV         ====               ",
        "                                     ",
        " L        a        c                  ",
        "       $  a        c           =      ",
        "O@  U  ^  aA B   C c D    _ ^^^U^^^     > ",
        "==============bb======dddd=================",
    ],
    // tech level -- are these jumps possible?
    /*[
        "                                 ",
        "L         ====   =====   ======  ",
        "    ===                          ",
        "O@                              >",
        "===== =====  =====   =====    ====",
    ],*/
    // tutorial
    [
        "                      $$$            =",
        "=  L               $  ===            =",
        "=@                 $             >   =",
        "=O  $  $  $ U^^^^  $   ^  $$$ ^^===^^=",
        "======================================",
    ],
    // the broken bridge
	[
        "                             a   == ",
        "                      $$$$   a   ==",
		"                 $$          a > ==",
		"       =    ==   ==   =  =   a=====",
		"L      =                        ===",
		"   =   =                     $$$===",
		"O@         ^^   ^^   ^^  ^^  $A$===",
		"===================================",
	],
    // the pit
    [
        "L            ",
        "O@$$$ ^^^  A",
        "==aaa========",
        "= $$$       =",
        "= $$$       =",
        "= $$$    $  =",
        "= $ $    $  =",
        "= ^^^    $  =",
        "=======     =",
        "= VVV    B  =",
        "=     b======",
        "=     b   cc=",
        "=     b   c>=",
        "=  U  b   ===",
        "=     b =   =",
        "=^^^^^b    C=",
        "=============",
    ],
    // the box
    [
        "$$$                     $$$     A            ",
		"$$$     aaaaa           $$$   bb=bb          ",
        "===     a   a  bb       $$$          b       ",
        "=       a > a     bbb  $$^$$            b    ",
		"=       =====          bbbbb                b",
        "= L                                          ",
		"=@                                       b   ",
        "=O   ^^ $$$$$ ^^ $$ ^^                 B     ",
        "==============================================",
    ],
    // jump for it
    [
        "                                             $$$     $         ",
        "                                            =====              ",
        " L                          a                                  ",
        "                        ^   a        =   =                  >  ",
        "O @   $   $     ^       =$$$=A               $$$    ^^^    === ",
        "===  ===  =   =====   =========    =   =    ===================",
    ],
    // the high jump
    [
        "                $B$                         ",
        "                ===                         ",
        "        a            $                      ",
        "        a   U      $ =             >        ",
        "       =a          =     b    b  =====   b  ",
        "L       a                                   ",
        "        abbbbbbA  =  =            $$$  b    ",
        "O @     a^^^^^^=^^^^^=^^^^^^^^^^^ $$$ ^^^^^^",
        "=============================================",
    ],
    // boing
    [
        "                                                       ",
        "  L                                                  a ",
        "  @ O                        ===       U    =ddddddd===",
        "======   $     $     $  ^  $ VVV $                     ",
        "=    a   $     $     $  =  $     $  U                  ",
        "=    a   $     $ ^^^ $     $     $                     ",
        "=    a   $     $ === $     $     $                     ",
        "=    a   U     U     U     U     U                     ",
        "=    a                                                 ",
        "=    a                                                 ",
        "=    a                              U                  ",
        "=  > a                                               D ",
        "======                                 U       UUU  ===",
    ],
    // aMAZEng
    [
        "                                 ^                             =",
        "                                 =                           $ =",
        "                            $$   =                           D =",
        " $    ==================   ^$$ C =     ==================---====",
        "==                  $$$=   =======    ==  V   $     =$$$$$$$$$$=",
        " $    ======================     ===   =     =====  =          =",
        "        V   V   V   V      =           =  U      =  ====----====",
        "                           =           =         =          ac =",
        "==        ^   ^   ^        =  $$$                =          ac>=",
        "      ===============-     =  =================  ======ddddd====",
        "L    =               -                        =                =",
        "O @            ^^^$$$-           $$       $$$^=      $ $ $ $ A =",
        "================================================================",
    ],
    // the stairs
    [
        "                                =================",
        "            =====================               -        $$$$",
        "           =                                    -        $$$$",
        "          =               _    _    ^         C -        $$$$",
        "         =               ==   ===  ===    =$$====        ====",
        "        =            B  =                  $$   =        ",
        "       =            ^=^^=                  $$   =    U",
        "      =aaaaaa bbbbb======                  $$   =",
        "    ==   b  a ^^^^=                        $$   =",
        "   =        a =====                        $$   =",
        "  = A       ==    c            U           $$   =",
        "==  =      ===    c                  $     $$   =",
        "=    L     ===  > c                  =     $$   =",    
        "=       ===========                  ==         =",
        "=O@     =$$$$$$$$$---===^^^^^^^^^^^^^===   ^^   =",
        "=================================================",
    ],
    // i need to find a good name for this level later
    [
        "  L                                                  ",
        "  O@  _       _  =    _    ^^^                _      ",
        "  =====bbbbbbb=====  ===  =====           =$ === $ === $=",
        "= -                  = =   $$$            =$     $     $=",
        "  -$                 = =            ^    d=$     $     $=",
        "  =$$                =$=ddd   dd   d=d    =$     $     $=",
        "  =$$$               =$=                  =$     $     $=",
        "  ==$$$              =$=                  a$   c $ c   $=",
        "  = =$$$          _  =$-                  a$   ccccc   $=",
        "  =  =$$B^^^^^^^^^_  =$-D                 aA     >     C=",
        "  =======================================================",
    ],
]

let totalCoins = 0;
let touchingSpikes = false;

for (const level of LEVELS) {
    for (const row of level) {
        totalCoins += (row.match(/\$/g) || []).length;
    }
}

    
function restart(levelId: number, coins: number) {
    play("vine-boom");
    go("game", {
        levelId: levelId,
        coins: coins,
    });
}

// makeBlock function creates a path block in certain positions
function makeBlock(position, name) {
    if (name == "pathB") {
        return add([
            sprite("grass"),
            area(),
            anchor("bot"),
            pos(position),
            body({isStatic: true}),
            offscreen({hide: true, distance: 64}),
            "path","pathB","B",
        ])
    } else if (name == "pathD") {
        return add([
            sprite("steel"),
            area(),
            anchor("bot"),
            pos(position),
            body({isStatic: true}),
            offscreen({hide: true, distance: 64}),
            "path","pathD","D",
        ])
    } else if (name == "doorC") {
        return add([
            sprite("snow"),
            area(),
            anchor("bot"),
            pos(position),
            body({isStatic: true}),
            offscreen({hide: true, distance: 64}),
            "door", "doorC", "C",
        ])
    }
}

function addCloud(cloudPos?) {
    let zdistance = rand(0,1) * 3 + 1;
    return add([
        sprite("cloud"),
        pos(cloudPos || rand(vec2(0,0), vec2(width()/2, height()))),
        move(0, 100 / zdistance),
        scale(1 / zdistance),
        //area(),
        offscreen({hide: true, distance: 640, destroy: true}),
        anchor("topleft"),
        "cloud",
        z(-999 - Math.floor((zdistance * 10))),
    ])
}

onDestroy("cloud", () => {
    rand(0,1) > 0.6 ? addCloud() : null;
})

scene("game", ({ levelId, coins }) => {
	let coinsCollected = 0;
    const level = addLevel(LEVELS[levelId || 0], {
        tileWidth: 64,
        tileHeight: 64,
        pos: vec2(0,0),
        tiles: {
            "@": () => [
                sprite("bean"),
                area({scale:1}),
                body({jumpForce:700}),
                anchor("center"),
				pos(),
                opacity(1),
                offscreen({hide: false, destroy: false}),
                "player", "player1", "green guy", "triggers button",
                {
                    locked: false,
                    dead: false,
                },
            ],
            "O": () => [
                sprite("bean2"),
                area({scale:1}),
                body({jumpForce:700}),
                anchor("center"),
				pos(),
                opacity(1),
                offscreen({hide: false, destroy: false}),
                "player", "player2", "pinkish guy", "triggers button",
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
                "fake grass",
                "this grass is totally real, and definetly has a hitbox trust me bro",
            ],
            "$": () => [
                sprite("coin"),
                area(),
                anchor("bot"),
                "coin", "money", "bling",
                offscreen({ hide: true, distance: 64 }),
            ],
            "^": () => [
                sprite("spike"),
                area({
                    scale: 0.5,
                }),
                body({isStatic: true}),
                anchor("bot"),
                "danger", "spike", "ouch", "only failures step on this",
                offscreen({ hide: true, distance: 64 }),
            ],
            "V": () => [
                sprite("spike", {flipY: true}),
                area({
                    scale: 0.5,
                }),
                pos(0,-64),
                body({isStatic: true}),
                anchor("top"),
                "danger", "spike", "ouch", "only failures step on this",
                offscreen({ hide: true, distance: 64 }),
            ],
            ">": () => [
                sprite("portal"),
                area(),
                anchor("bot"),
                "portal", "beam me up, scotty",
                offscreen({ hide: true, distance: 64 }),
            ],
            "A": () => [
                sprite("button"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                pos(),
                offscreen({hide: true, distance: 64}),
                "button", "buttonA", "A",
            ],
            "a": () => [
                sprite("sand"),
                area(),
                anchor("bot"),
                pos(),
                body({isStatic: true}),
                offscreen({hide: true, distance: 64}),
                "door", "doorA", "A",
            ],
            "B": () => [
                sprite("buttonB"),
                area({scale:vec2(0.5,1)}),
                body({isStatic: true}),
                anchor("bot"),
                pos(),
                offscreen({hide: true, distance: 64}),
                "button", "buttonB", "B",
            ],
            "b": () => [
                pos(),
                "B","pathBPosition"
            ],
            "C": () => [
                sprite("buttonC"),
                area({scale:vec2(0.5,1)}),
                body({isStatic: true}),
                anchor("bot"),
                pos(),
                scale(),
                timer(),
                offscreen({hide: true, distance: 64}),
                "button","buttonC", "C",
            ],
            "c": () => [
                pos(),
                "C","doorCPosition",
            ],
            "D": () => [
                sprite("buttonD"),
                area({scale:vec2(0.5,1)}),
                body({isStatic: true}),
                anchor("bot"),
                pos(),
                scale(),
                timer(),
                offscreen({hide: true, distance: 64}),
                "button", "buttonD", "D",
            ],
            "d": () => [
                pos(),
                "D","pathDPosition",
            ],
            "L": () => [
                text("Level " + (levelId)),
                pos(),
                color(WHITE),
                outline(64, rgb(0,0,0)),
                scale(2),
                "levelText",
                anchor("center"),
            ],
            // pushable blocks
            "_": () => [
                sprite("crate"),
                area({collisionIgnore: ["spikes"]}),
                body(),
                anchor("bot"),
                pos(),
                "crate", "pushable", "funny looking box", "triggers button",
            ],
            "U": () => [
                sprite("jumpy"),
                area(),
                body({isStatic: true}),
                anchor("bot"),
                pos(),
                "jumpy", "trampoline", "bounce",
            ]
        },
    });
    // add background
    setBackground(rgb(123,193,250));
    // add some starting clouds
    for (let i = 0; i < 10; i++) {
        addCloud();
    }
    // spawn a cloud every three seconds
    const cloudLoop = loop(3, () => {
        let cloudPos = rand(vec2(-width()/2,-height()/2), vec2(width()/2, height()/2));
        addCloud(cloudPos);
    })
    // Get the player object from tag
    const player1 = level.get("player1")[0];
    const player2 = level.get("player2")[0];

    let levelMusic;
    if (levelId < 5) {
        levelMusic = play("stick-together-2", {loop:true});
    } else if (levelId < 10) {
        levelMusic = play("stick-together-3", {loop:true});
    }
    
    // spawn doors in
    level.get("doorCPosition").forEach(door => {
        makeBlock(door.pos, "doorC");
    });
    //debug.log("level: " + levelId);
    // Movements
    const upKeyListener = onKeyPress("up", () => {
        if (player1.locked && player1.portal && !player1.dead && !player2.dead) {
            player1.locked = false;
            player1.opacity = 1;
            player1.area.scale = 1;
            player1.jump(JUMPFORCE);
            player1.portal = false; 
            return;
        } 
        if (player1.isGrounded()) {
            player1.jump(JUMPFORCE);
        } else if (!player1.isGrounded()) {
            const jumpTimer = add([
                timer(),
            ])
            jumpTimer.onUpdate(()=> {
                if (player1.isGrounded() && isKeyDown("up")) {
                    destroy(jumpTimer);
                    player1.jump(JUMPFORCE);
                } else if (player1.isGrounded() && !isKeyDown("up")) {
                    destroy(jumpTimer);
                }
            })
        }
        
    });
    const leftKeyListener = onKeyDown("left", () => {
        if (!player1.locked) {
            player1.move(-SPEED, 0);
            player1.flipX = true;
        }
    });
    const rightKeyListener = onKeyDown("right", () => {
        if (!player1.locked) {
            player1.move(SPEED, 0);
            player1.flipX = false;
        }
    });
    const wKeyListener = onKeyPress("w", () => {
        if (player2.locked && player2.portal && !player1.dead && !player2.dead) {
            player2.locked = false;
            player2.opacity = 1;
            player2.area.scale = 1;
            player2.jump(JUMPFORCE);
            player2.portal = false;
            return;
        } 
        if (player2.isGrounded()) {
            player2.jump(JUMPFORCE);
        } else if (!player2.isGrounded()) {
            const jumpTimer = add([
                timer(),
            ])
            jumpTimer.onUpdate(()=> {
                if (player2.isGrounded() && isKeyDown("up")) {
                    destroy(jumpTimer);
                    player2.jump(JUMPFORCE);
                } else if (player2.isGrounded() && !isKeyDown("up")) {
                    destroy(jumpTimer);
                }
            })
        }
        
    });
    const aKeyListener = onKeyDown("a", () => {
        if (!player2.locked) {
            player2.move(-SPEED, 0);
            player2.flipX = true;
        }
    });
    const dKeyListener = onKeyDown("d", () => {
        if (!player2.locked) {
            player2.move(SPEED, 0);
            player2.flipX = false;
        }
    });
    
    const jumpyListener = onCollide("player1", "trampoline", (player) => {
        if (isKeyDown("up")) {
            player.jump(JUMPFORCE * 1.25);
        } else {
            player.jump(JUMPFORCE * 1.1);
        }
    });
    const jumpy2Listener = onCollide("player2", "trampoline", (player) => {
        if (isKeyDown("w")) {
            player.jump(JUMPFORCE * 1.25);
        } else {
            player.jump(JUMPFORCE * 1.1);
        }
    });

    let player2InViewport = true;
    
    const playerExitScreenListener = player2.onExitScreen(() => {
        player2InViewport = false;
        //debug.log("Player 2 left the screen");
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
            play("alarm", {volume:0.5});
            await tween(0, 1, 1, (val) => warnText.opacity = val, easings.easeInOutCubic)
            if (player2InViewport) {warnLoop.cancel()}
        })
        wait(5, () => {
            warnLoop.cancel();
            warnText.destroy();
            if (!player2InViewport && !player1.portal && !player2.portal) {
                shake(72);
                //debug.log("You couldn't stick together!");
                player1.dead = true; player1.locked = true;
                player2.dead = true; player2.locked = true;
                play("vine-boom");
                wait(2, () => {
                    go("lose");
                })
            }
        })
    })
    const playerEnterScreenListener = player2.onEnterScreen(() => {
        player2InViewport = true;
        //debug.log("Player 2 entered the screen");
        destroyAll("warning");
    })
    const playerSpikeListener = onCollide("player", "danger", () => {
        play("vine-boom");
        if (!touchingSpikes) {
            touchingSpikes = true;
            wait(0.1, () => {
                if (touchingSpikes) {
                    touchingSpikes = false;
                    levelMusic.stop();
                    restart(levelId, coins);
                }
            })
        }
    })
    // button listeners
    const buttonAListener = onCollide("buttonA","triggers button", (button) => {
        level.get("doorA").forEach(destroy);
        destroy(button);
    })
    const buttonBListener = onCollide( "buttonB","triggers button", (button) => {
        level.get("pathBPosition").forEach(path => {
            makeBlock(path.pos, "pathB");
        });
        destroy(button);
    })
    const buttonCListener = onCollide("buttonC","triggers button", (button) => {
        get("doorC").forEach(destroy);
        destroy(button);
    })
    /*
    const buttonCListener2 = onCollideEnd("buttonC","triggers button", (button) => {
        button.scale = vec2(1,1);
        level.get("doorCPosition").forEach(door => {
            makeBlock(door.pos, "doorC");
        });
        buttonCListener2.cancel();
    });*/
    const buttonDListener = onCollide( "buttonD","triggers button", (button) => {
        destroy(button);
        level.get("pathDPosition").forEach(path => {
            debug.log("here!");
            makeBlock(path.pos, "pathD")
        });
    })
    /*
    const buttonDListener2 = onCollideEnd( "buttonD","triggers button", (button) => {
        button.scale = vec2(1,1);
        level.get("pathD").forEach(destroy);
        buttonDListener2.cancel();
    });*/
    
    const coinListener = onCollide("player", "coin", (player, coin) => {
        destroy(coin);
        play("coins");
        coinsCollected++;
        coinsLabel.text = coins + coinsCollected;
    })

    // Fall death
    const playerOnUpdate = onUpdate(() => {
        if (player1.pos.y >= 1000 || player2.pos.y >= 1000) {
            levelMusic.stop();
            restart(levelId, coins)
        }
        if (player1.locked) {
            camPos(player2.pos);
        } else {
            camPos(player1.pos)
        }
    })
    

    // Enter the next level on portal
    const portalHandler = onCollide("player", "portal", (player, portal) => {
        play("portal");
        player.portal = true;
        player.locked = true;
        player.opacity = 0;
        player.area.scale = 0.1;
        if (player1.portal && player2.portal) {
            // clean up level objects
            cleanup();
            // go to next level
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
        "coinsLabel",
    ]);
    function cleanup() {
        destroy(coinsLabel);
        cloudLoop.cancel();
        wKeyListener.cancel();
        aKeyListener.cancel();
        dKeyListener.cancel();
        upKeyListener.cancel();
        leftKeyListener.cancel();
        rightKeyListener.cancel();
        playerOnUpdate.cancel();
        playerExitScreenListener.cancel();
        playerEnterScreenListener.cancel();
        playerSpikeListener.cancel();
        buttonAListener.cancel();
        buttonBListener.cancel();
        buttonCListener.cancel();
        //buttonCListener2.cancel();
        buttonDListener.cancel();
        //buttonDListener2.cancel();
        coinListener.cancel();
        portalHandler.cancel();
        jumpyListener.cancel();
        jumpy2Listener.cancel();
        levelMusic.stop();
        level.get("cloud").forEach(destroy);
    }
});
scene("lose", () => {
    add([
        text("You lost!"),
        scale(3),
        outline(12, BLACK),
        anchor("center"),
        pos(center()),
    ]);
    onKeyPress(() => {start()});
})
scene("win", ({ coins }) => {
    const winText = add([
        text(`You won!\nYou grabbed ${coins} out of ${totalCoins} coins!!!`, {
            width: width()/2
        }),
        scale(2),
        color(WHITE),
        outline(12, BLACK),
        pos(width()/2, height()/2 - height()/4),
        anchor("center"),
    ]);
    onKeyPress(() => {
        destroy(winText);
        start();
    });
});
scene("title", () => {
    const title_music = play("stick-together", {loop:true});
    title_music.play();
    const title_icon = add([
        sprite("title-icon"),
        pos(center().x, center().y - 100),
        anchor("center"),
        scale(0.5),
    ])

    const space_text = add([
        text("Press space to start"),
        pos(center().x, center().y + 100),
        anchor("center"),
        color(BLACK),
    ])
    
    loop(0.625, async () => {
        tween(title_icon.scale, vec2(0.6), 0.625, (p) => title_icon.scale = p, easings.easeInOutSine)
            .then(() => tween(title_icon.scale, vec2(0.5), 0.625, (p) => title_icon.scale = p, easings.easeInOutSine))
    })
    onKeyPress("space", async () => {
        destroy(space_text);
        title_music.stop();
        await tween(title_icon.scale, vec2(0), 0.5, (p) => title_icon.scale = p, easings.easeOutBounce);
        start();
    });
})

function start(levelId? : number) {
    go("game", {
        levelId: levelId == null ? 1 : levelId,
        coins: 0,
    });
}

start(1);
//go("title");