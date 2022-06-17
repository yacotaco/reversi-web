import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';

class Controller {
  board;
  view;
  camera;
  scene;

  constructor(board, view) {
    this.board = board;
    this.view = view;
    this.camera = view.getCamera();
    this.scene = view.getScene();
    this.renderer = view.getRenderer();
  }

  initController() {
    console.log('init Controller class');
    this.board.initBaord();
    // this.view.initView();
    // console.log("init scope " + this.camera);
    document.body.onload = this.view.constructBasicScene();
    this.onPointerMove = this.onPointerMove.bind(this);
    window.addEventListener('click', this.onPointerMove);
    // this.addRaycaster();
    this.initDiscs();
  }

  initDiscs() {
    this.view.makeDisc(4.1, 4.1, 2);
    this.board.setBoardGrid(4, 4, 2);

    this.view.makeDisc(3.1, 4.1, 1);
    this.board.setBoardGrid(3, 4, 1);

    this.view.makeDisc(3.1, 3.1, 2);
    this.board.setBoardGrid(3, 3, 2);

    this.view.makeDisc(4.1, 3.1, 1);
    this.board.setBoardGrid(4, 3, 1);

    this.view.updateView();
  };

  onPointerMove(event) {
    // console.log("method scope " + this.camera);
    let raycaster = new THREE.Raycaster();
    let pointer = new THREE.Vector2();

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, this.camera);

    let intersects = raycaster.intersectObjects(this.scene.children);
    let x = intersects[0].object.position.x
    let y = intersects[0].object.position.y

    let board_x = x.toFixed(0);
    let board_y = y.toFixed();
    
    this.board.setBoardGrid(board_x, board_y, 1);
    this.view.makeDisc(x, y, 1);

    this.renderer.render(this.scene, this.camera);
  }
}

export { Controller };
