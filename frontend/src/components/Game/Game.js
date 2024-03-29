import React, {Component, useEffect, useRef} from 'react';
import Phaser from 'phaser';
import Map from '../../assets/scotlandYard/map.png';
import {IonPhaser} from '@ion-phaser/react';

const imageProperties = {
	width: 2690,
	height: 2046,
	offset:55
};
const canvasProperties = {
	width: 786,
	height: 600,
};

export function GameCanvas() {
	const mapRef = useRef();

	useEffect(() => {
		const {current} = mapRef;
		let canvas = document.getElementById('canvas');
		let ctx = canvas.getContext('2d');

		let cameraOffset = {x: canvasProperties.width / 2, y: canvasProperties.height / 2};
		let cameraZoom = 0.63;
		let MAX_ZOOM = 2.5;
		let MIN_ZOOM = 0.3;
		let SCROLL_SENSITIVITY = 0.0005;

		function draw() {
			canvas.width = canvasProperties.width;
			canvas.height = canvasProperties.height;

			ctx.translate(canvasProperties.width / 2, canvasProperties.height / 2);
			ctx.scale(cameraZoom, cameraZoom);
			ctx.translate(-canvasProperties.width / 2 + cameraOffset.x, -canvasProperties.height / 2 + cameraOffset.y);
			ctx.clearRect(0, 0, canvasProperties.width, canvasProperties.height);
			ctx.drawImage(current, -canvasProperties.width, -canvasProperties.height);
			// ctx.fillRect(-canvasProperties.width+317+imageProperties.offset, -canvasProperties.height+78+imageProperties.offset,10,10)
			requestAnimationFrame(draw);
		}

		function getEventLocation(e) {
			if (e.touches && e.touches.length == 1) {
				return {x: e.touches[0].clientX, y: e.touches[0].clientY};
			} else if (e.clientX && e.clientY) {
				return {x: e.clientX, y: e.clientY};
			}
		}

		let isDragging = false;
		let dragStart = {x: 0, y: 0};

		function onPointerDown(e) {
			isDragging = true;
			dragStart.x =  getEventLocation(e).x / cameraZoom - cameraOffset.x;
			dragStart.y = getEventLocation(e).y / cameraZoom - cameraOffset.y;
		}

		function onPointerUp(e) {
			isDragging = false;
			initialPinchDistance = null;
			lastZoom = cameraZoom;
		}

		function onPointerMove(e) {
			if (isDragging) {
				cameraOffset.x = getEventLocation(e).x / cameraZoom - dragStart.x;
				cameraOffset.y = getEventLocation(e).y / cameraZoom - dragStart.y;
			}
		}

		function handleTouch(e, singleTouchHandler) {
			if (e.touches.length == 1) {
				singleTouchHandler(e);
			} else if (e.type == 'touchmove' && e.touches.length == 2) {
				isDragging = false;
				handlePinch(e);
			}
		}

		let initialPinchDistance = null;
		let lastZoom = cameraZoom;

		function handlePinch(e) {
			e.preventDefault();

			let touch1 = {x: e.touches[0].clientX, y: e.touches[0].clientY};
			let touch2 = {x: e.touches[1].clientX, y: e.touches[1].clientY};

			let currentDistance = (touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2;

			if (initialPinchDistance == null) {
				initialPinchDistance = currentDistance;
			} else {
				adjustZoom(null, currentDistance / initialPinchDistance);
			}
		}

		function adjustZoom(zoomAmount, zoomFactor) {
			if (!isDragging) {
				if (zoomAmount) {
					cameraZoom += zoomAmount;
				} else if (zoomFactor) {
					cameraZoom = zoomFactor * lastZoom;
				}
				cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
				cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
			}
		}

		canvas.addEventListener('mousedown', onPointerDown);
		canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown));
		canvas.addEventListener('mouseup', onPointerUp);
		canvas.addEventListener('touchend', (e) => handleTouch(e, onPointerUp));
		canvas.addEventListener('mousemove', onPointerMove);
		canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove));
		canvas.addEventListener('wheel', (e) => adjustZoom(e.deltaY * SCROLL_SENSITIVITY));

		draw();
	}, []);
	return (
		<>
			<canvas
				id="canvas"
				width={1200}
				height={912}
				style={{backgroundColor: 'black', marginTop: '75px', marginLeft: '90px', cursor:'move'}}></canvas>
			<img src={Map} hidden={true} ref={mapRef} />
		</>
	);
}
