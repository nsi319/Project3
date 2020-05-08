import React, {Component} from 'react';
import Phaser from 'phaser';
import sky from '../../assets/sky.png';
import ground from '../../assets/platform.png';
import star from '../../assets/star.png';
import bomb from '../../assets/bomb.png';
import dude from '../../assets/dude.png';
import {IonPhaser} from '@ion-phaser/react';

var config = {
	type: Phaser.AUTO,
	width: '100%',
	height: 500,
	scale: {
		parent: 'mydiv',
		mode: Phaser.Scale.FIT,
		width: '100%',
		height: 500,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300},
			debug: false,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
};

var game = new Phaser.Game(config);

function preload() {
	this.textures.addBase64('sky', sky);
	this.textures.addBase64('ground', ground);
	this.load.image('ground', 'assets/platform.png');
	this.textures.addBase64('star', star);
	this.textures.addBase64('bomb', bomb);
	var shardsImg = new Image();
	shardsImg.onload = () => {
		this.textures.addSpriteSheet('dude', shardsImg, {frameWidth: 32, frameHeight: 48});
	};
	shardsImg.src = dude;
}
var platforms, player, stars, bombs, gameOver;
var score = 0;
var scoreText;

function create() {
	this.add.image(0, 0, 'sky').setOrigin(0, 0);
	this.add.image(400, 300, 'star');
	platforms = this.physics.add.staticGroup();

	platforms.create(400, 568, 'ground').setScale(2).refreshBody();

	platforms.create(600, 400, 'ground');
	platforms.create(50, 250, 'ground');
	platforms.create(750, 220, 'ground');
	player = this.physics.add.sprite(100, 450, 'dude');

	player.setBounce(0.2);
	player.setCollideWorldBounds(true);

	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1,
	});

	this.anims.create({
		key: 'turn',
		frames: [{key: 'dude', frame: 4}],
		frameRate: 20,
	});

	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
		frameRate: 10,
		repeat: -1,
	});
	this.physics.add.collider(player, platforms);
	stars = this.physics.add.group({
		key: 'star',
		repeat: 11,
		setXY: {x: 12, y: 0, stepX: 70},
	});

	stars.children.iterate(function (child) {
		child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});
	this.physics.add.collider(stars, platforms);
	this.physics.add.overlap(player, stars, collectStar, null, this);
	scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});
	bombs = this.physics.add.group({
		key: 'bomb',
		repeat: 5,
		setXY: {x: 15, y: 0, stepX: 80},
	});

	this.physics.add.collider(bombs, platforms);

	this.physics.add.collider(player, bombs, hitBomb, null, this);
}
function hitBomb(player, bomb) {
	this.physics.pause();

	player.setTint(0xff0000);

	player.anims.play('turn');

	gameOver = true;
}
function collectStar(player, star) {
	star.disableBody(true, true);
	score += 10;
	scoreText.setText('Score: ' + score);
	if (stars.countActive(true) === 0) {
		stars.children.iterate(function (child) {
			child.enableBody(true, child.x, 0, true, true);
		});

		var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		var bomb = bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}
}

function update() {
	var cursors = this.input.keyboard.createCursorKeys();
	if (cursors.left.isDown) {
		player.setVelocityX(-160);

		player.anims.play('left', true);
	} else if (cursors.right.isDown) {
		player.setVelocityX(160);

		player.anims.play('right', true);
	} else {
		player.setVelocityX(0);

		player.anims.play('turn');
	}

	if (cursors.up.isDown) {
		player.setVelocityY(-330);
	}
}

export function GameCanva() {
	return <IonPhaser game={game} initialize={false}></IonPhaser>;
}