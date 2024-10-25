var mov = [
    { name: 'stance', frame: { start: 14657, end: 14666, frameRate: 12, repeat: -1 } },
    { name: 'walkf', frame: { start: 14669, end: 14676, frameRate: 12, repeat: -1 }, speed: 150 },
    { name: 'walkb', frame: { start: 14677, end: 14688, frameRate: 12, repeat: -1 }, speed: 100 },
    { name: 'jump', frame: { start: 14720, end: 14730, frameRate: 10, repeat: 0 }, speedY: 350 },
    { name: 'jumpf', frame: { start: 14735, end: 14742, frameRate: 8, repeat: -1 }, speedX: 150, speedY: 340 },
    { name: 'jumpb', frame: { start: 14735, end: 14742, frameRate: 8, repeat: -1 }, speedX: 150, speedY: 340 },
    { name: 'dashf', frame: { start: 14768, end: 14772, frameRate: 12, repeat: 0 }, speed: 220, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'dashb', frame: { start: 15029, end: 15031, frameRate: 12, repeat: 0 }, speed: 160, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'crouch', frame: { start: 14706, end: 14709, frameRate: 6, repeat: -1 }, speed: 0, hurtbox: { x: 0, y: 20, width: 40, height: 60 } },
    { name: 'blockh', frame: { start: 14746, end: 14750, frameRate: 14, repeat: 0 }, speed: 0, noFrames: 5 },
    { name: 'hith', frame: { start: 14835, end: 14839, frameRate: 12, repeat: 0 }, speed: 0 },
]
var atk = [
    { name: 'slp', frame: { start: 15008, end: 15012, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 50, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 50, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'smp', frame: { start: 15013, end: 15019, frameRate: 15, repeat: 0 }, speed: 0,  hitbox: { fx: { name: 'hitsparks-small', x: 50, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 25, stun: 50, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'shp', frame: { start:15020, end: 15029, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -20 }, start: 3, active: 4, hits: [5], x: 50, y: -30, width: 60, height: 20, damage: 30, stun: 50, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'slk', frame: { start: 15110, end: 15128, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 50, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'smk', frame: { start: 15104, end: 15107, frameRate: 12, repeat: 0 }, speed: 0,  hitbox: { fx: { name: 'hitsparks-small', x: 50, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: 0, width: 50, height: 20, damage: 25, stun: 50, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'shk', frame: { start: 15136, end: 15146, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 50, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
    { name: 'clp', frame: { start: 14665, end: 14669, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 50, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'cmp', frame: { start: 15025, end: 15031, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 2, active: 3, hits: [5], x: 50, y: -20, width: 60, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 6, push: 15, atklvl: 'h' } },
    { name: 'chp', frame: { start: 15601, end: 15608, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -20 }, start: 2, active: 4, hits: [3], x: 50, y: -30, width: 60, height: 20, damage: 30, stun: 20, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'clk', frame: { start: 15136, end: 15146, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 10, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'cmk', frame: { start: 15603, end: 15610, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'chk', frame: { start: 15603, end: 15610, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
    { name: 'jlp', frame: { start: 15603, end: 15610, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 10, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'jmp', frame: { start: 15603, end: 15610, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 2, active: 3, hits: [5], x: 50, y: -30, width: 60, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 6, push: 15, atklvl: 'h' } },
    { name: 'jhp', frame: { start: 15603, end: 15610, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -20 }, start: 2, active: 4, hits: [5], x: 50, y: 0, width: 60, height: 30, damage: 30, stun: 20, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'jlk', frame: { start: 15603, end: 15610, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 10, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'jmk', frame: { start: 15603, end: 15610, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'jhk', frame: { start: 15603, end: 15610, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
]
var cricarts = [
    { name: 'ca1', frame: { start: 15603, end: 15610, frameRate: 12, repeat: -1 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 35, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
]

var projectiles = [
    { name: 'lfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 220, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 260, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 2, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'hfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 300, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 4, onHit: 4, push: 12, atklvl: 'h' } }
]
var spmoves = [
    { name: 'lfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15332, end: 15333, frameRate: 18, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'lfbf'})},
    { name: 'mfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15332, end: 15333, frameRate: 14, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'mfbf'})},
    { name: 'hfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15332, end: 15333, frameRate: 12, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'hfbf'})},
    { name: 'ltatf', speed: 100, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15356, end: 15370, frameRate: 18, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mtatf', speed: 200, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15356, end: 15370, frameRate: 14, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 4, active: 4, hits: [6,7], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'htatf', speed: 300, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15356, end: 15370, frameRate: 10, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 5, active: 6, hits: [7,8,9], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'ldpf', speed: 5, height: 200, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15343, end: 15355, frameRate: 20, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -40, y: -20 }, start: 3, active: 3, hits: [5], x: 20, y: -20, width: 55, height: 60, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mdpf', speed: 10, height: 260, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15343, end: 15355, frameRate: 16, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -20, y: -20 }, start: 4, active: 4, hits: [5], x: 20, y: -20, width: 50, height: 70, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'hdpf', speed: 15, height: 320, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 15343, end: 15355, frameRate: 12, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -20, y: -20 }, start: 5, active: 6, hits: [5,7], x: 20, y: -20, width: 55, height: 80, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
]

var ken = {
    id: 'p2', name: 'ken', fullname: 'Ken Masters',
    width: 50, height: 100, health: 1000, stun: 200, power: 200, weight: 80, mov, atk, spmoves, cricarts,
    hurtbox: { x: 0, y: 0, width: 40, height: 100,
    comment: 'I did it!!!' }
}