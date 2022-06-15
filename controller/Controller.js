class Controller {
  board;

  view;

  constructor(board, view) {
    this.board = board;
    this.view = view;
  }

  initController() {
    console.log('init Controller class');
    this.board.initBaord();
    // this.view.initView();
    document.body.onload = this.view.constructBasicScene();
  }
}

export { Controller };
